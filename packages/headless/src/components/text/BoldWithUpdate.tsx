import React from "react";
import { createPortal } from "react-dom";
import { TextUpdater } from "./TextUpdater";
import { ITextBoxRule } from "@chaitali-nagalkar-amla/editor";
import { Bold } from "@chaitali-nagalkar-amla/font-weight";

export function BoldWithUpdate() {
  const textArea = document.getElementById("artifi-text-area");
  const widgetId = textArea?.getAttribute("data-text-id") ?? "";
  const viewCode = textArea?.getAttribute("data-view-code") ?? "";
  const bold = document.getElementById("artifi-text-bold");
  console.log("BOld container", bold);
  return (
    <>
      {bold &&
        createPortal(
          <TextUpdater
            details={(ruleData: ITextBoxRule, textData: any, onUpdate: any) => (
              <Bold
                textRule={ruleData}
                boldValue={textData.fontWeight}
                onUpdate={onUpdate}
              ></Bold>
            )}
            widgetId={widgetId}
            viewCode={viewCode}
          ></TextUpdater>,
          bold!
        )}
    </>
  );
}
