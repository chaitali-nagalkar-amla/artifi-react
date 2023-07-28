import { UploadCaption } from "../captions/UploadCaptions";
import { UploadConstants } from "../constants/UploadConstant";
import { IFileData, ISettingData } from "../type/UploadType";

export const FileValidation = (
  file: IFileData,
  settings: ISettingData,
  invalidFileMsg: string,
  sizeLimitMsg: string
) => {
  if (settings) {
    const { acceptFileTypes, maxFileSize } = settings;
    let allowedExtArr = acceptFileTypes.split(", ");
    let fileExt = file.name.split(".").pop().toLowerCase();
    //File Type
    if (allowedExtArr.indexOf(fileExt) === -1) {
      return invalidFileMsg;
    }
    //File Size
    if (
      maxFileSize * UploadConstants.MAX_FILE_SIZE_BYTES <
      file.size / UploadConstants.MAX_FILE_SIZE_BYTES
    ) {
      return sizeLimitMsg;
    }
  }
};
