import React, { useEffect, useState } from "react";
import { IUploadProps } from "../type/UploadComponentType";
import { fetchImageSettings, uploadFile } from "../api/Api";

import {
  UploadImageIcon,
  UploadWidgetImageIcon,
  UploadImageLoaderIcon,
} from "../icons/Icons";
import { IFileData, ISettingData } from "../type/UploadType";
import { FileValidation } from "../component/FileValidation";
import { UploadConstants } from "../constants/UploadConstant";
import { useTranslation } from "react-i18next";

const Upload: React.FC<IUploadProps> = ({
  onUploadSuccess,
  uploadType,
  onUploadError,
}) => {
  const [imageSettings, setImageSettings] = useState<ISettingData>();
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [uploaderId, setUploaderId] = useState(
    new Date().getSeconds().toString()
  );

  // Set upload user image setting data
  const fetchUploadImageSettings = async () => {
    try {
      const imageSettingsData = await fetchImageSettings();
      setImageSettings(imageSettingsData);
    } catch (error) {
      console.log(error);
    }
  };
  const { t } = useTranslation();
  useEffect(() => {
    if (!imageSettings) {
      fetchUploadImageSettings();
    }
  }, []);

  //Click on window hide validation error message
  useEffect(() => {
    document.addEventListener("click", hideImageValidationMsg);
  }, [validationErrorMessage]);

  const hideImageValidationMsg = () => {
    if (validationErrorMessage) {
      setValidationErrorMessage("");
    }
  };

  const getUploadId = () => {
    let htmlId = "file-upload";
    if (uploadType) {
      htmlId += uploadType;
    }
    return htmlId;
  };

  const fileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file: IFileData = event.target.files[0];
    if (imageSettings) {
      //validate upload file
      let validationMsg = FileValidation(
        file,
        imageSettings,
        t("FILE_INVALID_MSG"),
        t("SIZE_LIMIT_MSG")
      );
      if (validationMsg && onUploadError) {
        onUploadError({ message: validationMsg });
        setValidationErrorMessage(validationMsg);
        event.target.value = "";
        return;
      }
    }
    setLoader(true);
    if (file && imageSettings) {
      try {
        const uploadedFileData = await uploadFile(file, imageSettings);
        if (uploadedFileData && uploadedFileData.src) {
          onUploadSuccess(uploadedFileData);
        } else if (onUploadError) {
          onUploadError({ message: uploadedFileData.message });
          setValidationErrorMessage(uploadedFileData.message);
        }
      } catch (error) {
        console.error(error);
        // Handle error, if required
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    //Upload new user image
    <div
      className={`${
        !uploadType
          ? "bg-neutral-100 border border-dashed border-slate-400 p-[10px] text-center rounded min-h-[115px]"
          : ""
      }`}
    >
      <label
        htmlFor={getUploadId()}
        className="font-semibold text-[14px] cursor-pointer flex flex-col items-center justify-center relative"
        title={`${uploadType ? t("UPLOAD") : ""}`}
      >
        {!loader ? (
          //Upload Logo
          uploadType ? (
            <UploadWidgetImageIcon />
          ) : (
            <UploadImageIcon />
          )
        ) : (
          //Uploading logo/Loader
          <span className="animate-[spin_1000ms_linear_infinite]">
            <UploadImageLoaderIcon />
          </span>
        )}
        {!uploadType &&
          /*Upload image from your computer message */
          t("UPLOAD_FROM_COMPUTER_MSG")}
        <input
          type="file"
          id={getUploadId()}
          className="hidden"
          accept={
            imageSettings
              ? imageSettings.allowedFileTypes
              : UploadConstants.DEFAULT_FILE_EXTENSION
          }
          onChange={fileUpload}
        />
      </label>
      {validationErrorMessage && !uploadType && validationErrorMessage ? (
        //Validation error message
        <span className="text-red-600 text-[11px]">
          {validationErrorMessage}
        </span>
      ) : (
        !uploadType && (
          //General information message for uploading image
          <p className="text-[11px] mt-1">
            {imageSettings &&
              `${t("MAX_FILE_UPLOAD")}: ${imageSettings.maxFileSize} MB`}
            <br></br>
            {imageSettings &&
              ` ${t("SUPPORTED_FILES")}: ${imageSettings.acceptFileTypes}`}
          </p>
        )
      )}
    </div>
  );
};
export default Upload;
