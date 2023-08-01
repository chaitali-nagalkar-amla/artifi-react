"use client";
import { ITextBoxRule } from "@chaitali-nagalkar-amla/editor";
import { TextUpdater } from "./TextUpdater";
import { TextControls } from "./TextControls";
import { TextArea } from "@chaitali-nagalkar-amla/text-area";
interface TextListProps {
  textWidgets: any;
  viewCode: string;
}
const TextListMerge: React.FC<TextListProps> = ({ textWidgets, viewCode }) => {
  return (
    <div className="pb-2">
      <TextUpdater
        details={(ruleData: ITextBoxRule, textData: any, onUpdate: any) => (
          <>
            <TextArea
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
              widgetId={textWidgets.id}
              onUpdate={onUpdate}
            ></TextArea>
            <TextControls
              ruleData={ruleData}
              textData={textData}
              onUpdate={onUpdate}
              viewId={textWidgets.viewId}
            ></TextControls>
          </>
        )}
        widgetId={textWidgets.id}
        viewCode={viewCode}
      ></TextUpdater>
    </div>
  );
};
export default TextListMerge;
