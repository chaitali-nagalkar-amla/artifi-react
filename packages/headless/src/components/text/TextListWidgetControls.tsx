import {
  useSliceSelector,
  getWidgetsListByType,
  widgetConstants,
} from "@artifi/editor";
import { createPortal } from "react-dom";
import TextListMerge from "./TextListMerge";

export function TextListWidgetControls() {
  const textList = document.getElementById("artifi-text-widget-open-List");
  const viewCode = textList?.getAttribute("data-view-code") ?? "";
  const textWidgetList = useSliceSelector((state: any) =>
    getWidgetsListByType(state, widgetConstants.TEXTBOX, "")
  );

  return (
    <>
      {textWidgetList &&
        textWidgetList.map(
          (data: any) =>
            textList &&
            createPortal(
              <TextListMerge
                textWidgets={data}
                viewCode={viewCode}
              ></TextListMerge>,
              textList!
            )
        )}
    </>
  );
}
