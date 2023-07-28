"use client";

import React, { useEffect, useState } from "react";
import { TopAlignIcon, MiddleAlignIcon, BottomAlignIcon } from "../icons/Icons";
import styles from "../css/vertical-alignment.module.css";
import { ITextRule } from "../type/VerticalAlignmentType";

interface VerticalAlignmentProps {
  textRule: ITextRule;
  value: "top" | "middle" | "bottom";
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const VerticalAlignment: React.FC<VerticalAlignmentProps> = ({
  textRule,
  value,
  onChange,
}) => {
  const [textAlign, setTextAlign] = useState("");

  useEffect(() => {
    if (!textAlign) {
      var defaultValue =
        textRule && textRule.verticalTextAlign.defaultValue
          ? textRule.verticalTextAlign.defaultValue
          : "";
      setTextAlign(defaultValue);
    }
  });

  return textRule &&
    textRule.verticalTextAlign &&
    textRule.verticalTextAlign.allow ? (
    <div className="flex mx-1">
      <button
        className={`p-1 w-11 h-[2.188rem] hover:border-blue-400 flex justify-center items-center text-gray-400 hover:text-black rounded-l-md border border-gray-300 my-0.5 group ${
          textAlign === "top" ? styles["selected"] : ""
        }`}
        onClick={() => setTextAlign("top")}
      >
        <TopAlignIcon />
      </button>
      <button
        className={`p-1 w-11 h-[2.188rem] hover:border-blue-400 flex justify-center items-center text-gray-400 hover:text-black border border-gray-300 my-0.5 group ${
          textAlign === "middle" ? styles["selected"] : ""
        }`}
        onClick={() => setTextAlign("middle")}
      >
        <MiddleAlignIcon />
      </button>
      <button
        className={`p-1 w-11 h-[2.188rem] hover:border-blue-400 flex justify-center items-center text-gray-400 hover:text-black rounded-r-md border border-gray-300 my-0.5 group ${
          textAlign === "bottom" ? styles["selected"] : ""
        }`}
        onClick={() => setTextAlign("bottom")}
      >
        <BottomAlignIcon />
      </button>
    </div>
  ) : (
    <></>
  );
};
