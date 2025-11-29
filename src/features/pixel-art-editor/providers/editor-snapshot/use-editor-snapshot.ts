import { useCallback, useEffect, useMemo, useReducer } from "react";

import { useAdapters } from "../../../../shared/adapters/core/app";
import { useMutationReadFromBlob } from "../../../../shared/adapters/export/app";
import { ClientStorageKeys } from "../../../../shared/adapters/storage/domain";
import { DomainError, DomainErrorType } from "../../../error-handling/domain";
import { getUuid } from "../../../string.utils";
import { COLORS } from "../../constants";
import { InitializerService, SeederService } from "../../services";
import { ValidationService } from "../../services/validation";
import {
  IEditorSnapshotService,
  TFrame,
  TPixelArtEditorAction,
  TPixelArtEditorInternalSnapShot,
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
function revertUpdate(
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
    case "set-pixel-art-internal-snapshot": {
      return action.payload.setSnapshot(state);
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
    case "set-frame": {
      const id = action.payload.id;

      if (state.frames.find((frame) => frame.id === id) === undefined)
        return state;

      return {
        ...state,
        _currentFrameId: id,
      };
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

const PIXEL_ART_EDITOR_FILENAME = "pixel-art-editor.json";

export function useEditorSnapshotStateHook(): IEditorSnapshotService {
  const { blobExportAdapter, downloaderAdapter, storageAdapter } =
    useAdapters();
  const readFromBlob = useMutationReadFromBlob();

  const history = useEditorHistoryStateHook();

  const [editorSnapshot, dispatch] = useReducer(
    reduceEditorSnapshot,
    { history, storage: storageAdapter },
    InitializerService.initializeEditorSnapshot,
  );

  useEffect(
    () => dispatch({ type: "set-history", payload: { history } }),
    [history],
  );

  useEffect(
    function saveSnapshotToLocalStorage() {
      storageAdapter.set(
        ClientStorageKeys.PIXEL_ART_EDITOR_SNAPSHOT,
        editorSnapshot,
      );
    },
    [editorSnapshot, storageAdapter],
  );

  const finalEditorSnapshot: TPixelArtEditorSnapShot = useMemo(
    () => ({
      ...editorSnapshot,
      currentFrame:
        editorSnapshot.frames.find(
          (frame) => frame.id === editorSnapshot._currentFrameId,
        ) ?? editorSnapshot.frames[0],
    }),
    [editorSnapshot],
  );

  const downloadSnaphot: IEditorSnapshotService["downloadSnaphot"] =
    useCallback(() => {
      downloaderAdapter.download(
        blobExportAdapter.dumpToBlob(editorSnapshot),
        PIXEL_ART_EDITOR_FILENAME,
      );
    }, [blobExportAdapter, downloaderAdapter, editorSnapshot]);

  const loadSnapshot: IEditorSnapshotService["loadSnapshot"] = useMemo(
    () => ({
      onClick: (blob, args) => {
        readFromBlob.mutate(
          { blob },
          {
            onError: args?.onError,
            onSettled: args?.onSettled,
            onSuccess: (res) => {
              if (res.type === "invalid") {
                args?.onError?.(
                  new DomainError(
                    DomainErrorType.BAD_REQUEST,
                    res.reason,
                    "[EditorSnapshot.loadSnapshot] Couldn't read from blob",
                  ),
                );
                return;
              }

              const { value } = res;
              if (!ValidationService.isPixelArtEditorStorableSnapshot(value)) {
                args?.onError?.(
                  new DomainError(
                    DomainErrorType.BAD_REQUEST,
                    "Invalid file structure",
                    "[EditorSnapshot.loadSnapshot] Blob read, but structure is invalid",
                  ),
                );
                return;
              }

              history.reset();
              dispatch({
                type: "set-pixel-art-internal-snapshot",
                payload: {
                  setSnapshot: (state) => ({
                    ...state,
                    ...value,
                    history,
                  }),
                },
              });
            },
          },
        );
      },
      isPending: readFromBlob.isPending,
    }),
    [history, readFromBlob],
  );

  const reset: IEditorSnapshotService["reset"] = useCallback(() => {
    history.reset();

    dispatch({
      type: "set-pixel-art-internal-snapshot",
      payload: {
        setSnapshot: () =>
          InitializerService.resetEditorSnapshot({
            history,
            storage: storageAdapter,
          }),
      },
    });
  }, [history, storageAdapter]);

  return useMemo(
    () => ({
      dispatch,
      downloadSnaphot,
      editorSnapshot: finalEditorSnapshot,
      loadSnapshot,
      reset,
    }),
    [finalEditorSnapshot, dispatch, downloadSnaphot, loadSnapshot, reset],
  );
}
