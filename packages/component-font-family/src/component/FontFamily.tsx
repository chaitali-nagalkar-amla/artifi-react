import React, { useEffect, useState } from "react";
import { fetchFontFamily } from "../api/Api";
import { loadFontsByFontCode } from "../api/Api";
import { FontFamilyType, ITextRule } from "../type/FontFamilyType";

interface FontFamilyListProps {
  value: string;
  onUpdate: (textProp: any) => void;
  textRule: any;
  viewId?: number;
}
let fontFamilyArray: any = {};
const FontFamily: React.FC<FontFamilyListProps> = ({
  textRule,
  value,
  onUpdate,
  viewId
}) => {
  const [fontFamily, setFontFamily] = useState("");
  const [fontFamilyData, setFontFamilyData] = useState<FontFamilyType[]>([]);
  const [loader, setLoader] = useState(false);

  let code: string;
  let fontId: number;
  useEffect(() => {
    setFontFamily(value);
  }, [viewId]);

  const selectFontFamily = (fontFamily: any) => {
    if (fontFamilyData && fontFamilyData.length > 0) {
      for (var i = 0; i < fontFamilyData.length; i++) {
        if (fontFamilyData[i].Value == fontFamily) {
          code = fontFamilyData[i].Code;
          fontId = fontFamilyData[i].Id;
          break;
        }
      }
      loadFontFamilyData(fontFamily, code, fontId);
    }

    // onUpdate({ fontFamily: font });
    // setFontFamily(font);
  };
  const loadFontFamilyData = async (
    fontName: string,
    code: string,
    fontId: number
  ) => {
    try {
      const fontFamilyData = await loadFontsByFontCode(code, fontName);

      if (fontFamilyData) {
        setFontFamily(fontName);

        let libProp = { FontId: fontId };
        onUpdate({ fontFamily: fontName, libProp: libProp });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchFontFamilyData = async () => {
    if (!fontFamilyData.length) {
      try {
        setLoader(true);
        const defaultFontFamilyValue: any = value
          ? value
          : textRule
            ? textRule.fontFamily.defaultValue
            : "";
        const fontFamilyData = await fetchFontFamily(textRule.ruleCode);
        setFontFamilyData(fontFamilyData);
        fontFamilyArray[textRule.ruleCode] = fontFamilyData;
        setFontFamily(defaultFontFamilyValue);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error fetching data:", error);
      }
    }
  };
  return textRule && textRule.fontFamily && textRule.fontFamily.allow ? (
    <select
      className="h-10 w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={fontFamily}
      onClick={() => fetchFontFamilyData()}
      onChange={(event) => selectFontFamily(event.target.value)}
    >
      {!fontFamilyData.length ? (
        <option>{value ? value : textRule.fontFamily.defaultValue}</option>
      ) : (
        <></>
      )}
      {!fontFamilyData.length && loader ? <option>loading...</option> : <></>}
      {fontFamilyData ? (
        fontFamilyData.map((family: FontFamilyType) => (
          <option key={family.Id} value={family.Value}>
            {family.Value}
          </option>
        ))
      ) : (
        <></>
      )}
    </select>
  ) : (
    <></>
  );
};

export default FontFamily;
