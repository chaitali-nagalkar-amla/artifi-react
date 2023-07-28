import { Constants, getAPIData } from "@artifi/common";
import { DELETE_USER_PHOTO_API, USER_PHOTO_API, UserImageConstants } from "../constants/UserImageConstant";
import { IUserImageType } from "../type/UserImageType";


// Delete user image api
export async function deleteUserImage(photoId: number): Promise<any> {
  return await getAPIData(DELETE_USER_PHOTO_API, {
    userId: Constants.APP_CONFIG.USER_ID,
    photoId
  });
}

// Fetch user images api
export async function fetchUserImages(
  pageSize: number = UserImageConstants.DEFAULT_PAGE_SIZE,
  pageIndex: number
): Promise<{ images: IUserImageType[]; totalImages: number }> {
  const userImages: any = await getAPIData(USER_PHOTO_API, {
    userId: Constants.APP_CONFIG.USER_ID,
    pageSize,
    pageIndex,
  });

  // Check if the userImages.AssetList is empty
  if (!userImages.AssetList || userImages.AssetList.length === 0) {
    return { images: [], totalImages: 0 };
  } else {
    const userImageList: IUserImageType[] = userImages.AssetList.map(
      (item: IUserImageType) => ({
        ...item,
        OriginalUrl: `${Constants.USER_IMAGES_URL}${Constants.ORIGINAL_KEY}/${item.UniqueName}`,
        ThumbnailUrl: `${Constants.USER_IMAGES_URL}${Constants.THUMBNAIL_KEY}/${item.UniqueName}`,
        StandardUrl: `${Constants.USER_IMAGES_URL}${Constants.STANDARD_KEY}/${item.UniqueName}`,
      })
    );
    return { images: userImageList, totalImages: userImages.AssetCount };
  }
}
