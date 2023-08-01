import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import {
  editorSliceName,
  editorSliceReducer,
} from "@chaitali-nagalkar-amla/editor";
import {
  clipartApi,
  clipartApiName,
  clipartApiReducer,
} from "@chaitali-nagalkar-amla/clipart";
import {
  textColorApi,
  textColorApiName,
  textColorApiReducer,
} from "@chaitali-nagalkar-amla/text-color";
import {
  userPhotoApi,
  userPhotoApiName,
  userPhotoApiReducer,
} from "@chaitali-nagalkar-amla/image";

import configReducer from "../slice/configSlice";
import {
  fontFamilyApi,
  fontFamilyApiName,
  fontFamilyApiReducer,
} from "@chaitali-nagalkar-amla/font-family";
import {
  fontSizeApi,
  fontSizeApiName,
  fontSizeApiReducer,
} from "@chaitali-nagalkar-amla/font-size";
import {
  autoFontSizeApi,
  autoFontSizeApiName,
  autoFontSizeApiReducer,
} from "../api/API";

export const store = configureStore({
  reducer: {
    config: configReducer,
    [editorSliceName]: editorSliceReducer,
    [textColorApiName]: textColorApiReducer,
    [fontFamilyApiName]: fontFamilyApiReducer,
    [fontSizeApiName]: fontSizeApiReducer,
    [autoFontSizeApiName]: autoFontSizeApiReducer,
    [clipartApiName]: clipartApiReducer,
    [userPhotoApiName]: userPhotoApiReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      fontFamilyApi.middleware,
      textColorApi.middleware,
      fontSizeApi.middleware,
      autoFontSizeApi.middleware,
      clipartApi.middleware,
      userPhotoApi.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
