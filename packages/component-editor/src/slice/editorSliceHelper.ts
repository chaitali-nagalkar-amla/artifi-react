import { fabric } from "fabric";
import {
  CANVAS,
  CORNER_STYLE,
  DefaultImageData,
  TextPropertiesConstant,
  widgetConstants,
  widgetPropertiesConstant,
} from "../constants/editorConstants";
import {
  ICanvasViews,
  IImageWidgetRule,
  IProductVariantData,
  IProductViewsData,
  ITemplate,
  ITextBoxRule,
  ITextRule,
} from "../type/editorTypes";
import { Constants } from "@artifi/common";
import { IEditorData, IImageWidget, ITextWidget } from "../type/widgetData";
import {
  ADMIN_FOLDER_PATH_KEY,
  FRONT_FOLDER_PATH_KEY,
} from "../constants/productViewConstants";

/*method will return the product variant data to load based on 

1. If the variant is customized then new design will be loaded on designer
2. If variant is inherit then only product image will be changed

*/
export function getProductVariantDataOnSKUChange(
  sku: string,
  oldVariantData: IProductVariantData,
  newVariantData: IProductVariantData
) {
  const isVariantCustomized = isCustomizedVariant(
    oldVariantData,
    newVariantData
  );

  if (!oldVariantData || isVariantCustomized) {
    return newVariantData;
  } else {
    {
    }

    return newVariantData;
  }
}

/*method will check the newly loaded product variant is customized or not

if all the views count and viewId are identical in old and new variant details then 
it will considered as inherit variant else customized variant is present
*/

export function isCustomizedVariant(
  oldVariantData: IProductVariantData,
  newVariantData: IProductVariantData
) {
  let isVariantCustomized = false;

  if (
    oldVariantData &&
    oldVariantData.ProductViews &&
    oldVariantData.ProductViews.length != newVariantData.ProductViews.length
  ) {
    isVariantCustomized = true;
  }

  if (
    oldVariantData &&
    oldVariantData.ProductViews &&
    newVariantData &&
    newVariantData.ProductViews
  ) {
    for (let i = 0; i < oldVariantData.ProductViews.length; i++) {
      if (
        oldVariantData.ProductViews[i] &&
        newVariantData.ProductViews[i] &&
        oldVariantData.ProductViews[i].GroupId !=
          newVariantData.ProductViews[i].GroupId
      ) {
        isVariantCustomized = true;
      }

      for (let j = 0; j < oldVariantData.ProductViews[i].Views.length; j++) {
        if (oldVariantData.ProductViews[i] && newVariantData.ProductViews[i]) {
          let oldView = oldVariantData.ProductViews[i].Views;
          let newView = newVariantData.ProductViews[i].Views;
          if (oldView.length != newView.length) {
            isVariantCustomized = true;
          }
          if (oldView && newView && oldView[j].Id != newView[j].Id) {
            isVariantCustomized = true;
          }
        }
      }
    }

    return isVariantCustomized;
  }
}

/*method will get Id of global rule based on widgetType and viewId
 */
export function getGlobalRuleIdByType(widgetType: string, viewData: any) {
  let rule = viewData.ConstraintsJson.WidgetConstraints.filter(
    (ruleData: any) => widgetType == ruleData.Type && !ruleData.Id
  );

  if (rule && rule[0]) {
    return rule[0].RuleId;
  }
}

/*method will get data of global rule based on widgetType and viewId
 */
export function getGlobalRuleDataType(
  widgetType: string,

  viewData: any,
  rulesData: any
) {
  let ruleId = getGlobalRuleIdByType(widgetType, viewData);

  if (rulesData) {
    let ruleData = rulesData[ruleId];

    let formattedRuleData = convertRuleData(widgetType, ruleData);
    return formattedRuleData;
  }
}

/*method will add text widget on canvas
 */

