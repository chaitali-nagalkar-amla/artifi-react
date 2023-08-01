import FontSize from "./component/FontSize";
import {
  fontSizeApi,
  fontSizeApiName,
  useGetFontSizeByRuleCodeQuery,
  fontSizeApiReducer,
} from "./api/Api";

export {
  FontSize,
  fontSizeApi,
  fontSizeApiName,
  useGetFontSizeByRuleCodeQuery,
  fontSizeApiReducer,
};

import { Captions } from "./captions/Captions";
import { addTranslations } from "@chaitali-nagalkar-amla/common";

addTranslations(Captions);
