import React from "react";
import { createPortal } from "react-dom";
import { TextUpdater } from "./TextUpdater";
import { ITextBoxRule } from "@artifi/editor";
import { TextArea } from "@artifi/text-area";

export function TextAreaWithUpdate() {
  const textArea = document.getElementById("artifi-text-area");
  const widgetId = textArea?.getAttribute("data-text-id") ?? "";
  const viewCode = textArea?.getAttribute("data-view-code") ?? "";
  return (
    <>
      {textArea &&
        createPortal(
          <TextUpdater
            details={(ruleData: ITextBoxRule, textData: any, onUpdate: any) => (
              <TextArea
                textValue={textData.text}
                textRule={ruleData}
                captions={{ placeholderText: "Add Text Here" }}
                widgetId={widgetId}
                onUpdate={onUpdate}
              ></TextArea>
            )}
            widgetId={widgetId}
            viewCode={viewCode}
          ></TextUpdater>,
          textArea!
        )}
    </>
  );
}
