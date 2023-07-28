import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitializeConfigType } from "../type/Type";

interface ConfigState {
  apiKey: string;
  apiEndpoint: string;
  // Add more key-value pairs as per your requirements
}

const initialState: ConfigState = {
  apiKey: "",
  apiEndpoint: "",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    updateConfig: (state, action: PayloadAction<ConfigState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateInitializeConfig: (
      state,
      action: PayloadAction<InitializeConfigType>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateConfig, updateInitializeConfig } = configSlice.actions;
export const selectWebAPiClientKey = (state: any) =>
  state.config.webApiClientKey;
export const selectWebsiteId = (state: any) => state.config.websiteId;
export const selectProductCode = (state: any) => state.config.productCode;
export const selectSKU = (state: any) => state.config.sku;
export const selectUserId = (state: any) => state.config.userId;
export const selectedCustomizedProductId = (state: any) =>
  state.config.customizedProductId;
export default configSlice.reducer;