export function addText(
  groupId: number,
  viewId: number,
  ruleData: ITextRule,
  updatedProps?: any
) {
  if (ruleData) {
    const designData: any = createTextWidget(
      ruleData,
      groupId,
      viewId,
      updatedProps
    );
    let win: any = window;
    let textWidget = new fabric.Textbox(designData.text, designData);

    // let canvasId =  groupId + "_" + viewId;
    let canvasId = groupId ? groupId + "_" + viewId : viewId;
    const editor = win[CANVAS][canvasId];
    editor.add(textWidget);
    editor.setActiveObject(textWidget);
    editor.renderAll();
    return designData;
  }
}

/*method will update widget on canvas
 */
export function updateWidgetOnEditor(
  widgetId: string,
  groupId: number,
  viewId: number,

  updatedData: any,
  editorData: IEditorData
) {
  let widget: any = getWidgetOnCanvasById(
    widgetId,
    groupId,
    viewId,
    editorData
  );
  let canvas = getEditorByViewId(groupId, viewId);

  widget.set(updatedData);

  if (updatedData.src) {
    widget.setSrc(updatedData.src, function () {
      widget.set(updatedData);
      canvas.renderAll();
    });
  } else {
    widget.set(updatedData);
    widget.styles = "";
  }
  canvas.renderAll();
}

/**get to editor by groupId and viewId*/

export function getEditorByViewId(groupId: number, viewId: number) {
  let canvasId;
  let win: any = window;
  if ((groupId || viewId) && win[CANVAS]) {
    canvasId = groupId ? groupId + "_" + viewId : viewId;
    return win[CANVAS][canvasId];
  }
}

/**get to widgetData by Id based on viewId from canvas */
export function getWidgetById(
  widgetId: string,

  viewId: number,
  editorData: IEditorData
) {
  if (editorData && editorData[viewId]) {
    return editorData[viewId].objects.filter((widget: any) => {
      return widget.id === widgetId;
    })[0];
  }
}

/**method to delete widget from canvas */
export function deleteWidgetOnEditor(
  widgetId: string,
  groupId: number,
  viewId: number
) {
  const editor = getEditorByViewId(groupId, viewId);
  let selectedWidget = editor.getObjects().find((widget: any) => {
    return widget.id === widgetId;
  });

  if (selectedWidget && editor) {
    editor.remove(selectedWidget);
  }
}

/**method to select widget on canvas */
export function selectWidgetOnEditor(
  widgetId: string,
  groupId: number,
  viewId: number
) {
  const editor = getEditorByViewId(groupId, viewId);
  let selectedWidget = editor.getObjects().find((widget: any) => {
    return widget.id === widgetId;
  });

  if (selectedWidget && editor) {
    editor.setActiveObject(selectedWidget);
    editor.renderAll();
  }
}

/**get to widgetData by Id based on viewId from canvas */
export function getWidgetOnCanvasById(
  widgetId: string,
  groupId: number,
  viewId: number,
  editorData: IEditorData
) {
  const editor = getEditorByViewId(groupId, viewId);
  let selectedObject = editor.getObjects().find((widget: any) => {
    return widget.id === widgetId;
  });
  return selectedObject;
}

/**get to widgetList by widgetType of viewId */
export function getWidgetListByType(
  viewId: number,
  widgetType: string,
  editorData: IEditorData
) {
  if (editorData && editorData[viewId]) {
    return editorData[viewId].objects.filter((widget: any) => {
      return widget.type === widgetType;
    });
  }
}

