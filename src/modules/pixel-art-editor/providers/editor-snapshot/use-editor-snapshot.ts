import { useEffect, useMemo, useReducer } from "react";

import { COLORS } from "../../constants";
import { InitializerService, SeederService } from "../../services";
import {
  TPixelArtEditorAction,
  TPixelArtEditorSnapShot,
  TUpdate,
} from "../../types";
import { FrameUtils } from "../../utils";
import { useEditorHistoryStateHook } from "./use-editor-history";

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
          mutation.payload.frame.canvas[mutation.payload.position.y][
            mutation.payload.position.x
          ];
        pixel.color = mutation.payload.toColor;
        break;
      }
      case "create-frame": {
        const frames = [
          ...state.frames.slice(0, mutation.payload.order),
          mutation.payload.newFrame,
          ...state.frames.slice(mutation.payload.order),
        ];

        return {
          ...state,
          frames,
          currentFrame: mutation.payload.newFrame,
        };
      }
      case "delete-frame": {
        const frames = [
          ...state.frames.slice(0, mutation.payload.order),
          ...state.frames.slice(mutation.payload.order + 1),
        ];

        const prevIndex = Math.max(
          0,
          Math.min(mutation.payload.order - 1, frames.length - 1),
        );

        return {
          ...state,
          frames,
          currentFrame: frames[prevIndex],
        };
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
          mutation.payload.frame.canvas[mutation.payload.position.y][
            mutation.payload.position.x
          ];
        pixel.color = mutation.payload.fromColor;
        break;
      }
      case "create-frame": {
        const frames = [
          ...state.frames.slice(0, mutation.payload.order),
          ...state.frames.slice(mutation.payload.order + 1),
        ];

        const prevIndex = Math.max(
          0,
          Math.min(mutation.payload.order - 1, frames.length - 1),
        );

        return {
          ...state,
          frames,
          currentFrame: frames[prevIndex],
        };
      }
      case "delete-frame": {
        const frames = [
          ...state.frames.slice(0, mutation.payload.order),
          mutation.payload.oldFrame,
          ...state.frames.slice(mutation.payload.order),
        ];

        return {
          ...state,
          frames,
          currentFrame: mutation.payload.oldFrame,
        };
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
    case "create-frame": {
      const newFrame = SeederService.seedFrame({
        height: state.currentFrame.canvas.length,
        width: state.currentFrame.canvas[0]?.length || 0,
        defaultColor: COLORS.transparent,
      });

      return reduceEditorSnapshot(state, {
        type: "commit-update",
        payload: {
          update: {
            mutations: [
              {
                type: "create-frame",
                payload: {
                  order: action.payload.order,
                  newFrame: newFrame,
                },
              },
            ],
          },
        },
      });
    }
    case "delete-frame": {
      if (state.frames.length <= 1) return state;
      if (
        !(
          0 <= action.payload.order &&
          action.payload.order < state.frames.length
        )
      )
        return state;

      return reduceEditorSnapshot(state, {
        type: "commit-update",
        payload: {
          update: {
            mutations: [
              {
                type: "delete-frame",
                payload: {
                  order: action.payload.order,
                  oldFrame: state.frames[action.payload.order],
                },
              },
            ],
          },
        },
      });
    }
    case "set-frame": {
      if (
        !(
          0 <= action.payload.order &&
          action.payload.order < state.frames.length
        )
      )
        return state;

      return {
        ...state,
        currentFrame: state.frames[action.payload.order],
      };
    }
    case "duplicate-frame": {
      if (
        !(
          0 <= action.payload.order &&
          action.payload.order < state.frames.length
        )
      )
        return state;

      const frame = state.frames[action.payload.order];
      const dupped = FrameUtils.deepCopyFrame(frame);

      return reduceEditorSnapshot(state, {
        type: "commit-update",
        payload: {
          update: {
            mutations: [
              {
                type: "create-frame",
                payload: {
                  order: action.payload.order + 1,
                  newFrame: dupped,
                },
              },
            ],
          },
        },
      });
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
