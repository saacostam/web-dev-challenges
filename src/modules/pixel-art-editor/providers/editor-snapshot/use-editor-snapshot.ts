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
    case "commit-update": {
      const update = state.history.add(action.payload.update);

      for (let i = 0; i < update.mutations.length; i++) {
        const mutation = update.mutations[i];

        switch (mutation.type) {
          case "switch-color": {
            const pixel =
              state.frames[0].canvas[mutation.payload.position.y][
                mutation.payload.position.x
              ];
            pixel.color = mutation.payload.toColor;
            break;
          }
          default:
            break;
        }
      }

      return {
        ...state,
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
