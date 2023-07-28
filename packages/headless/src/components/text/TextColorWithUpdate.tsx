import React from "react";
import { createPortal } from "react-dom";
import { TextUpdater } from "./TextUpdater";
import { ITextBoxRule } from "@artifi/editor";
import { ColorSwatches } from "@artifi/text-color";

export function TextColorWithUpdate() {
  const textColor = document.getElementById("artifi-text-color");
  const widgetId = textColor?.getAttribute("data-text-id") ?? "";
  const viewCode = textColor?.getAttribute("data-view-code") ?? "";
  return (
    <>
      {textColor &&
        createPortal(
          <TextUpdater
            details={(ruleData: ITextBoxRule, textData: any, onUpdate: any) => (
              <ColorSwatches
                value={textData.fill}
                onUpdate={onUpdate}
                textRule={ruleData}
                colorList={ruleData.textColor && ruleData.textColor.value}
              ></ColorSwatches>
            )}
            widgetId={widgetId}
            viewCode={viewCode}
          ></TextUpdater>,
          textColor!
        )}
    </>
  );
}
