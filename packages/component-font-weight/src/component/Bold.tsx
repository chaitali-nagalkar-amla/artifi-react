import React, { useEffect, useState } from "react";
import { FontWeightIcon } from "../icons/Icons";
import { useTranslation } from "react-i18next";

interface BoldProps {
  textRule: any;
  boldValue: string;
  onUpdate: (textProp: any) => void;
  viewId?: number;
}

export const Bold: React.FC<BoldProps> = ({
  textRule,
  boldValue,
  onUpdate,
  viewId,
}) => {
  const [bold, setBoldValue] = useState(boldValue);
  const hoverClass = "lg:hover:border-blue-400";
  const selectClass = "border-blue-400";

  const { t } = useTranslation();
  useEffect(() => {
    setBoldValue(boldValue);
  }, [viewId]);
  return textRule && textRule.bold && textRule.bold.allow ? (
    <button
      value={bold}
      title={t("BOLD")}
      className={`flex justify-center items-center p-1 w-11 h-[2.188rem] rounded-md border mx-1 group first:ml-0 last:mr-0 ${
        bold === "bold" ? selectClass : hoverClass
      } `}
      onClick={(e: any) => {
        if (e.currentTarget.value == "bold1") {
          onUpdate({ fontWeight: "normal" });
          setBoldValue("normal");
        } else {
          onUpdate({ fontWeight: "bold" });
          setBoldValue("bold");
        }
      }}
    >
      <FontWeightIcon />
    </button>
  ) : (
    <></>
  );
};