/**method  to create data to add text widget on canvas */
function createTextWidget(
  textRuleData: ITextRule,
  groupId: number,
  viewId: number,
  updatedProps: any
) {
  let widgetId = generateWidgetId(widgetConstants.TEXTBOX, groupId, viewId);

  if (textRuleData) {
    let libProps = getLibPropIds(textRuleData);
    let mappedTextboxProps = {
      id: widgetId,
      type: widgetConstants.TEXTBOX,
      ruleId: textRuleData.ruleId,
      cornerStyle: widgetPropertiesConstant.CORNER_STYLE,
      text:
        updatedProps && updatedProps.text
          ? updatedProps.text
          : textRuleData.text
          ? textRuleData.text.defaultValue
          : TextPropertiesConstant.TEXT,
      fill:
        updatedProps && updatedProps.fill
          ? updatedProps.fill
          : textRuleData.textColor
          ? textRuleData.textColor.defaultValue
          : TextPropertiesConstant.FILL,

      fontSize:
        updatedProps && updatedProps.fontSize
          ? updatedProps.fontSize
          : textRuleData.fontSize.defaultValue
          ? textRuleData.fontSize.defaultValue
          : TextPropertiesConstant.FONT_SIZE,
      originalFontSize:
        updatedProps && updatedProps.originalFontSize
          ? updatedProps.originalFontSize
          : textRuleData.fontSize.defaultValue
          ? textRuleData.fontSize.defaultValue
          : TextPropertiesConstant.FONT_SIZE,
      fontStyle:
        updatedProps && updatedProps.fontStyle
          ? updatedProps.fontStyle
          : textRuleData.italic.defaultValue
          ? textRuleData.italic.defaultValue
          : TextPropertiesConstant.FONT_STYLE,
      fontWeight:
        updatedProps && updatedProps.fontWeight
          ? updatedProps.fontWeight
          : textRuleData.bold && textRuleData.bold.defaultValue
          ? textRuleData.bold.defaultValue
          : TextPropertiesConstant.FONT_WEIGHT,
      height: textRuleData.defaultHeight
        ? textRuleData.defaultHeight.defaultValue
        : TextPropertiesConstant.HEIGHT,
      width: textRuleData.defaultWidth
        ? textRuleData.defaultWidth.defaultValue
        : TextPropertiesConstant.WIDTH,
      angle: TextPropertiesConstant.ANGLE,
      left: textRuleData.defaultHeight
        ? textRuleData.defaultLeft.defaultValue
        : TextPropertiesConstant.LEFT,
      top: textRuleData.defaultHeight
        ? textRuleData.defaultTop.defaultValue
        : TextPropertiesConstant.TOP,
      stroke: textRuleData.stroke ? textRuleData.stroke.defaultValue : null,
      strokeWidth: textRuleData.strokeWidth
        ? textRuleData.strokeWidth.defaultValue
        : 1,
      textAlign:
        updatedProps && updatedProps.textAlign
          ? updatedProps.textAlign
          : textRuleData.textAlign
          ? textRuleData.textAlign.defaultValue
          : TextPropertiesConstant.TEXT_ALIGN,
      fontFamily:
        updatedProps && updatedProps.fontFamily
          ? updatedProps.fontFamily
          : textRuleData.fontFamily
          ? textRuleData.fontFamily.defaultValue
          : TextPropertiesConstant.FONT_FAMILY,
      originX: widgetPropertiesConstant.ORIGIN_X,
      originY: widgetPropertiesConstant.ORIGIN_Y,
      libProp: libProps,
      vAlign:
        updatedProps && updatedProps.vAlign
          ? updatedProps.vAlign
          : textRuleData.vAlign
          ? textRuleData.vAlign.defaultValue
          : TextPropertiesConstant.TEXT_V_ALIGN,
      lineHeight: textRuleData.lineHeight
        ? textRuleData.lineHeight.defaultValue
        : 1,
      textDecoration: textRuleData.textDecoration
        ? textRuleData.textDecoration.defaultValue
        : "none",
      lockRotation: textRuleData.allowRotation ? false : true,
      hasRotatingPoint: textRuleData.allowRotation
        ? textRuleData.allowRotation.allow
        : false,
      selectable: textRuleData.selectable
        ? textRuleData.selectable.allow
        : false,
      lockScalingX: textRuleData.allowScale ? false : true,
      lockScalingY: textRuleData.allowScale ? false : true,
      lockMovementX: textRuleData.allowMove ? false : true,
      lockMovementY: textRuleData.allowMove ? false : true,
      borderColor: widgetPropertiesConstant.BORDER_COLOR,
      cornerColor: widgetPropertiesConstant.CORNER_COLOR,
      cornerSize: widgetPropertiesConstant.CORNER_SIZE,
      transparentCorners: false,
      visible: textRuleData.visible ? true : false,
      custom_key: textRuleData.custom_key
        ? textRuleData.custom_key.defaultValue
        : "",
      price_key: textRuleData.custom_key
        ? textRuleData.price_key.defaultValue
        : "",
      group_key: textRuleData.group_key
        ? textRuleData.group_key.defaultValue
        : "",
      opacity: 1,
      hasControls:
        textRuleData.allowMove &&
        textRuleData.allowRotation &&
        textRuleData.allowScale
          ? true
          : false,
    };
    return mappedTextboxProps;
  }
}

