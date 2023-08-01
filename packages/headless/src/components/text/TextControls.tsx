import { Bold } from "@chaitali-nagalkar-amla/font-weight";
import { Italic } from "@chaitali-nagalkar-amla/font-style";
import { FontFamily } from "@chaitali-nagalkar-amla/font-family";
import { FontSize } from "@chaitali-nagalkar-amla/font-size";
import { ColorSwatches } from "@chaitali-nagalkar-amla/text-color";
import { HorizontalAlignment } from "@chaitali-nagalkar-amla/horizontal-alignment";
import { useTranslation } from "react-i18next";

export function TextControls({ ruleData, textData, onUpdate, viewId }: any) {
  const { t } = useTranslation();

  return (
    <>
      {ruleData ? (
        <>
          {ruleData &&
          ((ruleData.bold && ruleData.bold.allow) ||
            (ruleData.italic && ruleData.italic.allow) ||
            (ruleData.textAlign && ruleData.textAlign.allow)) ? (
            <>
              <div className="flex items-center mb-[10px]">
                <Bold
                  textRule={ruleData}
                  boldValue={textData.fontWeight}
                  onUpdate={onUpdate}
                  viewId={viewId}
                ></Bold>
                <Italic
                  textRule={ruleData}
                  italicValue={textData.fontStyle}
                  onUpdate={onUpdate}
                  viewId={viewId}
                ></Italic>
                <HorizontalAlignment
                  value={textData.textAlign}
                  onUpdate={onUpdate}
                  textRule={ruleData}
                  viewId={viewId}
                ></HorizontalAlignment>
              </div>
            </>
          ) : (
            <></>
          )}

          {ruleData && ruleData.fontSize && ruleData.fontSize.Allow ? (
            <div className="mb-[10px]">
              <h3 className="text-md">{t("FONT_SIZE")}</h3>
              <FontSize
                value={textData.fontSize}
                onUpdate={onUpdate}
                textRule={ruleData}
                viewId={viewId}
              ></FontSize>
            </div>
          ) : (
            <></>
          )}

          {ruleData && ruleData.fontFamily && ruleData.fontFamily.allow ? (
            <div className="mb-[10px]">
              <h3 className="text-md">{t("FONT_FAMILY")}</h3>
              <FontFamily
                value={textData.fontFamily}
                onUpdate={onUpdate}
                textRule={ruleData}
                viewId={viewId}
              ></FontFamily>
            </div>
          ) : (
            <></>
          )}
          {ruleData && ruleData.textColor && ruleData.textColor.allow ? (
            <div className="mb-[10px]">
              <h3 className="text-md">{t("TEXT_COLOR")}</h3>
              <ColorSwatches
                value={textData.fill}
                onUpdate={onUpdate}
                textRule={ruleData}
                colorList={ruleData.textColor.value}
                viewId={viewId}
              ></ColorSwatches>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
