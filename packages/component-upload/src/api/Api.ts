import {
  Constants,
  getAPIData,
  getAPIUrl,
  postUploadAPIData,
} from "@chaitali-nagalkar-amla/common";
import {
  UPLOAD_IMAGE_API_PATH,
  UPLOAD_IMAGE_SETTING_API_PATH,
  UploadConstants,
} from "../constants/UploadConstant";

import { IUploadSettings } from "../type/UploadComponentType";
import { ISettingData } from "../type/UploadType";

// Image setting api
export async function fetchImageSettings(): Promise<IUploadSettings> {
  const imageSettingData = await getAPIData(UPLOAD_IMAGE_SETTING_API_PATH, {});

  const allowedFileTypes = imageSettingData.ImageExtensions.toLowerCase()
    .split(",")
    .map((extension: string) => `.${extension}`)
    .toString();

  const acceptFileTypes =
    imageSettingData.ImageExtensions.toLowerCase().replaceAll(",", ", ");

  const imageSettingsData: IUploadSettings = {
    maxFileSize: imageSettingData.FileSize,
    allImageExtArr: imageSettingData.ImageExtensions.toLowerCase(),
    imageDPI: imageSettingData.ImageDPI,
    dimension: imageSettingData.Dimension,
    allowedFileTypes,
    acceptFileTypes,
  };
  return imageSettingsData;
}

// Upload image api
export async function uploadFile(file: File, settings: ISettingData) {
  const formData: any = new FormData();
  formData.append(UploadConstants.POSTED_FILE, file);
  const imageDPI = settings ? settings.imageDPI : null;
  const uploadImageAPI = getAPIUrl(UPLOAD_IMAGE_API_PATH, {
    userId: Constants.APP_CONFIG.USER_ID,
    DPI: imageDPI,
  });
  try {
    const data = await postUploadAPIData(uploadImageAPI, formData);
    return {
      originalHeight: data.Height,
      imageName: data.ImageName,
      uniqueName: data.UniqueName,
      src:
        Constants.USER_IMAGES_URL +
        Constants.STANDARD_KEY +
        "/" +
        data.UniqueName,
      originalUrl:
        Constants.USER_IMAGES_URL +
        Constants.ORIGINAL_KEY +
        "/" +
        data.UniqueName,
      originalWidth: data.Width,
    };
  } catch (e: any) {
    return {
      message: e.message || "",
    };
  }
}
