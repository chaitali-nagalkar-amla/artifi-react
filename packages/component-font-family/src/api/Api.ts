import { getAPIData, getAPIUrl } from "@chaitali-nagalkar-amla/common";
import { FontFamilyConstants } from "../constants/FontFamilyConstant";
import { FontFamilyType } from "../type/FontFamilyType";
import WebFont from "webfontloader";

// A mock function to mimic making an async request for data
export async function fetchFontFamily(
  ruleCode: string
): Promise<FontFamilyType[]> {
  const fontFamilyData = await getAPIData(
    FontFamilyConstants.FONT_FAMILY_API_PATH,
    {
      ruleCode,
    }
  );
  return fontFamilyData.FontFamilyList;
}

export async function loadFontFamily(
  fontCode: string
): Promise<FontFamilyType[]> {
  const loadFontFamily = await getAPIData(
    FontFamilyConstants.LOAD_FONT_FAMILY_API_PATH,
    {
      fontCode,
    }
  );
  return loadFontFamily;
}

export async function loadFontsByFontCode(
  fontCode: string,
  fontFamily: string
) {
  let fontLoaded = false;
  let fontUrl = getAPIUrl(FontFamilyConstants.LOAD_FONT_FAMILY_API_PATH, {
    fontCode: fontCode,
  });
  const promise = new Promise<boolean>((resolve, reject) => {
    if (!fontCode) {
      return resolve(fontLoaded);
    }
    WebFont.load({
      custom: {
        families: [fontFamily + ":n4,i4,n7,i7"],
        urls: [fontUrl],
      },
      active: function () {
        fontLoaded = true;
        resolve(fontLoaded);
      },
    });
  });
  return promise;
}
