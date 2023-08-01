import {
  useSliceSelector,
  getRuleDataByWidgetId,
  widgetConstants,
  addWidget,
  updateWidget,
  getWidgetDataById,
  generateEffectUrl,
} from "@chaitali-nagalkar-amla/editor";
import { useDispatch } from "react-redux";
import { IImageProps } from "../type/ImageProps";
import { convertStringToBoolean } from "@chaitali-nagalkar-amla/common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
export function UploadImageUpdater({
  details,
  widgetId,
  viewCode,
  allowAddWidgetFlag,
}: any) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
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
  //Widget Data
  let widgetData = useSliceSelector((state: any) =>
    getWidgetDataById(state, widgetId, viewCode)
  );

  widgetData = widgetData ? widgetData : {};
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
    if (
      imageRuleData &&
      imageRuleData.effects &&
      widgetData &&
      widgetData.customFilters &&
      widgetData.customFilters.length > 0
    ) {
      let imageObj = new Image();
      let effectURl: any = generateEffectUrl(
        widgetData.customFilters,
        imageProps.src,
        imageProps.libProp
      );
      imageObj.onload = function () {
        imageProps.src = effectURl;
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
      imageObj.onerror = function (error) {
        toast.error(t("IMAGE_EFFECT_ERROR"));
      };
      imageObj.src = effectURl;
    } else {
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
    }
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
