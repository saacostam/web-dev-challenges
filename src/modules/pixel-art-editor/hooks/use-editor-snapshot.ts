import { useMemo, useReducer } from "react";
import { TPixelArtEditorAction, TPixelArtEditorSnapShot } from "../types";
import { useEditorHistory } from "./use-editor-history";
import { getEditorSnapshotFromClientStorage } from "../domain";

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

export function useEditorSnapshot() {
  const history = useEditorHistory();

  const [editorSnapshot, dispatch] = useReducer(
    reduceEditorSnapshot,
    { history },
    getEditorSnapshotFromClientStorage,
  );

  return useMemo(
    () => ({
      editorSnapshot,
      dispatch,
    }),
    [editorSnapshot, dispatch],
  );
}
