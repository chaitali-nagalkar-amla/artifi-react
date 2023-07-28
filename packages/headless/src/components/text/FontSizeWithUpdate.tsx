import React from "react";
import { createPortal } from "react-dom";
import { TextUpdater } from "./TextUpdater";
import { ITextBoxRule } from "@artifi/editor";
import { FontSize } from "@artifi/font-size";

export function FontSizeWithUpdate() {
  const fontSize = document.getElementById("artifi-text-size");
  const widgetId = fontSize?.getAttribute("data-text-id") ?? "";
  const viewCode = fontSize?.getAttribute("data-view-code") ?? "";
  return (
    <>
      {fontSize &&
        createPortal(
          <TextUpdater
            details={(ruleData: ITextBoxRule, textData: any, onUpdate: any) => (
              <FontSize
                value={textData.fontSize}
                onUpdate={onUpdate}
                textRule={ruleData}
              ></FontSize>
            )}
            widgetId={widgetId}
            viewCode={viewCode}
          ></TextUpdater>,
          fontSize!
        )}
    </>
  );
}
