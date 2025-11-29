import { describe, expect, it } from "vitest";

import {
  TEditorOptionName,
  TFrame,
  TPixelArtEditorHistory,
  TPixelArtEditorInternalSnapShot,
  TUpdate,
} from "../../types";
import { applyUpdate, revertUpdate } from "./apply-and-rever-update";

function makeFrame(id: string, color = "red"): TFrame {
  return {
    id,
    canvas: [[{ color }]],
  };
}

function makeState(
  frames: TFrame[] = [makeFrame("f1")],
): TPixelArtEditorInternalSnapShot {
  return {
    frames,
    _currentFrameId: frames[0].id,
    currentColorPrimary: "",
    currentColorSecondary: "",
    fps: 12,
    selectedOption: TEditorOptionName.BUCKET,
    showGrid: true,
    history: {} as unknown as TPixelArtEditorHistory,
  };
}

describe("applyUpdate / revertUpdate (back and forth)", () => {
  it("switch-color: apply then revert returns state to original", () => {
    const frame = makeFrame("f1", "red");
    const initial = makeState([frame]);

    const update: TUpdate = {
      mutations: [
        {
          type: "switch-color",
          payload: {
            frame,
            position: { x: 0, y: 0 },
            fromColor: "red",
            toColor: "blue",
          },
        },
      ],
    };

    const applied = applyUpdate(update, initial);
    expect(applied.frames[0].canvas[0][0].color).toBe("blue");

    const reverted = revertUpdate(update, applied);
    expect(reverted.frames[0].canvas[0][0].color).toBe("red");
  });

  it("create-frame: apply then revert returns state to original", () => {
    const f1 = makeFrame("a");
    const f2 = makeFrame("b");
    const initial = makeState([f1, f2]);

    const update: TUpdate = {
      mutations: [
        {
          type: "create-frame",
          payload: {
            order: 1,
            newFrame: {
              canvas: [[{ color: "yellow" }]],
            },
          },
        },
      ],
    };

    const applied = applyUpdate(update, initial);

    expect(applied.frames.length).toBe(3);

    const reverted = revertUpdate(update, applied);

    expect(reverted.frames.length).toBe(2);
    expect(reverted.frames.map((f) => f.id)).toEqual(["a", "b"]);
    expect(reverted._currentFrameId).toBe("a");
  });

  it("delete-frame: apply then revert returns state to original", () => {
    const f1 = makeFrame("f1");
    const f2 = makeFrame("f2");
    const f3 = makeFrame("f3");
    const initial = makeState([f1, f2, f3]);

    const update: TUpdate = {
      mutations: [
        {
          type: "delete-frame",
          payload: {
            order: 1,
            oldFrame: f2,
          },
        },
      ],
    };

    const applied = applyUpdate(update, initial);

    expect(applied.frames.map((f) => f.id)).toEqual(["f1", "f3"]);

    const reverted = revertUpdate(update, applied);

    expect(reverted.frames.map((f) => f.id)).toEqual(["f1", "f2", "f3"]);
    expect(reverted._currentFrameId).toBe("f2");
  });

  it("apply then revert works with multiple mutations in order", () => {
    const f1 = makeFrame("f1", "red");
    const f2 = makeFrame("f2", "green");
    const initial = makeState([f1, f2]);

    const update: TUpdate = {
      mutations: [
        {
          type: "switch-color",
          payload: {
            frame: f1,
            position: { x: 0, y: 0 },
            fromColor: "red",
            toColor: "blue",
          },
        },
        {
          type: "delete-frame",
          payload: {
            order: 1,
            oldFrame: f2,
          },
        },
      ],
    };

    const applied = applyUpdate(update, initial);

    expect(applied.frames.length).toBe(1);
    expect(applied.frames[0].canvas[0][0].color).toBe("blue");

    const reverted = revertUpdate(update, applied);

    expect(reverted.frames.length).toBe(2);
    expect(reverted.frames.map((f) => f.id)).toEqual(["f1", "f2"]);
    expect(reverted.frames[0].canvas[0][0].color).toBe("red");
  });

  it("empty update: revert returns original", () => {
    const initial = makeState();
    const update: TUpdate = { mutations: [] };

    const applied = applyUpdate(update, initial);
    const reverted = revertUpdate(update, applied);

    expect(reverted).toEqual(initial);
  });
});
