import React, { useEffect, useState } from "react";
//import { fetchFontFamily, useGetFontFamilyByRuleCodeQuery } from "../api/Api";
//import { loadFontsByFontCode } from "../api/Api";
import { FontFamilyType, ITextRule } from "../type/FontFamilyType";
import { fontFamilyApi, loadFontsByFontCode } from "../api/Api";

interface FontFamilyListProps {
  value: string;
  onUpdate: (textProp: any) => void;
  textRule: any;
  viewId?: number;
}
const FontFamily: React.FC<FontFamilyListProps> = ({
  textRule,
  value,
  onUpdate,
  viewId,
}) => {
  const [fontFamily, setFontFamily] = useState("");
  const [loader, setLoader] = useState(false);
  const [getData, data, error] =
    fontFamilyApi.endpoints.GetFontFamilyByRuleCode.useLazyQuery(
      textRule.ruleCode
    );

  let code: string;
  let fontId: number;
  useEffect(() => {
    setFontFamily(value);
  }, [viewId]);

  const selectFontFamily = (fontFamily: any) => {
    if (data && data.data.length > 0) {
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].Value == fontFamily) {
          code = data.data[i].Code;
          fontId = data.data[i].Id;
          break;
        }
      }
      console.log("font family version updated");
      loadFontFamilyData(fontFamily, code, fontId);
    }
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
  function fetchFontFamilyData() {
    try {
      setLoader(true);
      const defaultFontFamilyValue: any = value
        ? value
        : textRule
        ? textRule.fontFamily.defaultValue
        : "";
      if (data && !data.data) {
        getData(textRule.ruleCode, true);
      }
      if (error) {
        console.error("Error fetching data:", error);
      }
      setFontFamily(defaultFontFamilyValue);
      setLoader(false);
    } catch (e) {
      console.error("Error fetching data:", error);
    }
  }
  return textRule && textRule.fontFamily && textRule.fontFamily.allow ? (
    <select
      className="h-10 w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={fontFamily}
      onClick={() => fetchFontFamilyData()}
      onChange={(event) => selectFontFamily(event.target.value)}
    >
      {data && !data.data ? (
        <option>{value ? value : textRule.fontFamily.defaultValue}</option>
      ) : (
        <></>
      )}
      {loader ? <option>loading...</option> : <></>}
      {data && data.data ? (
        data.data.map((family: FontFamilyType) => (
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
