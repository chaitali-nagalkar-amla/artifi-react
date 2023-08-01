import {
  updateWidget,
  useSliceSelector,
  getRuleDataByWidgetId,
  getWidgetDataById,
  widgetConstants,
} from "@chaitali-nagalkar-amla/editor";
import { Constants } from "@chaitali-nagalkar-amla/common";
import { useDispatch } from "react-redux";
import { TextProps } from "../../type/TextProps";
import { useEffect, useState } from "react";
import { fetchAutoFontSize } from "../../api/API";
import { FontSize } from "../../type/AutoFontSizeConstantType";

export function GetTextFontSize(
  text: any,
  width: any,
  height: any,
  fontFamily: string,
  fontStyle: any,
  fontWeight: string,
  fontList: any,
  lineHeight: any
) {
  let detectedFontSize = "";
  const canvas = document.createElement("canvas");
  const ctx: any = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.textBaseline = "middle";

  for (
    let fontSize = fontList[fontList.length - 1];
    fontSize >= 0;
    fontSize--
  ) {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    var lines = text.split("\n");
    const metrics = ctx.measureText(text);
    const totalWidth = metrics.width;

    const totalHeight = fontSize * lines.length * lineHeight * 1.13;

    if (totalHeight <= height && totalWidth <= width) {
      detectedFontSize = fontSize;
      break;
    }
  }
  return detectedFontSize;
}

export function TextUpdater({ details, widgetId, viewCode }: any) {
  const dispatch = useDispatch();
  const [fontSizeData, setFontSizeData] = useState<FontSize[]>([]);
  const textRuleData = useSliceSelector((state: any) =>
    getRuleDataByWidgetId(state, widgetConstants.TEXTBOX, widgetId, viewCode)
  );

  const widgetData = useSliceSelector((state: any) =>
    getWidgetDataById(state, widgetId, viewCode)
  );
  useEffect(() => {
    fetchTextAutoSizeData();
  }, []);
  function autoFontSizeAllow(textRuleData: any, textProperties: TextProps) {
    if (
      textRuleData &&
      textRuleData.canGrow &&
      textRuleData.canGrow.allow &&
      (textProperties.text ||
        textProperties.fontStyle ||
        textProperties.fontFamily ||
        textProperties.fontWeight)
    ) {
      return true;
    } else {
      return false;
    }
  }
  const fetchTextAutoSizeData = async () => {
    try {
      if (textRuleData && textRuleData.canGrow && textRuleData.canGrow.allow) {
        let autoFontSizeDataArray = await fetchAutoFontSize(
          textRuleData.ruleCode
        );
        setFontSizeData(autoFontSizeDataArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const onUpdate = (textProps: TextProps) => {
    if (autoFontSizeAllow(textRuleData, textProps)) {
      var fontSizeArray = fontSizeData;
      if (fontSizeArray) {
        var autoFontSize = GetTextFontSize(
          textProps.text ? textProps.text : widgetData.text,
          widgetData.width,
          widgetData.height,
          textProps.fontFamily ? textProps.fontFamily : widgetData.fontFamily,
          textProps.fontStyle ? textProps.fontStyle : widgetData.fontStyle,
          textProps.fontWeight ? textProps.fontWeight : widgetData.fontWeight,
          fontSizeArray,
          widgetData.lineHeight
        );
        textProps.fontSize = autoFontSize;
      } else {
        textProps = textProps;
      }
    }
    dispatch(
      updateWidget({
        widgetId: widgetId,
        type: Constants.TEXT_WIDGET,
        widgetData: {
          ...textProps,
        },
      })
    );
  };

  return widgetData ? details(textRuleData, widgetData, onUpdate) : null;
}
