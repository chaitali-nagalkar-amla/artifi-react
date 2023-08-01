import Clipart from "./component/Clipart";
import { ClipartCaption } from "./captions/ClipartCaption";
import { clipartApi, clipartApiName, clipartApiReducer } from "./api/Api";
import { addTranslations } from "@chaitali-nagalkar-amla/common";
export { Clipart, clipartApi, clipartApiName, clipartApiReducer };
addTranslations(ClipartCaption);
