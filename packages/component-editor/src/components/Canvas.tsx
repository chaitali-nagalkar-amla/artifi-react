import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import {
  changeView,
  deleteWidgetById,
  widgetSelected,
  widgetUpdated,
} from "../slice/editorSlice";
import { useDispatch } from "react-redux";
import { CANVAS, WIDGET_BORDER_COLOR } from "../constants/editorConstants";
import { CanvasEvents } from "../type/editorTypes";
import { extendImageWidget } from "../fabricExtension/fabricExtension";

interface CanvasProps {
  canvasId: string;
  width: string | number;
  height: string | number;
  canvasTop: string | number;
  canvasLeft: string | number;
  canvasJson: string;
  viewId: number;
}

const Canvas: React.FC<CanvasProps> = ({
  canvasId,
  viewId,
  width,
  height,
  canvasLeft,
  canvasTop,
  canvasJson,
}) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let win: any = window;
    if (!win[CANVAS]) {
      win[CANVAS] = {};
    }

    extendImageWidget();
    if (!win[CANVAS][canvasId]) {
      win[CANVAS][canvasId] = new fabric.Canvas(canvasRef.current);
      if (canvasJson) {
        win[CANVAS][canvasId].loadFromJSON(canvasJson, () => {
          if (win[CANVAS][canvasId]) {
            initializeCanvasEvents(win[CANVAS][canvasId]);
            win[CANVAS][canvasId].renderAll();
          }
        });
      }
    }
    return () => {
      delete win[CANVAS];
    };
  }, []);

  function initializeCanvasEvents(editor: any) {
    editor.off(CanvasEvents.WIDGET_SELECTION_CREATED);
    editor.on(CanvasEvents.WIDGET_SELECTION_CREATED, widgetSelectedOnCanvasHnd);
    editor.off(CanvasEvents.WIDGET_SELECTION_UPDATED);
    editor.on(CanvasEvents.WIDGET_SELECTION_UPDATED, widgetSelectedOnCanvasHnd);
    editor.off(CanvasEvents.WIDGET_SELECTION_REMOVED);
    editor.on(CanvasEvents.WIDGET_SELECTION_REMOVED, widgetSelectionRemoved);
    editor.off(CanvasEvents.WIDGET_MODIFIED);
    editor.on(CanvasEvents.WIDGET_MODIFIED, widgetUpdatedHnd);

    editor.off(CanvasEvents.ON_CANVAS_RENDERED);
    editor.on(CanvasEvents.ON_CANVAS_RENDERED, function (e: any) {
      canvasRenderedHnd(e, editor);
    });

    document.addEventListener("keydown", function (e: any) {
      deleteWidgetHnd(e, editor);
    });
  }
  /*method to delete widget from canvas when delete button clicked*/
  function deleteWidgetHnd(e: any, editor: any) {
    let activeObjectData = editor.getActiveObject();
    if (e.key === "Delete" && activeObjectData && activeObjectData.id) {
      dispatch(
        deleteWidgetById({
          widgetId: activeObjectData.id,
          type: activeObjectData.type,
        })
      );
    }
  }

  /*method to send updated data to store into editor store*/
  function widgetUpdatedHnd(eventData: any) {
    if (eventData.target) {
      let activeWidget = eventData.target;
      let widgetData = activeWidget.toJSON(["id"]);
      dispatch(
        widgetUpdated({
          widgetData: widgetData,
        })
      );
    }
  }
  /*method to apply WidgetBorder to widget*/
  function canvasRenderedHnd(e: any, editor: any) {
    editor.contextContainer.strokeStyle = WIDGET_BORDER_COLOR;
    editor.forEachObject(function (obj: any) {
      if (obj && obj.WidgetBorder) {
        let bound = obj.getBoundingRect();

        editor.contextContainer.strokeRect(
          bound.left + 0.5,
          bound.top + 0.5,
          bound.width,
          bound.height
        );
      }
    });
  }

  function widgetSelectedOnCanvasHnd(eventData: any) {
    dispatch(
      widgetSelected({
        selectedWidgetId: eventData.selected[0].id,
      })
    );
  }

  function widgetSelectionRemoved(eventData: any) {
    dispatch(widgetSelected({ widgetData: null }));
  }

  return (
    <div>
      <div
        className="canvas-container"
        style={{
          width: width + "px",
          height: height + "px",
          left: canvasLeft + "px",
          top: canvasTop + "px",
          position: "absolute",
        }}
        onClick={(e) => {
          dispatch(changeView({ viewId: viewId }));
        }}
      >
        <canvas
          key={canvasId}
          ref={canvasRef}
          width={width}
          height={height}
          id={canvasId}
        />
      </div>
    </div>
  );
};

export default Canvas;
