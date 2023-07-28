
import React, { useEffect, useState } from "react";
import { fetchTextColor } from "../api/API";
import { TextColorType } from "../type/ColorSwatchesType";

interface ColorSwatchesProps {
    textRule: any
    value: string;
    onUpdate: (textProp: any) => void;
    colorList: any;
    viewId?: string
}

let textRuleColorData: any = {};
export const ColorSwatches: React.FC<ColorSwatchesProps> = ({ textRule, value, colorList, onUpdate, viewId }) => {
    const [selectedColor, setSelectedColor] = useState('');


    useEffect(() => {
        setSelectedColor("")
        fetchTextColorData()
    }, [viewId])


    function saveTextColorRuleData(textColorData: any, textRuleCode: string) {
        textRuleColorData[textRuleCode] = textColorData;
    }
    const fetchTextColorData = async () => {
        try {
            const defaultTextColor: any = value ? value : textRule ? textRule.textColor.defaultValue : "";

            let textColorData = await fetchTextColor(textRule.ruleCode);
            saveTextColorRuleData(textColorData, textRule.ruleCode)


            setSelectedColor(defaultTextColor);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        (textRule && textRule.textColor && textRule.textColor.allow
            ?
            <ul className="flex gap-x-2 overflow-x-auto overflow-y-hidden items-center p-[3px_5px_5px_3px] text-color-list">
                {textRuleColorData && textRuleColorData[textRule.ruleCode] && textRuleColorData[textRule.ruleCode].map((color: TextColorType) => (

                    <li key={color.HexValue} className={`flex-[0_0_32px] cursor-pointer w-8 h-8 rounded-full border border-gray-300 focus:outline-none hover:ring-1 hover:ring-blue-400 hover:ring-offset-1 ${color.HexValue === selectedColor ? "ring-1 ring-blue-400 ring-offset-1" : "ring-0"}`}
                        style={{ backgroundColor: color.HexValue }}
                        title={color.Name}
                        onClick={() => {
                            setSelectedColor(color.HexValue)
                            onUpdate({ fill: color.HexValue })
                        }
                        }
                    ></li>
                ))}
            </ul> : <></>)
    );
};



