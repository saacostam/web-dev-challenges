import { describe, expect, it } from "vitest";

import { TEditorOptionName, TPixelArtEditorStorableSnapShot } from "../types";
import { ValidationService } from "./validation";

describe("isPixelArtEditorStorableSnapshot", () => {
  it("should return true for a valid TPizelArtEditorStorableSnapShot", () => {
    const validSnapshot: TPixelArtEditorStorableSnapShot = {
      currentColorPrimary: "#ff0000",
      currentColorSecondary: "#00ff00",
      fps: 30,
      frames: [
        {
          id: "frame1",
          canvas: [
            [{ color: "#ff0000" }, { color: "#00ff00" }],
            [{ color: "#0000ff" }, { color: "#ffff00" }],
          ],
        },
      ],
      _currentFrameId: "frame1",
      selectedOption: TEditorOptionName.PENCIL,
      showGrid: true,
    };

    expect(
      ValidationService.isPixelArtEditorStorableSnapshot(validSnapshot),
    ).toBe(true);
  });

  it("should return false if currentColorPrimary is not a string", () => {
    const invalidSnapshot = {
      currentColorPrimary: 123,
      currentColorSecondary: "#00ff00",
      fps: 30,
      frames: [],
      _currentFrameId: "frame1",
      selectedOption: TEditorOptionName.PENCIL,
      showGrid: true,
    };

    expect(
      ValidationService.isPixelArtEditorStorableSnapshot(invalidSnapshot),
    ).toBe(false);
  });

  it("should return false if frames is not an array", () => {
    const invalidSnapshot = {
      currentColorPrimary: "#ff0000",
      currentColorSecondary: "#00ff00",
      fps: 30,
      frames: {},
      _currentFrameId: "frame1",
      selectedOption: TEditorOptionName.PENCIL,
      showGrid: true,
    };

    expect(
      ValidationService.isPixelArtEditorStorableSnapshot(invalidSnapshot),
    ).toBe(false);
  });

  it("should return false if a frame has an invalid canvas", () => {
    const invalidSnapshot: TPixelArtEditorStorableSnapShot = {
      currentColorPrimary: "#ff0000",
      currentColorSecondary: "#00ff00",
      fps: 30,
      frames: [
        {
          id: "frame1",
          canvas: [
            [{ color: "#ff0000" }, { color: "#00ff00" }],
            // @ts-expect-error: invalid data for test
            [{ color: "#0000ff" }, { color: 12345 }], // Invalid pixel color
          ],
        },
      ],
      _currentFrameId: "frame1",
      selectedOption: TEditorOptionName.PENCIL,
      showGrid: true,
    };

    expect(
      ValidationService.isPixelArtEditorStorableSnapshot(invalidSnapshot),
    ).toBe(false);
  });

  it("should return false if selectedOption is invalid", () => {
    const invalidSnapshot = {
      currentColorPrimary: "#ff0000",
      currentColorSecondary: "#00ff00",
      fps: 30,
      frames: [],
      _currentFrameId: "frame1",
      selectedOption: "invalid-option",
      showGrid: true,
    };

    expect(
      ValidationService.isPixelArtEditorStorableSnapshot(invalidSnapshot),
    ).toBe(false);
  });

  it("should return false if showGrid is not a boolean", () => {
    const invalidSnapshot = {
      currentColorPrimary: "#ff0000",
      currentColorSecondary: "#00ff00",
      fps: 30,
      frames: [],
      _currentFrameId: "frame1",
      selectedOption: TEditorOptionName.PENCIL,
      showGrid: "true", // Invalid type (should be boolean)
    };

    expect(
      ValidationService.isPixelArtEditorStorableSnapshot(invalidSnapshot),
    ).toBe(false);
  });

  it("should return false if payload is not an object", () => {
    const invalidSnapshot = null;

    expect(
      ValidationService.isPixelArtEditorStorableSnapshot(invalidSnapshot),
    ).toBe(false);
  });

  it("should return false if payload is an empty object", () => {
    const invalidSnapshot = {};

    expect(
      ValidationService.isPixelArtEditorStorableSnapshot(invalidSnapshot),
    ).toBe(false);
  });
});