/**method  to get libProps for text widget */

function getLibPropIds(textRuleData: ITextRule) {
  let libProp: any = {};
  if (textRuleData.fontFamily && textRuleData.fontFamily) {
    const fontFamilyList = textRuleData.fontFamily.value;
    let fontId = fontFamilyList.filter(function (fontData: any) {
      if (
        textRuleData.fontFamily &&
        textRuleData.fontFamily.defaultValue == fontData.value
      ) {
        return fontData.id;
      }
    });
    if (fontId && fontId.length) {
      libProp.fontId = fontId[0].id;
    }
  }

  return libProp;
}

/*
method to get  generate widgetId for new widget that will added on the canvas */

function generateWidgetId(widgetType: string, groupId: number, viewId: number) {
  const editor = getEditorByViewId(groupId, viewId);
  const WidgetList = editor.getObjects();
  let textWidgetList = WidgetList.filter((list: any) => {
    return list.type == widgetType;
  });

  let widgetPrefix = "";

  if (widgetType == widgetConstants.TEXTBOX) {
    widgetPrefix = "text_";
  } else {
    widgetPrefix = "image_";
  }
  let widgetCounter = textWidgetList ? textWidgetList.length : 0;
  let widgetId = widgetPrefix + (widgetCounter + 1);

  if (textWidgetList.indexOf(widgetId) > -1) {
    while (textWidgetList.indexOf(widgetId) > -1) {
      widgetId = widgetPrefix + widgetCounter++;
    }
  }

  return widgetId;
}

/*need to process canvas JSON to set rules*/
export function processCanvasData(
  viewData: any,

  rulesData: any
) {
  viewData.DesignJson.objects.map((widget: any) => {
    let ruleId;
    let rule = viewData.ConstraintsJson.WidgetConstraints.filter(
      (ruleData: any) => widget.id == ruleData.Id
    );

    if (rule && rule.length) {
      rule = rule[0];
    } else {
      rule = viewData.ConstraintsJson.WidgetConstraints.filter(
        (ruleData: any) => widget.type == ruleData.Type
      )[0];
    }

    ruleId = rule.RuleId;

    widget = replaceImagePath(widget);
    widget = setWidgetsCorners(widget, rulesData[ruleId]);
    widget.isAutoFontSize =
      rulesData[ruleId] &&
      rulesData[ruleId].canGrow &&
      rulesData[ruleId].canGrow.allow
        ? rulesData[ruleId].canGrow.allow
        : false;
  });

  return viewData.DesignJson;
}

function replaceImagePath(widget: any) {
  if (widget && widget.src && widget.src.includes(ADMIN_FOLDER_PATH_KEY)) {
    widget.src = widget.src.replace(
      ADMIN_FOLDER_PATH_KEY,
      Constants.ADMIN_IMAGE_URL
    );
  }

  if (
    widget &&
    widget.originalUrl &&
    widget.originalUrl.includes(ADMIN_FOLDER_PATH_KEY)
  ) {
    widget.originalUrl = widget.originalUrl.replace(
      ADMIN_FOLDER_PATH_KEY,
      Constants.ADMIN_IMAGE_URL
    );
  }

  if (widget && widget.src && widget.src.includes(FRONT_FOLDER_PATH_KEY)) {
    widget.src = widget.originalUrl.replace(
      FRONT_FOLDER_PATH_KEY,
      Constants.FRONT_IMAGE_URL
    );
  }

  if (
    widget &&
    widget.originalUrl &&
    widget.originalUrl.includes(FRONT_FOLDER_PATH_KEY)
  ) {
    widget.originalUrl = widget.originalUrl.replace(
      FRONT_FOLDER_PATH_KEY,
      Constants.FRONT_IMAGE_URL
    );
  }
  return widget;
}

