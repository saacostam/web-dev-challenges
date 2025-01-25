import { useMemo, useReducer } from "react";
import { TPixelArtEditorAction, TPixelArtEditorSnapShot } from "../../types";
import { useEditorHistoryStateHook } from "./use-editor-history";
import { InitializerService } from "../../services";

/**
 * Creates a state hook to manage state of a pixel art editor.
 * It provides the current state and a dispatcher function to update it.
 */
export function reduceEditorSnapshot(
  state: TPixelArtEditorSnapShot,
  action: TPixelArtEditorAction,
): TPixelArtEditorSnapShot {
  switch (action.type) {
    case "current-color-primary": {
      return {
        ...state,
        currentColorPrimary: action.payload.color,
      };
    }
    case "current-color-secondary": {
      return {
        ...state,
        currentColorSecondary: action.payload.color,
      };
    }
    case "fps": {
      return {
        ...state,
        fps: action.payload.fps,
      };
    }
    case "show-grid": {
      return {
        ...state,
        showGrid: action.payload.showGrid,
      };
    }
    case "current-option": {
      return {
        ...state,
        selectedOption: action.payload.currentOption,
      };
    }
  }
}

export function useEditorSnapshotStateHook() {
  const history = useEditorHistoryStateHook();

  const [editorSnapshot, dispatch] = useReducer(
    reduceEditorSnapshot,
    { history },
    InitializerService.initializeEditorSnapshot,
  );

  return useMemo(
    () => ({
      editorSnapshot,
      dispatch,
    }),
    [editorSnapshot, dispatch],
  );
}
