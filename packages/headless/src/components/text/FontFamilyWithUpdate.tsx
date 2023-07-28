import React from "react";
import { createPortal } from "react-dom";
import { TextUpdater } from "./TextUpdater";
import { ITextBoxRule } from "@artifi/editor";
import { FontFamily } from "@artifi/font-family";

export function FontFamilyWithUpdate() {
  const fontFamily = document.getElementById("artifi-text-family");
  const widgetId = fontFamily?.getAttribute("data-text-id") ?? "";
  const viewCode = fontFamily?.getAttribute("data-view-code") ?? "";
  return (
    <>
      {fontFamily &&
        createPortal(
          <TextUpdater
            details={(ruleData: ITextBoxRule, textData: any, onUpdate: any) => (
              <FontFamily
                value={textData.fontFamily}
                onUpdate={onUpdate}
                textRule={ruleData}
              ></FontFamily>
            )}
            widgetId={widgetId}
            viewCode={viewCode}
          ></TextUpdater>,
          fontFamily!
        )}
    </>
  );
}
