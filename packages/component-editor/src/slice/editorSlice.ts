import {
  Action,
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  getVariantDataOnSkuChange,
  loadFontsByView,
  loadProductVariantData,
} from "../api/editorAPI";
import "redux-thunk";
import {
  addText,
  getProductVariantDataOnSKUChange,
  getRuleDataByWidgetIdAndViewId,
  getGlobalRuleIdByType,
  getWidgetById,
  getWidgetListByType,
  processCanvasData,
  updateWidgetOnEditor,
  getGlobalRuleDataType,
  getViewIdByViewCode,
  getEditorDataFromProductData,
  addImage,
  getViewData,
  deleteWidgetOnEditor,
  selectWidgetOnEditor,
  getUpdatedWidgetData,
  getGroupIdByViewId,
} from "./editorSliceHelper";
import { IProductVariantData, IProductViewsData } from "../type/editorTypes";
import { stat } from "fs";
import { widgetConstants } from "../constants/editorConstants";
import { IEditorData } from "../type/widgetData";
import {
  sendArtifiInitialized,
  sendArtifiSKUChanged,
  sendArtifiViewChanged,
  sendArtifiWidgetAdded,
  sendArtifiWidgetDeleted,
  sendArtifiWidgetUpdated,
} from "@chaitali-nagalkar-amla/common";

export interface EditorState {
  value: number;
  status: "idle" | "loading" | "failed";
  viewData: any;

  productData: any;
  selectedSKU: string;
  activeGroupId: number;
  activeViewId: number;
  editorData: IEditorData;
  viewsData: any;
  activeWidget: any;
  loadedFontList: Array<string>;
}

const initialState: EditorState = {
  value: 0,
  status: "idle",
  viewData: null,
  productData: {},
  selectedSKU: "",
  viewsData: {},
  activeGroupId: 0,
  activeViewId: 0,
  editorData: {},
  activeWidget: null,
  loadedFontList: [],
};

export const changeSKU: any = createAsyncThunk(
  "editor/getProductViews",
  async (skuData: any, store: any) => {
    const sku = skuData.sku;
    let state: EditorState = store.getState().editor;
    let oldProductVariantData = state.productData[state.selectedSKU];

    if (state.productData && state.productData[sku]) {
      let newVariantData = JSON.parse(JSON.stringify(state.productData[sku]));

      let variantData = getVariantDataOnSkuChange(
        oldProductVariantData,
        newVariantData,
        sku,
        state.editorData
      );
      sendArtifiSKUChanged(sku);
      return variantData;
    } else {
      let variantData: any = await loadProductVariantData(
        sku,
        oldProductVariantData,
        state.editorData
      );

      variantData = JSON.parse(JSON.stringify(variantData));

      let selectedViewId: any = Object.keys(variantData.viewsData);
      if (selectedViewId && selectedViewId[0]) {
        let viewId = selectedViewId[0];
        let fontLoaded = await loadFontsByView(
          variantData.viewsData[viewId].TemplateCode,
          variantData.editorData[viewId],
          sku
        );

        //  variantData.viewsData[selectedViewId[0]].fontLoaded = fontLoaded;
      }

      if (Object.keys(state.viewsData).length === 0) {
        sendArtifiInitialized();
      } else {
        sendArtifiSKUChanged({ sku: sku });
      }
      return variantData;
    }
  }
);

export const selectWidgetById: any = createAsyncThunk(
  "editor/selectWidgetById",
  async (widgetData: any, store: any) => {
    let state: EditorState = store.getState().editor;
    let widgetId = widgetData.widgetId;
    const viewCode = widgetData.viewCode;
    const viewId: any = getViewIdByViewCode(
      viewCode,
      state.viewsData,
      state.activeViewId
    );

    if (viewId && widgetId) {
      let editorData = JSON.parse(JSON.stringify(state.editorData));

      let widgetIndex = editorData[viewId].objects.findIndex(
        (widget: any) => widget.id == widgetId
      );
      selectWidgetOnEditor(widgetId, state.activeGroupId, viewId);
      let activeWidget = null;

      if (editorData[viewId].objects[widgetIndex]) {
        activeWidget = editorData[viewId].objects[widgetIndex];
      }
      return activeWidget;
    }
  }
);

