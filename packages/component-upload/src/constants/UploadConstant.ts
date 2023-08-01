import { generateURL } from "@chaitali-nagalkar-amla/common";
import { UploadConstantType } from "../type/UploadConstantType";
export const UPLOAD_IMAGE_SETTING_API_PATH = generateURL(
  "api/v1/UploadImage/GetImageSettings"
);
export const UPLOAD_IMAGE_API_PATH = generateURL(
  "api/v1/UploadImage/UploadImage"
);

export const UploadConstants: UploadConstantType = {
  POSTED_FILE: "postedfile",
  DEFAULT_FILE_EXTENSION: ".jpeg,.jpg,.png",
  MAX_FILE_SIZE_BYTES: 1024,
};
