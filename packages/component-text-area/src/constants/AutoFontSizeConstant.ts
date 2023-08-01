import { generateURL } from "@chaitali-nagalkar-amla/common";
import { AutoFontSizeConstantType } from "../type/AutoFontSizeConstantType";

export let AutoFontSizeConstant: AutoFontSizeConstantType = {
  AUTO_FONT_SIZE_API_PATH: generateURL("api/v1/Font/GetFontSizeByRuleCode"),
};

export const captions: any = {};