/*method to set widget properties on canvas and apply basic restriction on widget by rule data*/
const setWidgetsCorners = (widgetData: any, ruleData: any) => {
  widgetData.borderColor = widgetPropertiesConstant.BORDER_COLOR;
  widgetData.styles = "";
  widgetData.cornerColor = widgetPropertiesConstant.CORNER_COLOR;
  widgetData.cornerStyle = widgetPropertiesConstant.CORNER_STYLE;
  widgetData.cornerSize = widgetPropertiesConstant.CORNER_SIZE;
  widgetData.transparentCorners = widgetPropertiesConstant.TRANSPARENT_CORNERS;
  widgetData.originX = widgetPropertiesConstant.ORIGIN_X;

  if (widgetData.type == widgetConstants.IMAGE) {
    widgetData._controlsVisibility = {
      mt: false,
      mb: false,
      ml: false,
      mr: false,
    };
  }
  widgetData.originY = widgetPropertiesConstant.ORIGIN_Y;
  widgetData.lockUniScaling = true;
  if (ruleData) {
    widgetData.lockRotation = ruleData.allowRotation ? false : true;
    widgetData.hasRotatingPoint = ruleData.allowRotation
      ? ruleData.allowRotation.allow
      : false;
    widgetData.selectable = ruleData.selectable
      ? ruleData.selectable.allow
      : false;

    widgetData.lockScalingX = ruleData.allowScale ? false : true;
    widgetData.lockScalingY = ruleData.allowScale ? false : true;
    widgetData.lockMovementX = ruleData.allowMove ? false : true;
    widgetData.lockMovementY = ruleData.allowMove ? false : true;

    if (
      widgetData.lockRotation &&
      widgetData.lockScalingX &&
      widgetData.lockScalingY &&
      widgetData.lockMovementX &&
      widgetData.lockMovementY
    ) {
      widgetData.hasControls = false;
    }
  }
  return widgetData;
};

/*
method to get  rule data based on ruleId, viewId and groupId
*/

export function getRuleDataByWidgetIdAndViewId(
  widgetId: string,
  widgetType: string,
  viewId: number,
  viewData: any,
  rulesList: any,
  editorData: IEditorData
) {
  let widgetData = getWidgetById(widgetId, viewId, editorData);
  let rule;
  if (widgetData) {
    rule = viewData.ConstraintsJson.WidgetConstraints.filter(
      (ruleData: any) => widgetData.id == ruleData.Id
    );

    widgetType = widgetType ? widgetType : widgetData.type;
  }
  if (!rule || !rule.length) {
    rule = viewData.ConstraintsJson.WidgetConstraints.filter(
      (ruleData: any) => widgetType == ruleData.Type
    );
  }

  if (rule && rule[0]) {
    let ruleId = rule[0].RuleId;

    if (ruleId) {
      let formattedRuleData = convertRuleData(widgetType, rulesList[ruleId]);
      return formattedRuleData;
    }
  }
}

/*
method to get convert rule data provided by ProductViewAPI into the data format
 which used in the application
*/

