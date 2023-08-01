import React, { useEffect, useState } from "react";
import { FontStyletIcon } from "../icons/Icons";

import { useTranslation } from "react-i18next";

interface ItalicProps {
  textRule: any;
  italicValue: string;
  onUpdate: (textProp: any) => void;
  viewId?: number;
}

const Italic: React.FC<ItalicProps> = ({
  textRule,
  italicValue,
  onUpdate,
  viewId,
}) => {
  const [italic, setItalicValue] = useState(italicValue);

  const hoverClass = "lg:hover:border-blue-400";
  const selectClass = "border-blue-400";

  const { t } = useTranslation();

  useEffect(() => {
    setItalicValue(italicValue);
  }, [viewId]);

  return textRule && textRule.italic && textRule.italic.allow ? (
    <button
      value={italic}
      title={t("ITALIC")}
      className={`flex justify-center items-center p-1 w-11 h-[2.188rem] rounded-md border mx-1 group first:ml-0 last:mr-0 ${italic === "italic" ? selectClass : hoverClass
        } `}
      onClick={(e: any) => {
        if (e.currentTarget.value == "italic") {
          onUpdate({ fontStyle: "normal" });
          setItalicValue("normal");
        } else {
          onUpdate({ fontStyle: "italic" });
          setItalicValue("italic");
        }
      }}
    >
      <FontStyletIcon />
    </button>
  ) : (
    <></>
  );
};

export default Italic;
