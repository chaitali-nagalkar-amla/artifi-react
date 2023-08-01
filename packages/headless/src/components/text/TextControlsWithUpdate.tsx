import React from "react";
import { createPortal } from "react-dom";
import { TextUpdater } from "./TextUpdater";
import { ITextBoxRule } from "@chaitali-nagalkar-amla/editor";
import { TextControls } from "./TextControls";
export function TextControlsWithUpdate() {
  const textControls = document.getElementById("artifi-text-controls");
  const widgetId = textControls?.getAttribute("data-text-id") ?? "";
  const viewCode = textControls?.getAttribute("data-view-code") ?? "";

  return (
    <>
      {textControls &&
        createPortal(
          <TextUpdater
            details={(ruleData: ITextBoxRule, textData: any, onUpdate: any) => (
              <TextControls
                ruleData={ruleData}
                textData={textData}
                onUpdate={onUpdate}
              ></TextControls>
            )}
            widgetId={widgetId}
            viewCode={viewCode}
          ></TextUpdater>,
          textControls!
        )}
    </>
  );
}
