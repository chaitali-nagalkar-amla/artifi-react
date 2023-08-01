import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CLIPART_API } from "../constants/ClipartConstant";
import { getAPIParams } from "@chaitali-nagalkar-amla/common";
import { ClipartImageType } from "../type/ClipartType";
import { Constants } from "@chaitali-nagalkar-amla/common";

export const clipartApiName = "clipartApi";
export const clipartApi = createApi({
  reducerPath: clipartApiName,
  baseQuery: fetchBaseQuery({
    baseUrl: CLIPART_API,
  }),
  endpoints: (builder) => ({
    GetCliparts: builder.query<any, any>({
      query: (imageProperties) =>
        `?${getAPIParams({
          clientCode: imageProperties.clientCode,
          ruleCode: imageProperties.ruleCode,
          folderCode: imageProperties.folderCode,
          pageIndex: imageProperties.pageIndex,
          pageSize: imageProperties.pageSize,
        })}`,
      transformResponse: (response: any) => {
        const { Data } = response;
        const clipartImageList: ClipartImageType[] =
          Data.ClipartList.AssetList.map((item: ClipartImageType) => ({
            ...item,
            Original: `${Constants.CLIPART_IMAGE}${Constants.ORIGINAL_KEY}/${item.UniqueName}`,
            Thumbnail: `${Constants.CLIPART_IMAGE}${Constants.THUMBNAIL_KEY}/${item.UniqueName}`,
            Standard: `${Constants.CLIPART_IMAGE}${Constants.STANDARD_KEY}/${item.UniqueName}`,
          }));

        return {
          clipartFamilyList: Data.ClipartFamilyList,
          images: clipartImageList,
          totalImages: Data.ClipartList.AssetCount,
        };
      },
    }),
  }),
});
export const clipartApiReducer = clipartApi.reducer;
export const { useGetClipartsQuery } = clipartApi;
