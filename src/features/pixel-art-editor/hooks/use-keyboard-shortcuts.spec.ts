import { act, renderHook } from "@testing-library/react";
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useEditorSnapshot } from "../providers";
import { TEditorOptionName } from "../types";
import { useKeyboardShortcuts } from "./use-keyboard-shortcuts";

type EditorSnapshot = {
  currentFrame: string;
  frames: string[];
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
    dispatch = vi.fn();
    editorSnapshot = {
      currentFrame: "frame1",
      frames: ["frame1", "frame2", "frame3"],
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

  it("should navigate frames correctly on arrow key press", () => {
    renderHook(() => useKeyboardShortcuts());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "set-frame",
      payload: { order: 2 },
    });

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "set-frame",
      payload: { order: 1 },
    });

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "set-frame",
      payload: { order: 2 },
    });

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "set-frame",
      payload: { order: 1 },
    });
  });
});