export const deleteWidgetById: any = createAsyncThunk(
  "editor/deleteWidgetById",
  async (widgetData: any, store: any) => {
    let state: EditorState = store.getState().editor;

    let viewId: any = getViewIdByViewCode(
      widgetData.viewCode,
      state.viewsData,
      state.activeViewId
    );
    let widgetId = widgetData.widgetId;

    let ruleData = getRuleDataByWidgetIdAndViewId(
      widgetId,
      widgetData.type,
      viewId,
      state.viewsData[viewId],
      state.productData[state.selectedSKU].Rules,
      state.editorData
    );

    if (viewId && widgetId && ruleData && ruleData.allowDelete) {
      deleteWidgetOnEditor(widgetId, state.activeGroupId, viewId);

      let widgetData = { widgetId: widgetId, viewId: viewId };
      sendArtifiWidgetDeleted(widgetData);
      return widgetData;
    }
  }
);

export const addWidget: any = createAsyncThunk(
  "editor/addWidget",
  async (payload: any, store: any) => {
    let state: EditorState = store.getState().editor;

    let viewId: any = getViewIdByViewCode(
      payload.viewCode,
      state.viewsData,
      state.activeViewId
    );

    if (viewId) {
      const ruleId = getGlobalRuleIdByType(
        payload.type,
        state.viewsData[viewId]
      );

      if (payload.type == widgetConstants.TEXTBOX) {
        let textWidget = addText(
          state.activeGroupId,
          viewId || state.activeViewId,
          state.productData[state.selectedSKU].Rules[ruleId],
          payload.textWidgetData
        );

        let widgetData = { widgetData: textWidget, viewId: viewId };
        sendArtifiWidgetAdded(widgetData);
        return widgetData;
      }

      if (payload.type == widgetConstants.IMAGE) {
        let imgWidget: any = addImage(
          state.activeGroupId,
          viewId,
          state.productData[state.selectedSKU].Rules[ruleId],
          payload.imgWidgetData
        );

        let widgetData = { widgetData: imgWidget, viewId: viewId };
        sendArtifiWidgetAdded(widgetData);
        return widgetData;
      }
    }
  }
);

