import { generateURL } from "@chaitali-nagalkar-amla/common";
import { FontFamilyConstantType } from "../type/FontFamilyConstantType";

export let FontFamilyConstants: FontFamilyConstantType = {
  FONT_FAMILY_API_PATH: generateURL("api/1/Font/GetFontFamilyByRuleCode"),
  LOAD_FONT_FAMILY_API_PATH: generateURL("api/1/Font/GetFontCSSByFontCode"),
};
