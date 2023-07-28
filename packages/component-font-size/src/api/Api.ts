import { FontSizeConstants } from "../constants/FontSizeConstant";
import { getAPIData } from "@artifi/common";
import { FontSize, FontSizeConstantType } from "../type/FontSizeConstantType";

export async function fetchFontSize(
  ruleCode: string
): Promise<FontSize[]> {
  const autoFontSize = await getAPIData(
    FontSizeConstants.FONT_SIZE_API_PATH,
    {
      ruleCode,
    }
  );
  const fontSizeData = autoFontSize.FontSizeData

  return fontSizeData
}