import { getAPIData } from "@artifi/common";
import { TextColorConstants } from "../constants/TextColorConstant";
import { TextColorType } from "../type/ColorSwatchesType";

// A mock function to mimic making an async request for data
export async function fetchTextColor(
    ruleCode: string
): Promise<TextColorType[]> {
    const fontFamilyData = await getAPIData(
        TextColorConstants.TEXT_COLOR_API_PATH,
        {
            ruleCode,
        }
    );
    return fontFamilyData.ColorList.AssetList;
}