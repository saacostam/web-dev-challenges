import { useMemo, useReducer } from "react";
import { TPixelArtEditorAction, TPixelArtEditorSnapShot } from "../../types";
import { useEditorHistoryStateHook } from "./use-editor-history";
import { ClientStorageService } from "../../services";

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
  }
}

export function useEditorSnapshotStateHook() {
  const history = useEditorHistoryStateHook();

  const [editorSnapshot, dispatch] = useReducer(
    reduceEditorSnapshot,
    { history },
    ClientStorageService.getEditorSnapshotFromClientStorage,
  );

  return useMemo(
    () => ({
      editorSnapshot,
      dispatch,
    }),
    [editorSnapshot, dispatch],
  );
}
