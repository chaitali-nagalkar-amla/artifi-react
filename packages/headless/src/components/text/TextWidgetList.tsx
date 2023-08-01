import {
  useSliceSelector,
  getWidgetsListByType,
  widgetConstants,
} from "@chaitali-nagalkar-amla/editor";
import { createPortal } from "react-dom";
import TextList from "./TextList";

export function TextWidgetList() {
  const textList = document.getElementById("artifi-text-widget-list");
  const viewCode = textList?.getAttribute("data-view-code") ?? "";
  const textWidgetList = useSliceSelector((state: any) =>
    getWidgetsListByType(state, widgetConstants.TEXTBOX, viewCode)
  );

  return (
    <>
      {textList &&
        createPortal(
          <TextList
            textWidgets={textWidgetList}
            viewCode={viewCode}
          ></TextList>,
          textList!
        )}
    </>
  );
}
