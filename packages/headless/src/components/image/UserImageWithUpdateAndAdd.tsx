import { createPortal } from "react-dom";
import { UserImages } from "@chaitali-nagalkar-amla/image";
import { ImageUpdater } from "@chaitali-nagalkar-amla/image-updater";
import {
  getActiveWidgetData,
  useSliceSelector,
} from "@chaitali-nagalkar-amla/editor";

export function UserImageWithUpdateAndAdd() {
  const userImagesContainer = document.getElementById("artifi-user-images");
  let widgetId = userImagesContainer?.getAttribute("data-image-id") ?? "";
  let allowAddFlag = userImagesContainer?.getAttribute("data-add-widget")
    ? userImagesContainer?.getAttribute("data-add-widget")
    : false; // True/False
  let viewCode = userImagesContainer?.getAttribute("data-view-code") ?? "";

  const activeWidget = useSliceSelector((state: any) =>
    getActiveWidgetData(state)
  );
  widgetId = activeWidget ? activeWidget.id : widgetId;

  return (
    <>
      {userImagesContainer &&
        createPortal(
          <ImageUpdater
            details={(
              imageRuleData: any,
              widgetData: any,
              onSelectAction: any
            ) =>
              imageRuleData &&
              imageRuleData.userImage &&
              imageRuleData.userImage.allow &&
              imageRuleData.allowEditable &&
              imageRuleData.allowEditable.allow ? (
                <UserImages onSelectAction={onSelectAction}></UserImages>
              ) : (
                <></>
              )
            }
            widgetId={widgetId}
            viewCode={viewCode}
            allowAddFlag={allowAddFlag}
          ></ImageUpdater>,
          userImagesContainer!
        )}
    </>
  );
}
