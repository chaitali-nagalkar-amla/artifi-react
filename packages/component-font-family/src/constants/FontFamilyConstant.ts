import { generateURL } from "@artifi/common";
import { FontFamilyConstantType } from "../type/FontFamilyConstantType";

export let FontFamilyConstants: FontFamilyConstantType = {
  FONT_FAMILY_API_PATH: generateURL("api/v1/Font/GetFontFamilyByRuleCode"),
  LOAD_FONT_FAMILY_API_PATH: generateURL("api/v1/Font/GetFontCSSByFontCode")
};
