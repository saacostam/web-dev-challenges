import { describe, expect, it, vi } from "vitest";

import { COLORS } from "../../../constants";
import {
  TEditorOptionName,
  TPixelArtEditorHistory,
  TPixelArtEditorSnapShot,
} from "../../../types";
import { reduceEditorSnapshot } from "./reduce-editor-snapshot";

// Helpers to build minimal state
function createState(overrides = {}): TPixelArtEditorSnapShot {
  return {
    currentColorPrimary: COLORS.black,
    currentColorSecondary: COLORS.white,
    fps: 12,
    showGrid: true,
    selectedOption: "pencil",
    history: { add: vi.fn(), undo: vi.fn(), redo: vi.fn() },
    _currentFrameId: "frame1",
    frames: [{ id: "frame1" }, { id: "frame2" }],
    ...overrides,
  } as unknown as TPixelArtEditorSnapShot;
}

describe("reduceEditorSnapshot (non-update-based actions)", () => {
  it("should update currentColorPrimary", () => {
    const state = createState();
    const newState = reduceEditorSnapshot(state, {
      type: "current-color-primary",
      payload: { color: COLORS.red },
    });

    expect(newState.currentColorPrimary).toBe(COLORS.red);
  });

  it("should update currentColorSecondary", () => {
    const state = createState();
    const newState = reduceEditorSnapshot(state, {
      type: "current-color-secondary",
      payload: { color: COLORS.blue },
    });

    expect(newState.currentColorSecondary).toBe(COLORS.blue);
  });

  it("should update fps", () => {
    const state = createState();
    const newState = reduceEditorSnapshot(state, {
      type: "fps",
      payload: { fps: 20 },
    });

    expect(newState.fps).toBe(20);
  });

  it("should update showGrid", () => {
    const state = createState();
    const newState = reduceEditorSnapshot(state, {
      type: "show-grid",
      payload: { showGrid: false },
    });

    expect(newState.showGrid).toBe(false);
  });

  it("should update selectedOption", () => {
    const state = createState();
    const newState = reduceEditorSnapshot(state, {
      type: "current-option",
      payload: { currentOption: TEditorOptionName.ERASER },
    });

    expect(newState.selectedOption).toBe(TEditorOptionName.ERASER);
  });

  it("should set history", () => {
    const customHistory = { add: () => {}, undo: () => {}, redo: () => {} };
    const state = createState();

    const newState = reduceEditorSnapshot(state, {
      type: "set-history",
      payload: { history: customHistory as unknown as TPixelArtEditorHistory },
    });

    expect(newState.history).toBe(customHistory);
  });

  it("should execute set-pixel-art-internal-snapshot", () => {
    const state = createState({ fps: 10 });

    const newState = reduceEditorSnapshot(state, {
      type: "set-pixel-art-internal-snapshot",
      payload: {
        setSnapshot: (prev) => ({
          ...prev,
          fps: 99,
        }),
      },
    });

    expect(newState.fps).toBe(99);
  });

  describe("set-frame", () => {
    it("should update _currentFrameId when the frame exists", () => {
      const state = createState({ _currentFrameId: "frame1" });

      const newState = reduceEditorSnapshot(state, {
        type: "set-frame",
        payload: { id: "frame2" },
      });

      expect(newState._currentFrameId).toBe("frame2");
    });

    it("should NOT change _currentFrameId if frame does not exist", () => {
      const state = createState({ _currentFrameId: "frame1" });

      const newState = reduceEditorSnapshot(state, {
        type: "set-frame",
        payload: { id: "nonexistent" },
      });

      expect(newState._currentFrameId).toBe("frame1");
    });
  });
});
