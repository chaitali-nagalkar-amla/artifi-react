import React, { useEffect, useState } from "react";
import { Clipart } from "@chaitali-nagalkar-amla/clipart";
import { Upload } from "@chaitali-nagalkar-amla/upload";
import {
  useSliceSelector,
  getActiveWidgetData,
  IImageRule,
} from "@chaitali-nagalkar-amla/editor";
import { ChangeWidgetIcon, DeleteWidgetIcon } from "../icons/Icons";
import { ImageUpdater } from "../image/ImageUpdater";
import ImageWidgetList from "./ImageWidgetList";
interface ImageListProps {
  imageWidgets: Array<IImageWidgetsData>;
  viewCode: any;
}

interface IImageWidgetsData {
  id: string;
  placeholder: string;
  src: string;
  viewId: string;
}

const ImageList: React.FC<ImageListProps> = ({ imageWidgets, viewCode }) => {
  const [clipart, showClipart] = useState(false);
  const [widgetId, setWidgetId] = useState("");
  const [viewId, setViewId] = useState("");
  const [uploadError, setUploadError] = useState("");
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

  //Click on window hide clipart section
  useEffect(() => {
    document.addEventListener("click", hidePanel);
  });
  const hidePanel = (event: any) => {
    const uploadUserImageArea = event.target.closest(
      '[data-art-container="replace-image-area"]'
    );
    if (!uploadUserImageArea) {
      showClipart(false);
      setWidgetId("");
    }
  };

  return (
    <div>
      <ul>
        {imageWidgets &&
          imageWidgets.map((data: IImageWidgetsData) => (
            <>
              <ImageUpdater
                details={(
                  ruleData: IImageRule,
                  imageData: any,
                  onUpdate: any
                ) => (
                  <ImageWidgetList
                    imageWidgets={data}
                    ruleData={ruleData}
                    onUpdate={onUpdate}
                  ></ImageWidgetList>
                )}
                widgetId={data.id}
                viewCode={viewCode}
                allowAddFlag={false}
              ></ImageUpdater>
            </>
          ))}
      </ul>
    </div>
  );
};

export default ImageList;
