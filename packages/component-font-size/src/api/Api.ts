import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAPIParams } from "@chaitali-nagalkar-amla/common";
import { FontSizeConstants } from "../constants/FontSizeConstant";
export const fontSizeApiName = "fontSizeApi";
export const fontSizeApi = createApi({
  reducerPath: fontSizeApiName,
  baseQuery: fetchBaseQuery({
    baseUrl: FontSizeConstants.FONT_SIZE_API_PATH,
  }),
  endpoints: (builder) => ({
    GetFontSizeByRuleCode: builder.query<any, string>({
      query: (ruleCode: string) => `?${getAPIParams({ ruleCode: ruleCode })}`,
      transformResponse: (response: any) => {
        return response.Data?.FontSizeData;
      },
    }),
  }),
});
export const fontSizeApiReducer = fontSizeApi.reducer;
export const { useGetFontSizeByRuleCodeQuery } = fontSizeApi;
