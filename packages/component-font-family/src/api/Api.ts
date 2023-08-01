import { getAPIUrl } from "@chaitali-nagalkar-amla/common";
import { FontFamilyConstants } from "../constants/FontFamilyConstant";
import WebFont from "webfontloader";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getAPIParams } from "@chaitali-nagalkar-amla/common";

export const fontFamilyApiName = "fontFamilyApi";
export const fontFamilyApi = createApi({
  reducerPath: fontFamilyApiName,
  baseQuery: fetchBaseQuery({
    baseUrl: FontFamilyConstants.FONT_FAMILY_API_PATH,
  }),
  endpoints: (builder) => ({
    GetFontFamilyByRuleCode: builder.query<any, string>({
      query: (ruleCode: string) => `?${getAPIParams({ ruleCode: ruleCode })}`,
      transformResponse: (response: any) => {
        return response.Data?.FontFamilyList;
      },
    }),
  }),
});
export const fontFamilyApiReducer = fontFamilyApi.reducer;
export const { useLazyGetFontFamilyByRuleCodeQuery } = fontFamilyApi;

export async function loadFontsByFontCode(
  fontCode: string,
  fontFamily: string
) {
  let fontLoaded = false;
  let fontUrl = getAPIUrl(FontFamilyConstants.LOAD_FONT_FAMILY_API_PATH, {
    fontCode: fontCode,
  });
  const promise = new Promise<boolean>((resolve, reject) => {
    if (!fontCode) {
      return resolve(fontLoaded);
    }
    WebFont.load({
      custom: {
        families: [fontFamily + ":n4,i4,n7,i7"],
        urls: [fontUrl],
      },
      active: function () {
        fontLoaded = true;
        resolve(fontLoaded);
      },
    });
  });
  return promise;
}
