import { act } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  MockAdapters,
  renderHookWithProviders,
} from "@/shared/test";
import { TEditorOptionName, TPixelArtEditorHistory } from "../../../types";
import { useEditorSnapshotStateHook } from "./use-editor-snapshot";

const mockAdapter: MockAdapters = {
  blobExportAdapter: {},
  downloaderAdapter: {},
  storageAdapter: {
    get: () => null,
    set: () => {},
  },
};

describe("useEditorSnapshotStateHook [Simple State Updates]", () => {
  it("should update currentColorPrimary", () => {
    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      {
        adapters: mockAdapter,
      },
    );

    act(() => {
      result.current.dispatch({
        type: "current-color-primary",
        payload: { color: "custom-test-value" },
      });
    });
    expect(result.current.editorSnapshot.currentColorPrimary).toBe(
      "custom-test-value",
    );
  });

  it("should update currentColorSecondary", () => {
    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      {
        adapters: mockAdapter,
      },
    );

    act(() => {
      result.current.dispatch({
        type: "current-color-secondary",
        payload: { color: "custom-test-value" },
      });
    });
    expect(result.current.editorSnapshot.currentColorSecondary).toBe(
      "custom-test-value",
    );
  });

  it("should update fps", () => {
    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      {
        adapters: mockAdapter,
      },
    );

    act(() => {
      result.current.dispatch({ type: "fps", payload: { fps: 9999 } });
    });
    expect(result.current.editorSnapshot.fps).toBe(9999);
  });

  it("should update showGrid", () => {
    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      {
        adapters: mockAdapter,
      },
    );

    act(() => {
      result.current.dispatch({
        type: "show-grid",
        payload: { showGrid: false },
      });
    });
    expect(result.current.editorSnapshot.showGrid).toBe(false);

    act(() => {
      result.current.dispatch({
        type: "show-grid",
        payload: { showGrid: true },
      });
    });
    expect(result.current.editorSnapshot.showGrid).toBe(true);
  });

  it("should update selectedOption", () => {
    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      {
        adapters: mockAdapter,
      },
    );

    act(() => {
      result.current.dispatch({
        type: "current-option",
        payload: { currentOption: TEditorOptionName.BUCKET },
      });
    });
    expect(result.current.editorSnapshot.selectedOption).toBe(
      TEditorOptionName.BUCKET,
    );

    act(() => {
      result.current.dispatch({
        type: "current-option",
        payload: { currentOption: TEditorOptionName.COLOR_PICKER },
      });
    });
    expect(result.current.editorSnapshot.selectedOption).toBe(
      TEditorOptionName.COLOR_PICKER,
    );
  });

  it("should update history", () => {
    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      {
        adapters: mockAdapter,
      },
    );

    act(() => {
      result.current.dispatch({
        type: "set-history",
        payload: { history: "history" as unknown as TPixelArtEditorHistory },
      });
    });
    expect(result.current.editorSnapshot.history).toBe("history");
  });

  describe("should update _currentFrameId", () => {
    it("should update with valid id", () => {
      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        {
          adapters: mockAdapter,
        },
      );

      act(() => {
        result.current.dispatch({
          type: "create-frame",
          payload: { order: 0 },
        });
      });

      act(() => {
        result.current.dispatch({
          type: "set-frame",
          payload: { id: result.current.editorSnapshot.frames[1].id },
        });
      });
      expect(result.current.editorSnapshot._currentFrameId).toBe(
        result.current.editorSnapshot.frames[1].id,
      );

      act(() => {
        result.current.dispatch({
          type: "set-frame",
          payload: { id: result.current.editorSnapshot.frames[0].id },
        });
      });
      expect(result.current.editorSnapshot._currentFrameId).toBe(
        result.current.editorSnapshot.frames[0].id,
      );
    });

    it("shouldn't update with invalid id", () => {
      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        {
          adapters: mockAdapter,
        },
      );

      expect(result.current.editorSnapshot._currentFrameId).toBe(
        result.current.editorSnapshot.frames[0].id,
      );

      act(() => {
        result.current.dispatch({
          type: "set-frame",
          payload: { id: "unkown id" },
        });
      });
      expect(result.current.editorSnapshot._currentFrameId).toBe(
        result.current.editorSnapshot.frames[0].id,
      );
    });
  });

  it("should dispatch set-pixel-art-internal-snapshot", () => {
    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      {
        adapters: mockAdapter,
      },
    );

    act(() => {
      result.current.dispatch({
        type: "set-pixel-art-internal-snapshot",
        payload: {
          setSnapshot: (snapshot) => ({
            ...snapshot,
            fps: 9876,
            currentColorPrimary: "red",
          }),
        },
      });
    });

    expect(result.current.editorSnapshot.fps).toEqual(9876);
    expect(result.current.editorSnapshot.currentColorPrimary).toEqual("red");
  });
});
