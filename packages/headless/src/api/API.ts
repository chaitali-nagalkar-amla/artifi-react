import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAPIParams } from "@chaitali-nagalkar-amla/common";
import { AutoFontSizeConstant } from "../constants/AutoFontSizeConstant";
export const autoFontSizeApiName = "autoFontSizeApi";
export const autoFontSizeApi = createApi({
  reducerPath: autoFontSizeApiName,
  baseQuery: fetchBaseQuery({
    baseUrl: AutoFontSizeConstant.AUTO_FONT_SIZE_API_PATH,
  }),
  endpoints: (builder) => ({
    GetFontSizeByRuleCode: builder.query<any, string>({
      query: (ruleCode: string) => `?${getAPIParams({ ruleCode: ruleCode })}`,
      transformResponse: (response: any) => {
        const fontSizeData = response.Data?.FontSizeData;
        let fontSizeArray = [];
        for (let fontSize = 0; fontSize < fontSizeData.length; fontSize++) {
          fontSizeArray.push(fontSizeData[fontSize].Value);
        }
        return fontSizeArray;
      },
    }),
  }),
});
export const autoFontSizeApiReducer = autoFontSizeApi.reducer;
export const { useGetFontSizeByRuleCodeQuery } = autoFontSizeApi;
