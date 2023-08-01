import { createPortal } from "react-dom";
import { UploadImageUpdater } from "@chaitali-nagalkar-amla/upload-image-updater";
import { Upload } from "@chaitali-nagalkar-amla/upload";
import {
  IImageRule,
  getActiveWidgetData,
  useSliceSelector,
} from "@chaitali-nagalkar-amla/editor";

export function UserImageUploadWithUpdateAndAdd() {
  const uploadContainer = document.getElementById("artifi-upload-user-image");
  let widgetId = uploadContainer?.getAttribute("data-image-id") ?? "";
  let addWidgetFlag = uploadContainer?.getAttribute("data-add-widget")
    ? uploadContainer?.getAttribute("data-add-widget")
    : false;
  let viewCode = uploadContainer?.getAttribute("data-view-code") ?? "";

  const activeWidget = useSliceSelector((state: any) =>
    getActiveWidgetData(state)
  );
  widgetId = activeWidget ? activeWidget.id : widgetId;
  const uploadType = "";
  return (
    <>
      {uploadContainer &&
        createPortal(
          <UploadImageUpdater
            details={(imageRuleData: IImageRule, onUploadAction: any) =>
              imageRuleData &&
              imageRuleData.userImage &&
              imageRuleData.userImage.allow &&
              imageRuleData.allowEditable &&
              imageRuleData.allowEditable.allow ? (
                <Upload
                  onUploadSuccess={onUploadAction}
                  uploadType={uploadType}
                  onUploadError={(data: any) => {
                    console.log("Error Data", data);
                  }}
                ></Upload>
              ) : (
                <></>
              )
            }
            widgetId={widgetId}
            viewCode={viewCode}
            allowAddWidgetFlag={addWidgetFlag}
          ></UploadImageUpdater>,
          uploadContainer!
        )}
    </>
  );
}
