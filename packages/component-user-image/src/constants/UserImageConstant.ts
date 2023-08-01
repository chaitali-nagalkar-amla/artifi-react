import { generateURL } from "@chaitali-nagalkar-amla/common";
import { UserImageConstantType } from "../type/UserImageConstantType";

export const DELETE_USER_PHOTO_API = generateURL(
  "api/v1/UploadImage/DeleteUserPhoto"
);
export const USER_PHOTO_API = generateURL(
  "api/v1/UploadImage/GetUserUploadedList"
);

export let UserImageConstants: UserImageConstantType = {
  DEFAULT_PAGE_SIZE: 25,
};
