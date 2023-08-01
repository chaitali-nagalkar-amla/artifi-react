import UserImages from "./component/UserImages";
import { addTranslations } from "@chaitali-nagalkar-amla/common";
import { UserImageCaption } from "./captions/UserImageCaption";
import { userPhotoApi, userPhotoApiName, userPhotoApiReducer } from "./api/Api";
export { UserImages, userPhotoApi, userPhotoApiName, userPhotoApiReducer };
addTranslations(UserImageCaption);
