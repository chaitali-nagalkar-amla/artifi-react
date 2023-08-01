import { generateURL } from "@chaitali-nagalkar-amla/common";
import { FontSizeConstantType } from "../type/FontSizeConstantType";

export let FontSizeConstants: FontSizeConstantType = {
  FONT_SIZE_API_PATH: generateURL("api/1/Font/GetFontSizeByRuleCode"),
};
