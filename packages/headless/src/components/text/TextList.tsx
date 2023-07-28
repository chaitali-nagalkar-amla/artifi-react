"use client";
import React, { useEffect, useState } from "react";
import {
  ITextBoxRule,
  getActiveWidgetData,
  widgetConstants,
} from "@artifi/editor";
import { TextUpdater } from "./TextUpdater";
import { TextControls } from "./TextControls";
import {
  useSliceSelector,
  getWidgetsListByType,
  getRuleDataByWidgetId,
} from "@artifi/editor";
import { TextArea } from "@artifi/text-area";
interface TextListProps {
  textWidgets: Array<ITextWidgetsData>;
  viewCode: string;
}

interface ITextWidgetsData {
  id: string;
  placeholder: string;
  text: string;
  viewId: string;
}

const TextList: React.FC<TextListProps> = ({ textWidgets, viewCode }) => {
  const [widgetId, setWidgetId] = useState("");
  const [viewId, setViewId] = useState("");
  const activeWidget = useSliceSelector((state: any) =>
    getActiveWidgetData(state)
  );
  useEffect(() => {
    if (activeWidget) {
      setWidgetId(activeWidget.id);
      setViewId(activeWidget.viewId);
    }
  }, [activeWidget]);
  function showTextPanel(dataId: string, viewId: string) {
    setViewId(viewId);
    setWidgetId(dataId);
  }

  return (
    <div>
      {textWidgets &&
        textWidgets.map((data: ITextWidgetsData) => (
          <>
            <TextUpdater
              details={(
                ruleData: ITextBoxRule,
                textData: any,
                onUpdate: any
              ) => (
                <div className="mb-3">
                  <div
                    onClick={(e) => {
                      showTextPanel(data.id, data.viewId);
                    }}
                    key={data.id}
                  >
                    <TextArea
                      key={data.id}
                      textValue={textData.text}
                      textRule={ruleData}
                      captions={{
                        placeholderText:
                          ruleData &&
                          ruleData.placeholderText &&
                          ruleData.placeholderText.allow
                            ? ruleData.placeholderText.defaultValue
                            : "Add Text Here",
                      }}
                      widgetId={data.id}
                      onUpdate={onUpdate}
                    ></TextArea>
                  </div>
                  {data.id == widgetId && data.viewId == viewId && (
                    <TextControls
                      ruleData={ruleData}
                      textData={textData}
                      onUpdate={onUpdate}
                      viewId={viewId}
                    ></TextControls>
                  )}
                </div>
              )}
              widgetId={data.id}
              viewCode={viewCode}
            ></TextUpdater>
          </>
        ))}
    </div>
  );
};

export default TextList;
