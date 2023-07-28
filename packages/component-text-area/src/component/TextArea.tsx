import React, { useEffect, useState } from "react";

import {
  useSliceSelector,
  getWidgetDataById,
  selectWidgetById,
} from "@artifi/editor";
import { ValidateText } from "../textHelperFunctions/TextValidation";
import { useDispatch } from "react-redux";
interface TextAreaProps {
  textValue: string;
  onUpdate: (textValueUpdate: any) => void;
  textRule: any;
  captions: any;
  widgetId: any;
}
let autoFontSizeData: any = {};
const TextArea: React.FC<TextAreaProps> = ({
  textValue,
  onUpdate,
  textRule,
  captions,
  widgetId,
}) => {
  const [inputValue, setInputValue] = useState(textValue);
  const [errorMessage, setErrorMsg] = useState("");
  const [characterCount, setCharacterCount] = useState(
    textValue && textValue.length ? textValue.length : 0
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue(textValue);
    setErrorMsg("");
  }, [textRule]);
  function updateWidget(updatedText: any) {
    let updatedData: any = ValidateText(updatedText, textRule);
    setErrorMsg(updatedData.msg);
    setCharacterCount(updatedData.updatedText.length);
    if (updatedData && updatedData.msg == "" && updatedData.isTextValid) {
      setInputValue(updatedData.updatedText);
      return updatedData;
    } else {
      return updatedData;
    }
  }

  const widgetData: any = useSliceSelector((state: any) =>
    getWidgetDataById(state, widgetId)
  );

  function selectWidget(dataId: any) {
    dispatch(
      selectWidgetById({
        widgetId: dataId,
      })
    );
  }

  return (
    <>
      {textRule &&
      textRule.allowSelection &&
      textRule.allowSelection.allow &&
      textRule.allowEditable &&
      textRule.allowEditable.allow ? (
        <>
          <div className="relative mb-[10px]">
            <h3>
              {textRule.caption &&
                textRule.caption.allow &&
                textRule.caption.defaultValue}
            </h3>
            <textarea
              value={textValue}
              className="resize-none h-10 w-full py-[7px] px-[5px] rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 pr-16 mb-[10px] custom-scroll custom-scroll-text"
              onChange={(e) => {
                let updatedTextData = updateWidget(e.currentTarget.value);
                if (updatedTextData.isTextValid) {
                  onUpdate({ text: updatedTextData.updatedText });
                }
              }}
              onClick={(e) => {
                selectWidget(widgetId);
              }}
              placeholder={captions.placeholderText || "Click here to add text"}
            />
            <>
              {errorMessage ? (
                <span className="text-red-600 lg:text-[0.8rem] text-[0.7rem] block text-left leading-none absolute top-[84%]">
                  {errorMessage}
                </span>
              ) : (
                <></>
              )}
              {textRule.characterLimit ? (
                <span className="text-zinc-500 text-sm leading-none block text-right w-16 absolute top-[48%] right-[15px]">
                  {characterCount}/{textRule.characterLimit.defaultValue}
                </span>
              ) : (
                <></>
              )}
            </>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TextArea;
