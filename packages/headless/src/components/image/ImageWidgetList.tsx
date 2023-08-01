import React, { useEffect, useState } from "react";
import { Clipart } from "@chaitali-nagalkar-amla/clipart";
import { Upload } from "@chaitali-nagalkar-amla/upload";
import {
  useSliceSelector,
  getActiveWidgetData,
} from "@chaitali-nagalkar-amla/editor";
import { ChangeWidgetIcon, DeleteWidgetIcon } from "../icons/Icons";
import { ImageWidgetListProps } from "../../type/ImageProps";

const ImageWidgetList: React.FC<ImageWidgetListProps> = ({
  imageWidgets,
  ruleData,
  onUpdate,
}) => {
  const [clipart, showClipart] = useState(false);
  const [widgetId, setWidgetId] = useState("");
  const [viewId, setViewId] = useState("");
  const [uploadError, setUploadError] = useState<any>("");
  const activeWidget = useSliceSelector((state: any) =>
    getActiveWidgetData(state)
  );
  useEffect(() => {
    if (activeWidget) {
      setWidgetId(activeWidget.id);
      setViewId(activeWidget.viewId);
    }
  }, [activeWidget]);

  const showClipartPanel = (id: string, viewId: string) => {
    showClipart(true);
    setViewId(viewId);
    setWidgetId(id);
  };

  const showUploadError = (id: string, msg: string) => {
    setWidgetId(id);
    setUploadError(msg);
  };

  //Click on window hide clipart section
  useEffect(() => {
    document.addEventListener("click", hidePanel);
  });
  const hidePanel = (event: any) => {
    const uploadUserImageArea = event.target.closest(
      '[data-art-container="replace-image-area"]'
    );
    const imgcategory = event.target.closest(
      '[data-art-container="image-category"]'
    );
    if (!uploadUserImageArea && !imgcategory) {
      showClipart(false);
      setWidgetId("");
      setUploadError("");
    }
  };

  return (
    <>
      <li className="relative" key={imageWidgets.id}>
        <div className="widget-list">
          <div className="flex justify-between mb-2.5 items-center p-2 border rounded-lg relative">
            <div className="w-16 h-12 flex items-center justify-center pr-1 border-e border-dashed border-gray-300">
              <img className="max-h-12" src={imageWidgets.src}></img>
            </div>
            <label className="truncate w-[200px] mx-1 text-center">
              This is a test image
            </label>
            {/* Show clipart panel */}
            <div className="flex items-center min-w-[90px] justify-between">
              {ruleData &&
                ruleData.cliparts &&
                ruleData.cliparts.allow &&
                ruleData.allowEditable &&
                ruleData.allowEditable.allow && (
                  <button
                    data-art-container="replace-image-area"
                    className="text-black"
                    onClick={() =>
                      showClipartPanel(imageWidgets.id, imageWidgets.viewId)
                    }
                  >
                    <ChangeWidgetIcon />
                  </button>
                )}
              {/* Show Upload component */}
              {ruleData &&
                ruleData.userImage &&
                ruleData.userImage.allow &&
                ruleData.allowEditable &&
                ruleData.allowEditable.allow && (
                  <Upload
                    onUploadSuccess={onUpdate}
                    onUploadError={(data: any) => {
                      showUploadError(imageWidgets.id, data.message);
                      //setUploadError(data.message);
                    }}
                    uploadType={imageWidgets.id}
                  ></Upload>
                )}
              {/* Show delete option */}
              {ruleData &&
                ruleData.allowDelete &&
                ruleData.allowDelete.allow && (
                  <button
                    className="text-black"
                    data-art-id={imageWidgets.id}
                    onClick={() =>
                      onUpdate({
                        widgetId: imageWidgets.id,
                        deleteWidget: true,
                      })
                    }
                  >
                    <DeleteWidgetIcon />
                  </button>
                )}
            </div>
            {uploadError && imageWidgets.id == widgetId && (
              <span id={imageWidgets.id} className="text-red-600">
                {uploadError}
              </span>
            )}
          </div>
          {clipart && imageWidgets.id == widgetId && (
            <div id={imageWidgets.id} className="mb-3">
              <Clipart
                onSelect={onUpdate}
                ruleData={ruleData}
                //widgetId={widgetId}
              />
            </div>
          )}
        </div>
      </li>
    </>
  );
};

export default ImageWidgetList;
