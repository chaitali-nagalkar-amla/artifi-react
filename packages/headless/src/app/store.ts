import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import {
  editorSliceName,
  editorSliceReducer,
} from "@chaitali-nagalkar-amla/editor";

import configReducer from "../slice/configSlice";

export const store = configureStore({
  reducer: {
    config: configReducer,

    [editorSliceName]: editorSliceReducer,
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
