import React, { useEffect, useRef, useState } from "react";
import "../styles/Editor.css";
import EditorView from "./EditorView";
import { useDispatch } from "react-redux";
import {
  getSelectedSKU,
  getAllViewsData,
  useSliceSelector,
} from "../slice/editorSlice";

export function Editor() {
  const viewsList = useSliceSelector(getAllViewsData);
  const selectedSKU = useSliceSelector(getSelectedSKU);

  const editorContainerRef: any = useRef(null);

  useEffect(() => {}, [selectedSKU]);
  return (
    <>
      <div className="designer-editor-wrapper" ref={editorContainerRef}>
        {viewsList && viewsList && viewsList.length
          ? viewsList.map((view: any, index: any) => (
              <EditorView
                editorContainerRef={editorContainerRef}
                selectedSKU={selectedSKU}
                viewData={view}
                key={view.GroupId || view.Views[0].Id}
              ></EditorView>
            ))
          : ""}
      </div>
    </>
  );
}
