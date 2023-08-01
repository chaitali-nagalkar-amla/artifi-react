import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TextColorConstants } from "../constants/TextColorConstant";
import { getAPIParams } from "@chaitali-nagalkar-amla/common/lib/api";
export const textColorApiName = "textColorApi";

export const textColorApi = createApi({
  reducerPath: textColorApiName,
  baseQuery: fetchBaseQuery({
    baseUrl: TextColorConstants.TEXT_COLOR_API_PATH,
  }),
  endpoints: (builder) => ({
    GetTextColors: builder.query<any, string>({
      query: (ruleCode: string) => `?${getAPIParams({ ruleCode: ruleCode })}`,
      transformResponse: (response: any) => {
        return response.Data?.ColorList?.AssetList;
      },
    }),
  }),
});
export const textColorApiReducer = textColorApi.reducer;
export const { useGetTextColorsQuery } = textColorApi;