export const editorSliceName = "editor";
export const editorSlice = createSlice({
  name: editorSliceName,
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeView: (state, action: PayloadAction<any>) => {
      if (state.activeViewId != action.payload.viewId) {
        state.activeWidget = null;
      }

      if (
        state.activeViewId != action.payload.viewId &&
        state.viewsData[state.activeViewId].TemplateCode
      ) {
        const viewId = action.payload.viewId;
        let groupId = getGroupIdByViewId(
          state.productData[state.selectedSKU].ProductViews,
          viewId
        );
        if (!groupId) {
          state.activeGroupId = 0;
        }
        loadFontsByView(
          state.viewsData[state.activeViewId].TemplateCode,
          state.editorData[viewId],
          state.selectedSKU
        );

        sendArtifiViewChanged(state.viewsData[viewId].Code);
      }

      state.activeViewId = action.payload.viewId;
    },

    widgetSelected: (state, action: PayloadAction<any>) => {
      let activeWidgetId = action.payload.selectedWidgetId;
      let viewId = state.activeViewId;
      let widgetIndex = state.editorData[viewId].objects.findIndex(
        (widget: any) => widget.id == activeWidgetId
      );

      state.editorData = JSON.parse(JSON.stringify(state.editorData));
      state.activeWidget = state.editorData[viewId].objects[widgetIndex];

      if (widgetIndex || widgetIndex == 0) {
        state.activeWidget = state.editorData[viewId].objects[widgetIndex];
      } else {
        state.activeWidget = null;
      }
    },

    widgetUpdated: (state, action: PayloadAction<any>) => {
      let activeWidgetId = action.payload.widgetData.id;
      let viewId = state.activeViewId;

      let activeWidgetData = action.payload.widgetData;

      let updatedData = {
        left: activeWidgetData.left,
        top: activeWidgetData.top,
        scaleX: activeWidgetData.scaleX,
        scaleY: activeWidgetData.scaleY,
      };

      let widgetData = getWidgetById(activeWidgetId, viewId, state.editorData);

      if (activeWidgetData) {
        widgetData = { ...widgetData, ...updatedData };

        let widgetIndex = state.editorData[viewId].objects.findIndex(
          (widget: any) => widget.id == activeWidgetId
        );

        state.editorData = JSON.parse(JSON.stringify(state.editorData));

        if (state.editorData[viewId].objects[widgetIndex]) {
          state.editorData[viewId].objects[widgetIndex] = widgetData;

          sendArtifiWidgetUpdated(widgetData);
        }
      }
    },
    addImageWidget: (state, action: PayloadAction<any>) => {
      {
        const viewCode = action.payload.viewCode;
        const viewId: any = getViewIdByViewCode(
          viewCode,
          state.viewsData,
          state.activeViewId
        );

        const ruleId = getGlobalRuleIdByType(
          widgetConstants.IMAGE,

          state.viewsData[viewId]
        );

        let widgetData = addImage(
          state.activeGroupId,
          viewId || state.activeViewId,
          state.viewData.Rules[ruleId]
        );

        state.editorData[viewId || state.activeViewId].objects.push(widgetData);
      }
    },

    /*method to update widget*/

    updateWidget: (state, action: PayloadAction<any>) => {
      const viewCode = action.payload.viewCode;

      let viewId: any = getViewIdByViewCode(
        viewCode,
        state.viewsData,
        state.activeViewId
      );

      let widgetId = action.payload.widgetId;

      if (viewId && widgetId) {
        let widgetData = getWidgetById(widgetId, viewId, state.editorData);
        if (widgetData && viewId) {
          let updatedData = action.payload.widgetData;

          updatedData = getUpdatedWidgetData(widgetData, updatedData);

          updateWidgetOnEditor(
            action.payload.widgetId,
            state.activeGroupId,
            viewId,
            updatedData,
            state.editorData
          );

          widgetData = { ...widgetData, ...updatedData };
          let widgetIndex = state.editorData[viewId].objects.findIndex(
            (widget: any) => widget.id == widgetId
          );

          state.editorData = JSON.parse(JSON.stringify(state.editorData));
          if (state.editorData[viewId].objects[widgetIndex]) {
            state.editorData[viewId].objects[widgetIndex] = widgetData;
            sendArtifiWidgetUpdated(widgetData);
          }
        }
      }
    },

    /*method to change view group*/
    changeGroup: (state, action: PayloadAction<any>) => {
      let groupData = state.productData[state.selectedSKU].ProductViews.filter(
        (group: IProductViewsData) => {
          return group.GroupId == action.payload.groupId;
        }
      );

      if (
        groupData &&
        groupData.length &&
        groupData[0].Views &&
        groupData[0].Views.length
      ) {
        state.activeGroupId = action.payload.groupId;
        state.activeViewId = groupData[0].Views[0].Id;
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder.addCase(changeSKU.fulfilled, (state, action) => {
      state.selectedSKU = action.payload.sku;
      state.productData[state.selectedSKU] = {};
      state.productData[state.selectedSKU] = action.payload;
      state.activeViewId = action.payload.ProductViews[0].Views[0].Id;
      state.activeGroupId = action.payload.ProductViews[0].GroupId;
      state.viewsData = action.payload.viewsData;
      state.editorData = action.payload.editorData;
    });

    builder.addCase(selectWidgetById.fulfilled, (state, action) => {
      state.activeWidget = action.payload;
    });

    builder.addCase(deleteWidgetById.fulfilled, (state, action) => {
      if (action.payload && action.payload.viewId && action.payload.widgetId) {
        let viewId = action.payload.viewId;
        let widgetId = action.payload.widgetId;
        let widgetIndex = state.editorData[viewId].objects.findIndex(
          (widget: any) => widget.id == widgetId
        );

        state.editorData = JSON.parse(JSON.stringify(state.editorData));
        if (state.editorData[viewId].objects[widgetIndex]) {
          state.editorData[viewId].objects.splice(widgetIndex, 1);
        }

        state.activeWidget = null;
      }
    });

    builder.addCase(addWidget.fulfilled, (state, action) => {
      let viewId = action.payload.viewId;
      let widgetData = action.payload.widgetData;

      state.editorData = JSON.parse(JSON.stringify(state.editorData));

      if (state.editorData[viewId].objects) {
        state.editorData[viewId].objects.push(widgetData);
      }
      state.activeWidget = widgetData;
    });
  },
});

/*method to get  product views data */
export const getAllViewsData = (state: EditorStateInterface) =>
  state.editor.productData && state.editor.productData[state.editor.selectedSKU]
    ? state.editor.productData[state.editor.selectedSKU].ProductViews
    : null;

/*method to get  product views data */
export const getProductViewsData = (state: EditorStateInterface) => {
  let viewData =
    state.editor.productData &&
    state.editor.productData[state.editor.selectedSKU]
      ? state.editor.productData[state.editor.selectedSKU].ProductViews
      : null;
  let data = getViewData(state.editor.productData[state.editor.selectedSKU]);

  return data;
};

/*method to get  product views data */
export const getEditorData = (state: EditorStateInterface) =>
  state.editor.editorData;

/*method to get selected sku */
export const getSelectedSKU = (state: EditorStateInterface) =>
  state.editor.selectedSKU;

/*method to get selected  viewId */
export const getActiveViewId = (state: EditorStateInterface) =>
  state.editor.activeViewId;

/*method to get selected  groupId */
export const getActiveGroupId = (state: EditorStateInterface) =>
  state.editor.activeGroupId;

/*method to get selected  groupId */
export const getActiveWidgetData = (state: EditorStateInterface) =>
  state.editor.activeWidget;

/*method to get widgetList by widgetType and viewCode */
export const getWidgetsListByType = (
  state: EditorStateInterface,
  widgetType: string,
  viewCode: string
) => {
  const viewId: any = getViewIdByViewCode(
    viewCode,
    state.editor.viewsData,
    state.editor.activeViewId
  );

  if (viewId) {
    let widgetList = getWidgetListByType(
      viewId,
      widgetType,
      state.editor.editorData
    );
    return widgetList;
  }
};

/*method to get widgetData by widgetId and viewCode */

export const getWidgetDataById = (
  state: EditorStateInterface,
  widgetId: string,
  viewCode?: string
) => {
  const viewId: any = getViewIdByViewCode(
    viewCode,
    state.editor.viewsData,
    state.editor.activeViewId
  );
  if (viewId) {
    return getWidgetById(widgetId, viewId, state.editor.editorData);
  }
};

/*method to get ruleData by widgetId and viewCode */

export const getRuleDataByWidgetId = (
  state: EditorStateInterface,
  widgetType: string,
  widgetId: string,
  viewCode?: string,
  isSelected?: boolean
) => {
  const viewId: any = getViewIdByViewCode(
    viewCode,
    state.editor.viewsData,
    state.editor.activeViewId
  );

  if (viewId) {
    if (state.editor.activeWidget && !widgetId) {
      widgetId = isSelected ? widgetId : state.editor.activeWidget.id;
    }

    return getRuleDataByWidgetIdAndViewId(
      widgetId,
      widgetType,
      viewId,
      state.editor.viewsData[viewId],
      state.editor.productData[state.editor.selectedSKU].Rules,
      state.editor.editorData
    );
  }
};

/*method to get global ruleData by widgetType and viewCode */

export const getGlobalRuleByType = (
  state: EditorStateInterface,
  widgetType: string,
  viewCode?: string
) => {
  if (state.editor.viewsData) {
    const viewId: any = getViewIdByViewCode(
      viewCode,
      state.editor.viewsData,
      state.editor.activeViewId
    );

    const ruleData = getGlobalRuleDataType(
      widgetType,

      state.editor.viewsData,
      state.editor.viewData.Rules
    );
    if (ruleData) {
      return ruleData;
    }
  }
};

type EditorStateInterface = { editor: EditorState };
type SliceThunkInterface<ReturnType = void> = ThunkAction<
  ReturnType,
  EditorStateInterface,
  unknown,
  Action<string>
>;
export let useSliceSelector: TypedUseSelectorHook<EditorStateInterface> =
  useSelector;

// This function would configure a "local" store if called, but currently it is
// not called, and is just used for type inference.
const configureLocalStore = () =>
  configureStore({
    reducer: { editor: editorSlice.reducer },
  });

// Infer the type of the dispatch that would be needed for a store that consisted of
// just this slice
type SliceDispatch = ReturnType<typeof configureLocalStore>["dispatch"];

export let useSliceDispatch = () => useDispatch<SliceDispatch>();

// Allows initializing of this package by a calling package with the "global"
// dispatch and selector hooks of that package, provided they satisfy this packages
// state and dispatch interfaces--which they will if the imported this package and
// used it to compose their store.
export const initializeSlicePackage = (
  useAppDispatch: typeof useSliceDispatch,
  useAppSelector: typeof useSliceSelector
) => {
  useSliceDispatch = useAppDispatch;
  useSliceSelector = useAppSelector;
};

export const {
  changeView,
  addImageWidget,
  changeGroup,
  updateWidget,
  widgetSelected,
  widgetUpdated,
} = editorSlice.actions;

export const editorSliceReducer = editorSlice.reducer;
