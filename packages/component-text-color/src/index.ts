import { ColorSwatches } from "./component/TextColor";

import {
  textColorApi,
  textColorApiName,
  useGetTextColorsQuery,
  textColorApiReducer,
} from "./api/TextColorApi";

export {
  ColorSwatches,
  textColorApi,
  textColorApiName,
  useGetTextColorsQuery,
  textColorApiReducer,
};

import { Captions } from "./captions/Captions";
import { addTranslations } from "@chaitali-nagalkar-amla/common";

addTranslations(Captions);
