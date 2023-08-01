import { createPortal } from "react-dom";
import { ImageUpdater } from "@chaitali-nagalkar-amla/image-updater";

import { Clipart } from "@chaitali-nagalkar-amla/clipart";
import {
  widgetConstants,
  IImageRule,
  useSliceSelector,
  getActiveWidgetData,
} from "@chaitali-nagalkar-amla/editor";

export function ClipartImageWithUpdate() {
  const clipartContainer = document.getElementById("artifi-clipart");
  let widgetId = clipartContainer?.getAttribute("data-image-id") ?? "";
  let viewCode = clipartContainer?.getAttribute("data-view-code") ?? "";
  let allowAddFlag = clipartContainer?.getAttribute("data-add-widget")
    ? clipartContainer?.getAttribute("data-add-widget")
    : false; // True/False

  const activeWidget = useSliceSelector((state: any) =>
    getActiveWidgetData(state)
  );
  widgetId = activeWidget ? activeWidget.id : widgetId;
  return (
    <>
      {clipartContainer &&
        createPortal(
          <ImageUpdater
            details={(
              imageRuleData: IImageRule,
              widgetData: any,
              onSelectAction: any
            ) =>
              imageRuleData &&
              imageRuleData.cliparts &&
              imageRuleData.cliparts.allow &&
              imageRuleData.allowEditable &&
              imageRuleData.allowEditable.allow ? (
                <>
                  <Clipart
                    onSelect={onSelectAction}
                    ruleData={imageRuleData}
                  ></Clipart>
                </>
              ) : (
                <></>
              )
            }
            widgetId={widgetId}
            viewCode={viewCode}
            allowAddFlag={allowAddFlag}
          ></ImageUpdater>,
          clipartContainer!
        )}
    </>
  );
}
