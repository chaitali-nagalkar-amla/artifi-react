import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import Canvas from "./Canvas";
import {
  getActiveGroupId,
  getActiveViewId,
  getEditorData,
  getProductViewsData,
  useSliceSelector,
} from "../slice/editorSlice";

interface EditorViewProps {
  viewData: any;
  selectedSKU: string;
  editorContainerRef: any;
}

const EditorView: React.FC<EditorViewProps> = ({
  viewData,
  selectedSKU,
  editorContainerRef,
}) => {
  const editorRef: any = useRef(null);
  const activeViewId = useSliceSelector(getActiveViewId);
  const activeGroupId = useSliceSelector(getActiveGroupId);
  const editorData = useSliceSelector(getEditorData);

  const productViewData = useSliceSelector(getProductViewsData);

  useEffect(() => {
    applyScaleFactorToView();
  }, [selectedSKU]);

  /*method to apply apply scaleFactor to product view based on editor area*/
  function applyScaleFactorToView() {
    let editorWrapper = editorContainerRef.current;
    let left = (editorWrapper.offsetWidth - viewData.Width) / 2;
    let top = (editorWrapper.offsetHeight - viewData.Height) / 2;

    const finalSF = getProductViewScaleFactor();

    editorRef.current.style.transform =
      "scale(" + finalSF + ", " + finalSF + ")";
    editorRef.current.style.position = "absolute";
    editorRef.current.style.left = left + "px";
    editorRef.current.style.top = top + "px";
  }
  /*method to get scaleFactor according to  product view and editor area*/
  function getProductViewScaleFactor() {
    let editorWrapper = editorContainerRef.current;

    let wsf = editorWrapper.offsetWidth / viewData.Width;
    let hsf = editorWrapper.offsetHeight / viewData.Height;
    let finalSF = 1;
    if (wsf < hsf) {
      finalSF = wsf;
    } else {
      finalSF = hsf;
    }

    return finalSF;
  }

  /*method to create canvas */
  function createCanvasByView(viewInfo: any) {
    let canvasId = viewInfo.GroupId ? viewInfo.GroupId + "_" : "";

    let viewsCanvas = viewInfo.Views.map(function (view: any, index: any) {
      let viewData: any = editorData[view.Id];
      let productData = productViewData[view.Id];

      return (
        <Canvas
          viewId={view.Id}
          key={canvasId + view.Id + selectedSKU}
          canvasId={canvasId + view.Id}
          width={productData.CanvasWidth}
          height={productData.CanvasHeight}
          canvasTop={productData.CanvasY}
          canvasLeft={productData.CanvasX}
          canvasJson={viewData}
        />
      );
    });

    return viewsCanvas;
  }
  return (
    <div
      style={{
        visibility: viewData.GroupId
          ? viewData.GroupId == activeGroupId
            ? "visible"
            : "hidden"
          : viewData.Views[0].Id == activeViewId
          ? "visible"
          : "hidden",
      }}
      className="designer-image-canvas-wrapper"
      ref={editorRef}
      data-sku={selectedSKU}
    >
      <>
        <div style={{ width: viewData.Width, height: viewData.Height }}>
          <img
            src={viewData.standardImageUrl}
            style={{
              width: viewData.Width,
              height: viewData.Height,
            }}
          />
          {createCanvasByView(viewData)}
        </div>
      </>
    </div>
  );
};

export default EditorView;
