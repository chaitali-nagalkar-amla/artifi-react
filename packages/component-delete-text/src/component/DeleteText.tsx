import React from "react";
import { DeleteTextIcon } from "../icons/Icons";
import { useTranslation } from "react-i18next";

interface DeleteProps {
  textRule: any;
}

export const DeleteText: React.FC<DeleteProps> = ({ textRule }) => {
  const { t } = useTranslation();

  return textRule && textRule.allowDelete && textRule.allowDelete.allow ? (
    <div className="mx-1">
      <button
        title={t("DELETE_TEXT")}
        className={`p-1 w-11 h-[2.188rem] hover:border-blue-400 flex justify-center items-center text-gray-400 hover:text-black rounded-md border border-gray-300 m-0.5 group
                    }`}
      >
        <DeleteTextIcon />
      </button>
    </div>
  ) : (
    <></>
  );
};
