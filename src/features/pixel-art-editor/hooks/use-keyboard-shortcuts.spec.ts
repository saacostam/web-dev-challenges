import { act, renderHook } from "@testing-library/react";
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useEditorSnapshot } from "../providers";
import { TEditorOptionName, TFrame } from "../types";
import { useKeyboardShortcuts } from "./use-keyboard-shortcuts";

type EditorSnapshot = {
  currentFrame: TFrame;
  frames: TFrame[];
  showGrid: boolean;
};

type DispatchAction = {
  type: string;
  payload?: unknown;
};

vi.mock("../providers", () => ({
  useEditorSnapshot: vi.fn(),
}));

describe("useKeyboardShortcuts", () => {
  let dispatch: Mock;
  let editorSnapshot: EditorSnapshot;

  beforeEach(() => {
    const frame1 = { id: "frame1" } as TFrame;
    const frame2 = { id: "frame2" } as TFrame;
    const frame3 = { id: "frame3" } as TFrame;

    dispatch = vi.fn();
    editorSnapshot = {
      currentFrame: frame1,
      frames: [frame1, frame2, frame3],
      showGrid: false,
    };

    (useEditorSnapshot as Mock).mockReturnValue({ dispatch, editorSnapshot });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should dispatch the correct action on key press", () => {
    renderHook(() => useKeyboardShortcuts());

    const keyEvents: {
      key: string;
      metaKey?: boolean;
      expected: DispatchAction;
    }[] = [
      {
        key: "b",
        expected: {
          type: "current-option",
          payload: { currentOption: TEditorOptionName.BUCKET },
        },
      },
      {
        key: "p",
        expected: {
          type: "current-option",
          payload: { currentOption: TEditorOptionName.PENCIL },
        },
      },
      {
        key: "e",
        expected: {
          type: "current-option",
          payload: { currentOption: TEditorOptionName.ERASER },
        },
      },
      {
        key: "c",
        expected: {
          type: "current-option",
          payload: { currentOption: TEditorOptionName.COLOR_PICKER },
        },
      },
      {
        key: "g",
        expected: {
          type: "show-grid",
          payload: { showGrid: !editorSnapshot.showGrid },
        },
      },
      { key: "z", metaKey: true, expected: { type: "undo" } },
      { key: "Z", metaKey: true, expected: { type: "redo" } },
      { key: "y", metaKey: true, expected: { type: "redo" } },
    ];

    keyEvents.forEach(({ key, metaKey, expected }) => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key, metaKey }));
      });
      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });

  it("should handle ArrowUp", () => {
    renderHook(() => useKeyboardShortcuts());
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "set-frame",
      payload: { id: "frame3" },
    });
  });

  it("should handle ArrowDown", () => {
    renderHook(() => useKeyboardShortcuts());
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "set-frame",
      payload: { id: "frame2" },
    });
  });

  it("should handle ArrowLeft", () => {
    renderHook(() => useKeyboardShortcuts());
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "set-frame",
      payload: { id: "frame3" },
    });
  });

  it("should handle ArrowRight", () => {
    renderHook(() => useKeyboardShortcuts());
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "set-frame",
      payload: { id: "frame2" },
    });
  });
});
