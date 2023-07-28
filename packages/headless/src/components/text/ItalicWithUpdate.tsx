import React from "react";
import { createPortal } from "react-dom";
import { TextUpdater } from "./TextUpdater";
import { ITextBoxRule } from "@artifi/editor";
import { Italic } from "@artifi/font-style";

export function ItalicWithUpdate() {
  const italic = document.getElementById("artifi-text-italic");
  const widgetId = italic?.getAttribute("data-text-id") ?? "";
  const viewCode = italic?.getAttribute("data-view-code") ?? "";

  return (
    <>
      {italic &&
        createPortal(
          <TextUpdater
            details={(ruleData: ITextBoxRule, textData: any, onUpdate: any) => (
              <Italic
                textRule={ruleData}
                italicValue={textData.fontWeight}
                onUpdate={onUpdate}
              ></Italic>
            )}
            widgetId={widgetId}
            viewCode={viewCode}
          ></TextUpdater>,
          italic!
        )}
    </>
  );
}
