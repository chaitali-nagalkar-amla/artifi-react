import React, { useEffect, useState } from "react";
import { FontSizeType, ITextRule } from '../type/FontSizeType'

import { FontSize } from '../type/FontSizeConstantType'
import { useGetFontSizeByRuleCodeQuery } from "../api/Api";
interface FontSizeListProps {
  value: string;
  onUpdate: (textProp: any) => void;
  textRule: any;
  viewId?: number
}
const FontSize: React.FC<FontSizeListProps> = ({ textRule, value, onUpdate, viewId }) => {
  const [fontSize, setFontSize] = useState('');
  const { data, error, isLoading } = useGetFontSizeByRuleCodeQuery(textRule.ruleCode);
  const selectSizeFamily = (Size: any) => {
    onUpdate({ fontSize: Size })
    setFontSize(Size)
  }
  useEffect(() => {
    setFontSize(value)
    setDefaultFontSizeData()
  }, [viewId])

  const setDefaultFontSizeData = async () => {
    try {
      const defaultFontSizeValue: any = value ? value : textRule ? textRule.fontSize.DefaultValue : "";
      setFontSize(defaultFontSizeValue)
      if (error) {
        console.error("Error fetching data:", error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    (textRule && textRule.fontSize && textRule.fontSize.Allow && data && data.length > 0
      ?
      <div className="flex items-center justify-between">
        <span >{data && data[0].Value}</span>
        <input id="small-range" type="range" min={data && data[0].Value} max={data && data[data.length - 1].Value} className="w-[90%] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
          value={value}
          onChange={(event) => selectSizeFamily(event.target.value)}
        >
        </input>
        <span>{fontSize}</span>
      </div> : <></>)
  );
};

export default FontSize;