function convertRuleData(type: string, ruleData: any) {
  if (type == widgetConstants.TEXTBOX && ruleData) {
    let textRule: ITextBoxRule = {
      widget_key: ruleData.widget_key,
      ruleId: ruleData.ruleId,

      ruleCode: ruleData.RuleCode,
      fontSize: ruleData.fontSize,
      allowSelection: ruleData.selectable,
      groupedMessage: ruleData.groupedMessage,

      numberOfTextLines: ruleData.numberOfTextLines,
      textAlign: ruleData.textAlign,
      effects: ruleData.effects,
      group_key: ruleData.group_key,
      allowEditable: ruleData.canEdit,
      caption: ruleData.caption,
      characterLimit: ruleData.characterLimit,
      verticalTextAlign: ruleData.verticalTextAlign,
      price_key: ruleData.price_key,
      visible: ruleData.visible,
      text: ruleData.text,
      textValidation: ruleData.textValidation,
      showOnOutput: ruleData.showOnOutput,
      placeholderText: ruleData.placeholderText,
      canControlVisibility: ruleData.canControlVisibility,
      fontFamily: ruleData.fontFamily,
      custom_key: ruleData.custom_key,
      isRequired: ruleData.isRequired,
      allowScale: ruleData.allowScale,
      allowMove: ruleData.allowMove,
      bold: ruleData.bold,
      allowRotation: ruleData.allowRotation,
      italic: ruleData.italic,
      allowDelete: ruleData.allowDelete,
      arrange: ruleData.arrange,
      textColor: ruleData.textColor,
      resetToDefault: ruleData.resetToDefault,
      applyOneColorImprint: ruleData.RuleCode,
      allowSpellcheck: ruleData.allowSpellcheck,
      name_list: ruleData.name_list,
      rotate180Degree: ruleData.rotate180Degree,
      defaultHeight: ruleData.defaultHeight,
      defaultWidth: ruleData.defaultWidth,
      defaultLeft: ruleData.defaultLeft,
      defaultTop: ruleData.defaultTop,
      strokeWidth: ruleData.strokeWidth,
      stroke: ruleData.stroke,
      textDecoration: ruleData.textDecoration,
      lineHeight: ruleData.lineHeight,
      vAlign: ruleData.vAlign,
      noOfTextLines: ruleData.noOfTextLines,
      textValidations: ruleData.textValidations,
      canGrow: ruleData.canGrow,
    };
    return textRule;
  } else if (type == widgetConstants.IMAGE && ruleData) {
    let imgRule: IImageWidgetRule = {
      caption: ruleData.caption,
      ruleId: ruleData.ruleId,
      ruleCode: ruleData.RuleCode,
      widget_key: ruleData.widget_key,
      allowSelectable: ruleData.allowSelectable,
      cliparts: ruleData.cliparts,
      effects: ruleData.effects,
      allowEditable: ruleData.allowEditable,
      visible: ruleData.visible,
      showOnOutput: ruleData.showOnOutput,
      custom_key: ruleData.custom_key,
      allowClipartCaption: ruleData.allowClipartCaption,
      allowNoneOption: ruleData.allowNoneOption,
      userImage: ruleData.userImage,
      crop: ruleData.crop,
      allowMove: ruleData.allowMove,
      allowRotation: ruleData.allowRotation,
      allowScale: ruleData.allowScale,
      allowDelete: ruleData.allowDelete,
      defaultHeight: ruleData.defaultHeight,
      defaultWidth: ruleData.defaultWidth,
      defaultLeft: ruleData.defaultLeft,
      defaultTop: ruleData.defaultTop,
      arrange: ruleData.arrange,
      preserveWidgetAspectRatio: ruleData.preserveWidgetAspectRatio,
      applyOneColorImprint: ruleData.applyOneColorImprint,
      selectable: ruleData.selectable,
      widgetBorder: ruleData.widgetBorder,
      price_key: ruleData.price_key,
      group_key: ruleData.group_key,
    };

    return imgRule;
  } else {
    return ruleData;
  }
}

/*
method to get viewId by ViewCode
If viewCode not provided then it will return current viewId

If viewCode is wrong then viewId will not returned
return(number): ViewId match with provided view list
*/
export function getViewIdByViewCode(
  viewCode?: string,
  viewsData?: any,
  activeViewId?: number
) {
  if (viewsData && Object.keys(viewsData) && viewCode) {
    let viewsList = Object.keys(viewsData);
    let view: Array<string> = viewsList.filter((view: any) => {
      return viewsData[view].Code.toLowerCase() == viewCode.toLowerCase();
    });

    if (viewCode && view && view.length) {
      return view[0];
    }
  } else {
    return activeViewId;
  }
}

