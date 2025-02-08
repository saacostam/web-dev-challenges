import { useEffect, useMemo, useReducer } from "react";
import {
  TPixelArtEditorAction,
  TPixelArtEditorSnapShot,
  TUpdate,
} from "../../types";
import { useEditorHistoryStateHook } from "./use-editor-history";
import { InitializerService } from "../../services";

/**
 * Applies a single update to the given state. That is, it mutates the state forward.
 */
function applyUpdate(
  update: TUpdate,
  state: TPixelArtEditorSnapShot,
): TPixelArtEditorSnapShot {
  for (let i = 0; i < update.mutations.length; i++) {
    const mutation = update.mutations[i];
    switch (mutation.type) {
      case "switch-color": {
        const pixel =
          state.currentFrame.canvas[mutation.payload.position.y][
            mutation.payload.position.x
          ];
        pixel.color = mutation.payload.toColor;
        break;
      }
    }
  }

  return {
    ...state,
  };
}

/**
 * Reverts a single update to the given state. That is, it mutates the state backward.
 */
function revertUpdate(
  update: TUpdate,
  state: TPixelArtEditorSnapShot,
): TPixelArtEditorSnapShot {
  for (let i = 0; i < update.mutations.length; i++) {
    const mutation = update.mutations[i];
    switch (mutation.type) {
      case "switch-color": {
        const pixel =
          state.currentFrame.canvas[mutation.payload.position.y][
            mutation.payload.position.x
          ];
        pixel.color = mutation.payload.fromColor;
        break;
      }
    }
  }

  return {
    ...state,
  };
}

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
      return applyUpdate(update, state);
    }
    case "undo": {
      const update = state.history.undo();
      if (!update) return state;
      return revertUpdate(update, state);
    }
    case "redo": {
      const update = state.history.redo();
      if (!update) return state;
      return applyUpdate(update, state);
    }
    case "set-history": {
      return {
        ...state,
        history: action.payload.history,
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

  useEffect(
    () => dispatch({ type: "set-history", payload: { history } }),
    [history],
  );

  return useMemo(
    () => ({
      editorSnapshot,
      dispatch,
    }),
    [editorSnapshot, dispatch],
  );
}
