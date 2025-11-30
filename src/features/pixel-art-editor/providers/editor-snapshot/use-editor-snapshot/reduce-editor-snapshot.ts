import { COLORS } from "../../../constants";
import { SeederService } from "../../../services";
import {
  TFrame,
  TPixelArtEditorAction,
  TPixelArtEditorInternalSnapShot,
} from "../../../types";
import { FrameUtils } from "../../../utils";
import { applyUpdate, revertUpdate } from "../apply-and-rever-update";

/**
 * Creates a state hook to manage state of a pixel art editor.
 * It provides the current state and a dispatcher function to update it.
 */
export function reduceEditorSnapshot(
  state: TPixelArtEditorInternalSnapShot,
  action: TPixelArtEditorAction,
): TPixelArtEditorInternalSnapShot {
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
    case "set-history": {
      return {
        ...state,
        history: action.payload.history,
      };
    }
    case "set-frame": {
      const id = action.payload.id;

      if (state.frames.find((frame) => frame.id === id) === undefined)
        return state;

      return {
        ...state,
        _currentFrameId: id,
      };
    }
    case "set-pixel-art-internal-snapshot": {
      return action.payload.setSnapshot(state);
    }
    // Actions built on update objects (i.e., history-reversible updates)
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
    case "create-frame": {
      const currentFrame = state.frames.find(
        (frame) => frame.id === state._currentFrameId,
      );

      if (currentFrame === undefined) return state;

      const newFrame = SeederService.seedFrame({
        height: currentFrame.canvas.length,
        width: currentFrame.canvas[0]?.length || 0,
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

      const findPredicate = (frame: TFrame) => frame.id === action.payload.id;
      const frameToDelete = state.frames.find(findPredicate);
      const frameToDeleteIndex = state.frames.findIndex(findPredicate);

      if (frameToDelete === undefined || frameToDeleteIndex === -1)
        return state;

      return reduceEditorSnapshot(state, {
        type: "commit-update",
        payload: {
          update: {
            mutations: [
              {
                type: "delete-frame",
                payload: {
                  order: frameToDeleteIndex,
                  oldFrame: frameToDelete,
                },
              },
            ],
          },
        },
      });
    }
    case "duplicate-frame": {
      const findPredicate = (frame: TFrame) => frame.id === action.payload.id;
      const frame = state.frames.find(findPredicate);
      const frameIndex = state.frames.findIndex(findPredicate);

      if (frame === undefined || frameIndex === -1) return state;

      const dupped = FrameUtils.deepCopyFrame(frame);
      const newFrameOrder = frameIndex + 1;

      const newState = reduceEditorSnapshot(state, {
        type: "commit-update",
        payload: {
          update: {
            mutations: [
              {
                type: "create-frame",
                payload: {
                  order: newFrameOrder,
                  newFrame: dupped,
                },
              },
            ],
          },
        },
      });

      return reduceEditorSnapshot(newState, {
        type: "set-frame",
        payload: {
          id: dupped.id,
        },
      });
    }
  }
}
