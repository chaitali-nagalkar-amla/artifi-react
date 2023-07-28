import React, { useEffect, useState } from "react";
import { LeftAlignIcon, CenterAlignIcon, RightAlignIcon } from "../icons/Icons";
import styles from "../css/horizontal-alignment.module.css";
import { useTranslation } from "react-i18next";
interface HorizontalAlignmentProps {
  value: "left" | "center" | "right";
  onUpdate: (textProp: any) => void;
  textRule: any;
  viewId?: number;
}

export const HorizontalAlignment: React.FC<HorizontalAlignmentProps> = ({
  textRule,
  value,
  onUpdate,
  viewId,
}) => {
  const [textAlign, setTextAlign] = useState(value);
  const hoverClass = "hover:border-blue-400";
  const selectClass = "border-blue-400";
  useEffect(() => {
    setTextAlign(value);
  }, [viewId]);

  const { t } = useTranslation();

  return textRule && textRule.textAlign && textRule.textAlign.allow ? (
    <div className="flex mx-1">
      <button
        value="Left"
        title={t("LEFT_ALIGN")}
        className={`flex justify-center items-center p-1 w-11 h-[2.188rem]  rounded-l-md border my-0.5 ${
          textAlign === "left" ? selectClass : hoverClass
        }`}
        onClick={(e: any) => {
          setTextAlign("left");
          onUpdate({ textAlign: "left" });
        }}
      >
        <LeftAlignIcon />
      </button>
      <button
        value="Center"
        title={t("CENTER_ALIGN")}
        className={`flex justify-center items-center p-1 w-11 h-[2.188rem] border my-0.5 ${
          textAlign === "center" ? selectClass : hoverClass
        }`}
        onClick={(e: any) => {
          setTextAlign("center");
          onUpdate({ textAlign: "center" });
        }}
      >
        <CenterAlignIcon />
      </button>
      <button
        value="Right"
        title={t("RIGHT_ALIGN")}
        className={`flex justify-center items-center p-1 w-11 h-[2.188rem] rounded-r-md border my-0.5 ${
          textAlign === "right" ? selectClass : hoverClass
        }`}
        onClick={(e: any) => {
          setTextAlign("right");
          onUpdate({ textAlign: "right" });
        }}
      >
        <RightAlignIcon />
      </button>
    </div>
  ) : (
    <></>
  );
};
