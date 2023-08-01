import FontFamily from "./component/FontFamily";
import {
  fontFamilyApi,
  fontFamilyApiName,
  fontFamilyApiReducer,
} from "./api/Api";

export { FontFamily, fontFamilyApi, fontFamilyApiName, fontFamilyApiReducer };

import { Captions } from "./captions/Captions";
import { addTranslations } from "@chaitali-nagalkar-amla/common";

addTranslations(Captions);
