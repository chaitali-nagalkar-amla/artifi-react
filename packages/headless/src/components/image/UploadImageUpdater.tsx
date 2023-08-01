import {
  useSliceSelector,
  getRuleDataByWidgetId,
  widgetConstants,
  addWidget,
  updateWidget,
} from "@chaitali-nagalkar-amla/editor";
import { useDispatch } from "react-redux";
import { IImageProps } from "../../type/ImageProps";
import { convertStringToBoolean } from "@chaitali-nagalkar-amla/common";

export function UploadImageUpdater({
  details,
  widgetId,
  viewCode,
  allowAddWidgetFlag,
}: any) {
  const dispatch = useDispatch();

  //Image rule data
  const imageRuleData = useSliceSelector((state: any) => {
    if (widgetId) {
      return getRuleDataByWidgetId(
        state,
        widgetConstants.IMAGE,
        widgetId,
        viewCode,
        false
      );
    } else {
      return getRuleDataByWidgetId(state, widgetConstants.IMAGE, "", "", false);
    }
  });

  //Add Widget On Canvas
  const addWidgetOnCanvas = (imageProps: IImageProps) => {
    dispatch(
      addWidget({
        type: widgetConstants.IMAGE,
        viewCode: viewCode,
        imgWidgetData: {
          ...imageProps,
        },
      })
    );
  };

  //Update Widget On Canvas
  const updateWidgetOnCanvas = (imageProps: IImageProps) => {
    dispatch(
      updateWidget({
        widgetId: widgetId,
        type: widgetConstants.IMAGE,
        viewCode: viewCode,
        widgetData: {
          ...imageProps,
        },
      })
    );
  };

  // Set upload Action
  const onUploadAction = (imageProps: IImageProps) => {
    if (allowAddWidgetFlag && convertStringToBoolean(allowAddWidgetFlag)) {
      //Add new widget only
      addWidgetOnCanvas(imageProps);
    } else if ((widgetId && !viewCode) || (widgetId && viewCode)) {
      //Update selected widget
      updateWidgetOnCanvas(imageProps);
    } else if ((!widgetId && viewCode) || (!widgetId && !viewCode)) {
      //Add new widget (if allowed for global rule)
      addWidgetOnCanvas(imageProps);
    }
  };
  return details(imageRuleData, onUploadAction);
}
