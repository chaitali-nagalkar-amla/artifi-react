import { createPortal } from "react-dom";
import {
  useSliceSelector,
  getWidgetsListByType,
  getActiveWidgetData,
  widgetConstants
} from "@artifi/editor";

import ImageList from "./ImageList";
import { ImageUpdater } from "./ImageUpdater";

export function ImageWidgetListWithUpdate() {
  const widgetListContainer = document.getElementById("artifi-image-list");
  let viewCode = widgetListContainer?.getAttribute("data-view-code") ?? "";
  const imageWidgets = useSliceSelector((state: any) =>
    getWidgetsListByType(state, widgetConstants.IMAGE, viewCode)
  );
  return (
    <>
      {widgetListContainer &&
        createPortal(
          <ImageUpdater
            details={(
              imageRuleData: any,
              widgetData: any,
              onSelectAction: any,
              onSelectWidget: any
            ) =>
              imageRuleData ? (
                <>
                  <ImageList
                    imageWidgets={imageWidgets}
                    viewCode={viewCode}
                  ></ImageList>
                </>
              ) : (
                <></>
              )
            }
            widgetId={""}
            viewCode={viewCode}
            allowAddFlag={""}
          ></ImageUpdater>,
          widgetListContainer!
        )}
    </>
  );
}
