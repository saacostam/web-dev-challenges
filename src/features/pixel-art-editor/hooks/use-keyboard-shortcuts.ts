import { useCallback, useEffect } from "react";

import { useEditorSnapshot } from "../providers";
import { TEditorOptionName } from "../types";

export function useKeyboardShortcuts() {
  const { dispatch, editorSnapshot } = useEditorSnapshot();

  const goToBackFrame = useCallback(() => {
    const newIndex =
      (editorSnapshot.frames.findIndex(
        (frame) => frame === editorSnapshot.currentFrame,
      ) -
        1 +
        editorSnapshot.frames.length) %
      editorSnapshot.frames.length;

    const newFocusedFrame = editorSnapshot.frames.at(newIndex);
    if (!newFocusedFrame) return;

    dispatch({ type: "set-frame", payload: { id: newFocusedFrame.id } });
  }, [dispatch, editorSnapshot.currentFrame, editorSnapshot.frames]);

  const goToNextFrame = useCallback(() => {
    const newIndex =
      (editorSnapshot.frames.findIndex(
        (frame) => frame === editorSnapshot.currentFrame,
      ) +
        1) %
      editorSnapshot.frames.length;

    const newFocusedFrame = editorSnapshot.frames.at(newIndex);
    if (!newFocusedFrame) return;

    dispatch({ type: "set-frame", payload: { id: newFocusedFrame.id } });
  }, [dispatch, editorSnapshot.currentFrame, editorSnapshot.frames]);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "b":
          dispatch({
            type: "current-option",
            payload: {
              currentOption: TEditorOptionName.BUCKET,
            },
          });
          break;
        case "p":
          dispatch({
            type: "current-option",
            payload: {
              currentOption: TEditorOptionName.PENCIL,
            },
          });
          break;
        case "e":
          dispatch({
            type: "current-option",
            payload: {
              currentOption: TEditorOptionName.ERASER,
            },
          });
          break;
        case "c":
          dispatch({
            type: "current-option",
            payload: {
              currentOption: TEditorOptionName.COLOR_PICKER,
            },
          });
          break;
        case "g":
          dispatch({
            type: "show-grid",
            payload: {
              showGrid: !editorSnapshot.showGrid,
            },
          });
          break;
        case "z":
          if (e.metaKey) {
            dispatch({ type: "undo" });
          }
          break;
        case "Z":
          if (e.metaKey) {
            dispatch({ type: "redo" });
          }
          break;
        case "y":
          if (e.metaKey) {
            dispatch({ type: "redo" });
          }
          break;
        case "ArrowUp": {
          goToBackFrame();
          break;
        }
        case "ArrowLeft": {
          goToBackFrame();
          break;
        }
        case "ArrowDown": {
          goToNextFrame();
          break;
        }
        case "ArrowRight": {
          goToNextFrame();
          break;
        }
      }
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [dispatch, editorSnapshot.showGrid, goToBackFrame, goToNextFrame]);
}
