import React, { useState } from "react";
import { Clipart } from "@artifi/clipart";
import { Upload } from "@artifi/upload";
import { ChangeWidgetIcon, DeleteWidgetIcon } from "../icons/Icons"
interface ImageListProps {
  imageWidgets: Array<IImageWidgetsData>;
  imageRule: any;
  onSelect: any;
  onSelectWidget?: any
}

interface IImageWidgetsData {
  id: string;
  placeholder: string;
  src: string;
}

const ImageList: React.FC<ImageListProps> = ({
  imageWidgets,
  imageRule,
  onSelect,
  onSelectWidget,
}) => {
  const [clipart, showClipart] = useState(false);
  const [widgetId, setWidgetId] = useState("");
  const showClipartPanel = (id: string) => {
    onSelectWidget({
      widgetId: id,
      viewCode: "left",
    });
    showClipart(true);
    setWidgetId(id);
  };
  return (
    <>
      <ul>
        {imageWidgets &&
          imageWidgets.map((data: { id: any; src: string }, index: any) => (
            <>
              <li
                key={data.id}
                className="flex justify-between mb-2.5 items-center p-2.5 border rounded-lg relative"
              >
                <div className="w-16 h-12 flex items-center justify-center pr-1 border-e border-dashed border-black">
                  <img className="max-h-12" src={data.src}></img>
                </div>
                <label className="truncate w-[200px] mr-0.25 text-center">
                  This is a test image
                </label>
                <div className="flex items-center min-w-[90px] justify-between">
                  <button
                    className="text-gray-800 hover:text-black"
                    onClick={() => showClipartPanel(data.id)}
                  >
                    <ChangeWidgetIcon />
                  </button>
                  <Upload
                    onUploadSuccess={onSelect}
                    onUploadError={(data: any) => {
                      console.log("Error in upload");
                    }}
                    uploadType={data.id}
                  ></Upload>
                  <button
                    className="text-gray-800 hover:text-black"
                    data-art-id={data.id}
                    onClick={() =>
                      onSelect({
                        widgetId: data.id,
                      })
                    }
                  >
                    <DeleteWidgetIcon />
                  </button>
                </div>
              </li>
              {clipart && data.id == widgetId && (
                <div id={data.id} className="mb-3">
                  <Clipart onSelect={onSelect} ruleData={imageRule} />
                </div>
              )}
            </>
          ))}
      </ul>
    </>
  );
};

export default ImageList;
