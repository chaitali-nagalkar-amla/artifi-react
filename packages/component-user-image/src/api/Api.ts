import { Constants, getAPIData } from "@chaitali-nagalkar-amla/common";
import {
  DELETE_USER_PHOTO_API,
  USER_PHOTO_API,
} from "../constants/UserImageConstant";
import { IUserImageType } from "../type/UserImageType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAPIParams } from "@chaitali-nagalkar-amla/common";

export const userPhotoApiName = "userPhotoApi";
export const userPhotoApi = createApi({
  reducerPath: userPhotoApiName,
  baseQuery: fetchBaseQuery({
    baseUrl: USER_PHOTO_API,
  }),
  endpoints: (builder) => ({
    GetUserPhoto: builder.query<any, any>({
      query: (imageProperties) =>
        `?${getAPIParams({
          userId: Constants.APP_CONFIG.USER_ID,
          pageIndex: imageProperties.pageIndex,
          pageSize: imageProperties.pageSize,
        })}`,
      transformResponse: (response: any) => {
        const { AssetList, AssetCount } = response.Data;

        if (AssetList && AssetList.length === 0) {
          return { images: [], totalImages: 0 };
        }

        const generateImageUrl = (key: string, item: IUserImageType) =>
          `${Constants.USER_IMAGES_URL}${key}/${item.UniqueName}`;

        const userImageList: IUserImageType[] = AssetList.map(
          (item: IUserImageType) => ({
            ...item,
            OriginalUrl: generateImageUrl(Constants.ORIGINAL_KEY, item),
            ThumbnailUrl: generateImageUrl(Constants.THUMBNAIL_KEY, item),
            StandardUrl: generateImageUrl(Constants.STANDARD_KEY, item),
          })
        );

        return { images: userImageList, totalImages: AssetCount };
      },
    }),
  }),
});

// Delete user image api
export async function deleteUserImage(photoId: number): Promise<any> {
  try {
    return await getAPIData(DELETE_USER_PHOTO_API, {
      userId: Constants.APP_CONFIG.USER_ID,
      photoId,
    });
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}
export const userPhotoApiReducer = userPhotoApi.reducer;
export const { useGetUserPhotoQuery } = userPhotoApi;
