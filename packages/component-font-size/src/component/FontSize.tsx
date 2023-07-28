import React, { useEffect, useState } from "react";
import { fetchFontSize } from "../api/Api";
import { FontSizeType, ITextRule } from '../type/FontSizeType'

import { FontSize } from '../type/FontSizeConstantType'
interface FontSizeListProps {
  value: string;
  onUpdate: (textProp: any) => void;
  textRule: any;
  viewId?: number
}
const FontSize: React.FC<FontSizeListProps> = ({ textRule, value, onUpdate, viewId }) => {
  const [fontSize, setFontSize] = useState('');
  const [fontSizeArray, setFontSizeArray] = useState<FontSize[]>([]);

  const selectSizeFamily = (Size: any) => {
    onUpdate({ fontSize: Size })
    setFontSize(Size)
  }

  useEffect(() => {
    setFontSize(value)
    fetchFontSizeData()
  }, [viewId])

  const fetchFontSizeData = async () => {
    try {
      const defaultFontSizeValue: any = value ? value : textRule ? textRule.fontSize.DefaultValue : "";
      let fontSizeData = await fetchFontSize(textRule.ruleCode);
      setFontSizeArray(fontSizeData)
      setFontSize(defaultFontSizeValue)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    (textRule && textRule.fontSize && textRule.fontSize.Allow && fontSizeArray && fontSizeArray.length > 0
      ?
      <div className="flex items-center justify-between">
        <span >{fontSizeArray && fontSizeArray[0].Value}</span>
        <input id="small-range" type="range" min={fontSizeArray && fontSizeArray[0].Value} max={fontSizeArray && fontSizeArray[fontSizeArray.length - 1].Value} className="w-[90%] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
          value={value}
          onChange={(event) => selectSizeFamily(event.target.value)}
        >
        </input>
        <span>{fontSize}</span>
        {/* <input type="text" value={fontSize}>{fontSize}</input> */}
      </div> : <></>)
  );
};

export default FontSize;