/*
method to get viewId by ViewCode

return(number): ViewId match with provided view list
*/
export function getEditorDataFromProductData(
  productData?: IProductVariantData
) {
  if (productData) {
    let editorData: IEditorData = {};
    for (let i = 0; i < productData.ProductViews.length; i++) {
      for (let j = 0; j < productData.ProductViews[i].Views.length; j++) {
        let templateId = productData.ProductViews[i].Views[j].TemplateId;
        let viewData = productData.ProductViews[i].Views[j];
        let templateData = productData.Templates.filter(
          (template: ITemplate) => template.Id == templateId
        )[0];

        editorData[viewData.Id] = processCanvasData(
          templateData,
          productData.Rules
        );
      }
    }
    return editorData;
  }
}

/*
method to get viewId by ViewCode

return(number): ViewId match with provided view list
*/
export function getViewData(productData?: IProductVariantData) {
  if (productData) {
    let viewsList: any = {};
    for (let i = 0; i < productData.ProductViews.length; i++) {
      for (let j = 0; j < productData.ProductViews[i].Views.length; j++) {
        let templateId = productData.ProductViews[i].Views[j].TemplateId;
        let viewData = productData.ProductViews[i].Views[j];
        let templateData = productData.Templates.filter(
          (template: ITemplate) => template.Id == templateId
        )[0];

        viewsList[viewData.Id] = { ...templateData, ...viewData };
      }
    }

    return viewsList;
  }
}

/*method to add Image widget on canvas*/
export function addImage(
  groupId: number,
  viewId: number,
  ruleData: IImageWidgetRule,
  updatedProps?: any
) {
  const widgetData: any = getMappedImgProps(
    groupId,
    viewId,
    ruleData,
    updatedProps
  );
  let win: any = window;
  fabric.util.loadImage(widgetData.src, function (img: HTMLImageElement) {
    var imgWidget = new fabric.Image(img, widgetData);
    imgWidget.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
    });
    let canvasId = groupId ? groupId + "_" + viewId : viewId;
    const editor = win[CANVAS][canvasId];
    editor.add(imgWidget);
    editor.setActiveObject(imgWidget);
    editor.renderAll();
    return imgWidget;
  });
  return widgetData;
}
/*method to get image widget properties from rule */
function getMappedImgProps(
  groupId: number,
  viewId: number,
  imageRule: IImageWidgetRule,
  updatedProps: any
) {
  let widgetId = generateWidgetId(widgetConstants.IMAGE, groupId, viewId);
  let originalImageDimension: { height: number; width: number } = {
    height: updatedProps.originalHeight,
    width: updatedProps.originalWidth,
  };
  let dim: any = getDefaultDimension(100, 50, originalImageDimension);
  let imageData = {
    id: widgetId,
    ruleId: imageRule.ruleId,
    cornerStyle: widgetPropertiesConstant.CORNER_STYLE,
    type: widgetConstants.IMAGE,
    filters: [],
    height: imageRule.defaultHeight
      ? imageRule.defaultHeight.defaultValue
      : dim.height,
    width: imageRule.defaultWidth
      ? imageRule.defaultWidth.defaultValue
      : dim.width,
    angle: 0,
    left: imageRule.defaultLeft ? imageRule.defaultLeft.defaultValue : 200,
    top: imageRule.defaultTop ? imageRule.defaultTop.defaultValue : 200,
    src: updatedProps.src,
    originX: widgetPropertiesConstant.ORIGIN_X,
    originY: widgetPropertiesConstant.ORIGIN_Y,
    libProp: {},
    scaleX: dim.scaleX,
    scaleY: dim.scaleY,
    originalUrl: updatedProps.originalUrl,
    lockRotation: imageRule.allowRotation ? false : true,
    hasRotatingPoint: imageRule.allowRotation
      ? imageRule.allowRotation.allow
      : false,
    selectable: imageRule.selectable ? imageRule.selectable.allow : false,
    lockScalingX: imageRule.allowScale ? false : true,
    lockScalingY: imageRule.allowScale ? false : true,
    lockMovementX: imageRule.allowMove ? false : true,
    lockMovementY: imageRule.allowMove ? false : true,
    borderColor: widgetPropertiesConstant.BORDER_COLOR,
    cornerColor: widgetPropertiesConstant.CORNER_COLOR,
    cornerSize: widgetPropertiesConstant.CORNER_SIZE,
    transparentCorners: false,
    canDelete: imageRule.allowDelete ? true : false,
    canRotate: imageRule.allowRotation ? true : false,
    canEdit: imageRule.allowEditable ? true : false,
    widgetBorder: imageRule.widgetBorder ? true : false,
    visible: imageRule.visible ? true : false,
    custom_key: imageRule.custom_key ? imageRule.custom_key.defaultValue : "",
    price_key: imageRule.price_key ? imageRule.price_key.defaultValue : "",
    group_key: imageRule.group_key ? imageRule.group_key.defaultValue : "",
    hasControls:
      imageRule.allowRotation && imageRule.allowScale && imageRule.allowMove
        ? true
        : false,
    opacity: 1,
  };
  return imageData;
}

