import { useCallback, useEffect, useMemo, useReducer } from "react";

import { useAdapters } from "../../../../../shared/adapters/core/app";
import { useMutationReadFromBlob } from "../../../../../shared/adapters/export/app";
import { ClientStorageKeys } from "../../../../../shared/adapters/storage/domain";
import {
  DomainError,
  DomainErrorType,
} from "../../../../../shared/error-handling/domain";
import { InitializerService } from "../../../services";
import { ValidationService } from "../../../services/validation";
import {
  IEditorSnapshotService,
  TPixelArtEditorSnapShot,
} from "../../../types";
import { useEditorHistoryStateHook } from "../use-editor-history";
import { reduceEditorSnapshot } from "./reduce-editor-snapshot";

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
