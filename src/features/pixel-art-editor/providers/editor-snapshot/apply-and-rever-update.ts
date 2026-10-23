import { getUuid } from "@/shared/string.utils";
import { TFrame, TPixelArtEditorInternalSnapShot, TUpdate } from "../../types";

/**
 * Applies a single update to the given state. That is, it mutates the state forward.
 */
export function applyUpdate(
  update: TUpdate,
  state: TPixelArtEditorInternalSnapShot,
): TPixelArtEditorInternalSnapShot {
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
        const completeNewFrame: TFrame = {
          ...mutation.payload.newFrame,
          id: getUuid(),
        };

        const frames = [
          ...state.frames.slice(0, mutation.payload.order),
          completeNewFrame,
          ...state.frames.slice(mutation.payload.order),
        ];

        return {
          ...state,
          frames,
          _currentFrameId: completeNewFrame.id,
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
          _currentFrameId: frames[prevIndex].id,
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
export function revertUpdate(
  update: TUpdate,
  state: TPixelArtEditorInternalSnapShot,
): TPixelArtEditorInternalSnapShot {
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
          _currentFrameId: frames[prevIndex].id,
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
          _currentFrameId: mutation.payload.oldFrame.id,
        };
      }
    }
  }

  return {
    ...state,
  };
}
