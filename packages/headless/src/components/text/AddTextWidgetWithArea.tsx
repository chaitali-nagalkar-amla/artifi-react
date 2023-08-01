import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWidget, widgetConstants } from "@chaitali-nagalkar-amla/editor";
export function AddTextWidgetWithArea() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const addText = document.getElementById("artifi-add-text-widget");
  const viewCode = addText?.getAttribute("data-view-code") ?? "";

  return (
    <>
      {addText && (
        <div>
          <textarea
            className="resize-none h-10 w-full py-[7px] px-[5px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="message"
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button
            onClick={(e) => {
              dispatch(
                addWidget({
                  type: widgetConstants.TEXTBOX,
                  textWidgetData: { text: text },
                })
              );
            }}
          >
            Add Text
          </button>
        </div>
      )}
    </>
  );
}
