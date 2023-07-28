import { getAPIData } from "@artifi/common";
import { AutoFontSizeConstant } from "../constants/AutoFontSizeConstant";
import { FontSize } from "../type/AutoFontSizeConstantType";

export async function fetchAutoFontSize(
    ruleCode: string
): Promise<FontSize[]> {
    const autoFontSize = await getAPIData(
        AutoFontSizeConstant.AUTO_FONT_SIZE_API_PATH,
        {
            ruleCode,
        }
    );
    const fontSizeData = autoFontSize.FontSizeData
    let fontSizeArray = [];
    for (let fontSize = 0; fontSize < fontSizeData.length; fontSize++) {
        fontSizeArray.push(fontSizeData[fontSize].Value)
    }
    return fontSizeArray
}