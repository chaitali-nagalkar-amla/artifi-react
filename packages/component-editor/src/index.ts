import { Editor } from "./components/Editor";
import { CANVAS, widgetConstants } from "./constants/editorConstants";
import {
  editorSliceReducer,
  initializeSlicePackage,
  editorSliceName,
  changeSKU,
  changeView,
  addWidget,
  updateWidget,
  getWidgetsListByType,
  changeGroup,
  getAllViewsData,
  useSliceSelector,
  getGlobalRuleByType,
  getEditorData,
  addImageWidget,
  getActiveWidgetData,
  getWidgetDataById,
  getRuleDataByWidgetId,
  deleteWidgetById,
  selectWidgetById,
  getProductViewsData,
  getSelectedSKU,
  getActiveViewId,
  getActiveGroupId,
} from "./slice/editorSlice";
import { getSVGByViewData } from "./slice/editorSliceHelper";
import { IImageRule, ITextBoxRule, ITextRule } from "./type/editorTypes";
import { generateEffectUrl } from "./slice/effectHelper";
export { generateEffectUrl }
import { IImageEffectsProps } from "./type/effectsTypes";
/*
    Ideally, these functions would live in some `editorSliceApi` module.
*/

export {
  Editor,
  editorSliceName,
  changeSKU,
  changeView,
  addWidget,
  updateWidget,
  editorSliceReducer,
  getWidgetsListByType,
  initializeSlicePackage,
  changeGroup,
  getAllViewsData,
  getEditorData,
  useSliceSelector,
  getGlobalRuleByType,
  widgetConstants,
  CANVAS,
  addImageWidget,
  getActiveWidgetData,
  ITextBoxRule,
  IImageRule,
  deleteWidgetById,
  selectWidgetById,
  getSelectedSKU,
  getWidgetDataById,
  getProductViewsData,
  getRuleDataByWidgetId,
  getActiveViewId,
  getActiveGroupId,
  getSVGByViewData,
  IImageEffectsProps
};

