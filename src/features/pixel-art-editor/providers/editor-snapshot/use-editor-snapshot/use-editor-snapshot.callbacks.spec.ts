import { act, waitFor } from "@testing-library/react";
import { Mock, describe, expect, it, vi } from "vitest";

import { IBlobExportAdapterPayload } from "../../../../../shared/adapters/export/domain";
import { DomainError } from "../../../../../shared/errors/domain";
import {
  MockAdapters,
  renderHookWithProviders,
} from "../../../../../shared/test";
import { InitializerService } from "../../../services";
import { TPixelArtEditorInternalSnapShot } from "../../../types";
import { useEditorSnapshotStateHook } from "./use-editor-snapshot";

const mockAdapter = (args?: {
  download?: Mock;
  dumpToBlob?: Mock;
  readFromBlob?: Mock;
  removeItem?: Mock;
}): MockAdapters => ({
  blobExportAdapter: {
    dumpToBlob: args?.dumpToBlob,
    readFromBlob: args?.readFromBlob,
  },
  downloaderAdapter: {
    download: args?.download,
  },
  storageAdapter: {
    get: () => null,
    set: () => {},
    removeItem: args?.removeItem,
  },
});

describe("useEditorSnapshotStateHook [Callbacks]", () => {
  it("should downloadSnapshot", () => {
    const download = vi.fn();
    const dumpToBlob = vi.fn();

    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      {
        adapters: mockAdapter({
          download,
          dumpToBlob,
        }),
      },
    );

    dumpToBlob.mockReturnValueOnce("blob");

    act(() => {
      result.current.downloadSnaphot();
    });

    expect(dumpToBlob).toHaveBeenCalledExactlyOnceWith({
      ...result.current.editorSnapshot,
      currentFrame: undefined,
    });
    expect(download).toHaveBeenCalledWith("blob", "pixel-art-editor.json");
  });

  describe("loadSnapshot", () => {
    it("should load from file", async () => {
      const readFromBlob = vi.fn();

      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        {
          adapters: mockAdapter({
            readFromBlob,
          }),
        },
      );

      const loadedSnapshot: TPixelArtEditorInternalSnapShot = {
        ...result.current.editorSnapshot,
        fps: 9999,
        currentColorPrimary: "red",
        currentColorSecondary: "blue",
      };

      const mockResponse: IBlobExportAdapterPayload["ReadFromBlobOut"] = {
        type: "valid",
        value: loadedSnapshot,
      };
      readFromBlob.mockResolvedValue(mockResponse);

      const onError = vi.fn();
      const onSettled = vi.fn();

      const historyReset = vi.spyOn(
        result.current.editorSnapshot.history,
        "reset",
      );

      act(() => {
        result.current.loadSnapshot.onClick("blob" as unknown as Blob, {
          onError,
          onSettled,
        });
      });

      await waitFor(() => {
        expect(readFromBlob).toHaveBeenCalledOnce();
        expect(onSettled).toHaveBeenCalledOnce();
        expect(onError).not.toHaveBeenCalledOnce();
        expect(historyReset).toHaveBeenCalledOnce();
        expect(result.current.editorSnapshot).toStrictEqual(loadedSnapshot);
      });
    });

    it("should handle invalid files", async () => {
      const readFromBlob = vi.fn();

      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        {
          adapters: mockAdapter({
            readFromBlob,
          }),
        },
      );

      const mockResponse: IBlobExportAdapterPayload["ReadFromBlobOut"] = {
        type: "invalid",
        reason: "invalid",
      };
      readFromBlob.mockResolvedValue(mockResponse);

      const onError = vi.fn();
      const onSettled = vi.fn();

      const historyReset = vi.spyOn(
        result.current.editorSnapshot.history,
        "reset",
      );

      act(() => {
        result.current.loadSnapshot.onClick("blob" as unknown as Blob, {
          onError,
          onSettled,
        });
      });

      await waitFor(() => {
        expect(readFromBlob).toHaveBeenCalledOnce();
        expect(onSettled).toHaveBeenCalledOnce();
        expect(onError).toHaveBeenCalledOnce();
        expect(onError.mock.calls[0][0]).toBeInstanceOf(DomainError);
        expect(historyReset).not.toHaveBeenCalled();
      });
    });

    it("should handle invalid formats", async () => {
      const readFromBlob = vi.fn();

      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        {
          adapters: mockAdapter({
            readFromBlob,
          }),
        },
      );

      const mockResponse: IBlobExportAdapterPayload["ReadFromBlobOut"] = {
        type: "valid",
        value: {},
      };
      readFromBlob.mockResolvedValue(mockResponse);

      const onError = vi.fn();
      const onSettled = vi.fn();

      const historyReset = vi.spyOn(
        result.current.editorSnapshot.history,
        "reset",
      );

      act(() => {
        result.current.loadSnapshot.onClick("blob" as unknown as Blob, {
          onError,
          onSettled,
        });
      });

      await waitFor(() => {
        expect(readFromBlob).toHaveBeenCalledOnce();
        expect(onSettled).toHaveBeenCalledOnce();
        expect(onError).toHaveBeenCalledOnce();
        expect(onError.mock.calls[0][0]).toBeInstanceOf(DomainError);
        expect(historyReset).not.toHaveBeenCalled();
      });
    });

    it("should provide isPending", async () => {
      const readFromBlob = vi.fn();

      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        {
          adapters: mockAdapter({
            readFromBlob,
          }),
        },
      );

      readFromBlob.mockImplementationOnce(() => new Promise(() => {}));

      const onError = vi.fn();
      const onSettled = vi.fn();
      const historyReset = vi.spyOn(
        result.current.editorSnapshot.history,
        "reset",
      );

      act(() => {
        result.current.loadSnapshot.onClick("blob" as unknown as Blob, {
          onError,
          onSettled,
        });
      });

      await waitFor(() => {
        expect(result.current.loadSnapshot.isPending).toBe(true);
        expect(readFromBlob).toHaveBeenCalledOnce();
        expect(onSettled).not.toHaveBeenCalledOnce();
        expect(onError).not.toHaveBeenCalledOnce();
        expect(historyReset).not.toHaveBeenCalled();
      });
    });
  });

  it("should reset history and reinitialize the snapshot", () => {
    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      {
        adapters: mockAdapter(),
      },
    );

    const historyResetSpy = vi.spyOn(
      result.current.editorSnapshot.history,
      "reset",
    );
    const resetEditorSnapshotSpy = vi.spyOn(
      InitializerService,
      "resetEditorSnapshot",
    );

    const mockedResetSnapshot = {
      ...result.current.editorSnapshot,
      fps: 123,
      currentColorPrimary: "purple",
    };
    resetEditorSnapshotSpy.mockReturnValue(mockedResetSnapshot);

    act(() => {
      result.current.reset();
    });

    expect(historyResetSpy).toHaveBeenCalledOnce();
    expect(resetEditorSnapshotSpy).toHaveBeenCalledOnce();

    expect(result.current.editorSnapshot).toStrictEqual(mockedResetSnapshot);
  });
});
