import React from "react";
import { createPortal } from "react-dom";
import { TextUpdater } from "./TextUpdater";
import { ITextBoxRule } from "@chaitali-nagalkar-amla/editor";
import { HorizontalAlignment } from "@chaitali-nagalkar-amla/horizontal-alignment";

export function TextAlignmentWithUpdate() {
  const hrAlignment = document.getElementById("artifi-horizontal-alignment");
  const widgetId = hrAlignment?.getAttribute("data-text-id") ?? "";
  const viewCode = hrAlignment?.getAttribute("data-view-code") ?? "";

  return (
    <>
      {hrAlignment &&
        createPortal(
          <TextUpdater
            details={(ruleData: ITextBoxRule, textData: any, onUpdate: any) => (
              <HorizontalAlignment
                value={textData.textAlign}
                onUpdate={onUpdate}
                textRule={ruleData}
              ></HorizontalAlignment>
            )}
            widgetId={widgetId}
            viewCode={viewCode}
          ></TextUpdater>,
          hrAlignment!
        )}
    </>
  );
}