export function getUpdatedWidgetData(widgetData: any, updatedData: any) {
  if (widgetData && widgetData.type == widgetConstants.IMAGE) {
    let sf = calculateScaleFactor(
      widgetData.width,
      widgetData.height,
      updatedData.originalWidth,
      updatedData.originalHeight
    );

    updatedData.height = updatedData.originalHeight * sf;

    updatedData.width = updatedData.originalWidth * sf;
  }

  if (updatedData.libProp) {
    let libProp = widgetData.libProp;
    libProp = { ...libProp, ...updatedData.libProp };
    updatedData.libProp = libProp;
  }

  return updatedData;
}

/* CALCULATING SCALE FACTOR OF ACTUAL WIDTH AND HEIGHT */
function calculateScaleFactor(
  actualWidth: number,
  actualHeight: number,
  width: number,
  height: number
) {
  let imageDimConstant = null;
  let scaleFactor = null;
  if (actualWidth >= actualHeight) {
    imageDimConstant = actualWidth;
  } else {
    imageDimConstant = actualHeight;
  }

  if (width >= height) {
    scaleFactor = imageDimConstant / width;
  } else {
    scaleFactor = imageDimConstant / height;
  }

  return scaleFactor;
}

function getDefaultDimension(
  width: number,
  height: number,
  originalImageDimension: { height: number; width: number }
) {
  let originalHeight = originalImageDimension.height || DefaultImageData.height;
  let originalWidth = originalImageDimension.width || DefaultImageData.width;

  let scaleWidth = width / originalWidth;
  let scaleHeight = height / originalHeight;
  let scaleFactor = Math.min(scaleWidth, scaleHeight);
  let newWidgetData: any = {};
  newWidgetData.width = originalWidth;
  newWidgetData.height = originalHeight;
  newWidgetData.scaleX = scaleFactor;
  newWidgetData.scaleY = scaleFactor;
  return newWidgetData;
}

export function getGroupIdByViewId(
  productViews: Array<IProductViewsData>,
  viewId: number
) {
  let groupId;
  for (let i = 0; i < productViews.length; i++) {
    if (productViews[i] && productViews[i].Views) {
      for (let j = 0; j < productViews[i].Views.length; j++) {
        if (
          productViews[i].Views &&
          productViews[i].Views[j] &&
          productViews[i].Views[j].Id == viewId
        ) {
          groupId = productViews[i].GroupId;
        }
      }
    }
  }
  return groupId;
}
/*method to get  print and canvas area by view data*/
export function getScaleFactorUsingPrintArea(viewData: any) {
  var printWidthSF = viewData.PrintWidth / viewData.CanvasWidth;
  var printHeightSF = viewData.PrintHeight / viewData.CanvasHeight;
  if (printWidthSF < printHeightSF) {
    printHeightSF = printWidthSF;
  } else {
    printWidthSF = printHeightSF;
  }

  return printWidthSF;
}

/*method to get SVG of view by view data*/
export function getSVGByViewData(viewData: any) {
  let sf = getScaleFactorUsingPrintArea(viewData);
  return sf;
}
