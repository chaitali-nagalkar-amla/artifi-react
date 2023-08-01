import {
  Constants,
  generateURL,
  getAPIUrl,
} from "@chaitali-nagalkar-amla/common";
import { fabric } from "fabric";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import {
  updateWidget,
  useSliceSelector,
  getRuleDataByWidgetId,
  getWidgetDataById,
  addWidget,
  getActiveWidgetData,
  widgetConstants,
  deleteWidgetById,
  selectWidgetById,
  generateEffectUrl,
} from "@chaitali-nagalkar-amla/editor";
import { useDispatch } from "react-redux";
import { IImageProps, IImageUpdater } from "../type/ImageProps";
import { convertStringToBoolean } from "@chaitali-nagalkar-amla/common";

export const ImageUpdater = ({
  details,
  widgetId,
  viewCode,
  allowAddFlag,
}: IImageUpdater) => {
  const dispatch = useDispatch();
  const activeWidget = useSliceSelector(getActiveWidgetData);
  const { t } = useTranslation();
  //imageRuleData
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

  widgetData = widgetData ? widgetData : activeWidget;

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
  //delete Widget On Canvas
  const selectWidgetOnCanvas = (widgetData: IImageProps) => {
    dispatch(
      selectWidgetById({
        widgetId: widgetData.widgetId,
        viewCode: widgetData.viewCode,
      })
    );
  };
  //select Widget On Canvas
  const deleteWidgetOnCanvas = (imageProps: IImageProps) => {
    dispatch(
      deleteWidgetById({
        widgetId: widgetId,
        viewCode: imageProps.viewCode,
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
            type: Constants.IMAGE_WIDGET,
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
          type: Constants.IMAGE_WIDGET,
          viewCode: viewCode,
          widgetData: {
            ...imageProps,
          },
        })
      );
    }
  };

  const onSelectAction = (imageProps: IImageProps) => {
    if (allowAddFlag && convertStringToBoolean(allowAddFlag)) {
      addWidgetOnCanvas(imageProps);
    } else if (imageProps && imageProps.deleteWidget && widgetId) {
      deleteWidgetOnCanvas(imageProps);
    } else if ((widgetId && !viewCode) || (widgetId && viewCode)) {
      updateWidgetOnCanvas(imageProps);
    } else if ((!widgetId && viewCode) || (!widgetId && !viewCode)) {
      addWidgetOnCanvas(imageProps);
    }
  };

  const onSelectWidget = (imageProps: IImageProps) => {
    if (imageProps && imageProps.widgetId) {
      selectWidgetOnCanvas(imageProps);
    }
  };

  //details
  return details(imageRuleData, widgetData, onSelectAction, onSelectWidget);
};
