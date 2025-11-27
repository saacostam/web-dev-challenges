import { describe, it, expect, vi, beforeEach } from "vitest";
import { InitializerService } from "./initializer";
import { COLORS, DEFAULT_DIMENSIONS, DEFAULT_EDITOR_SNAPSHOT } from "../constants";
import { ValidationService } from "./validation";
import { TPixelArtEditorHistory } from "../types";

vi.mock("./validation", () => ({
  ValidationService: {
    isPixelArtEditorStorableSnapshot: vi.fn(),
  },
}));

describe("initializeEditorSnapshot", () => {
  const historyMock = ["frame-1", "frame-2"];

  function createStorageMock(getValue: unknown) {
    return {
      get: vi.fn(() => getValue),
      set: vi.fn(),
      unsafeGet: vi.fn(),
    };
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns stored snapshot when ValidationService says it is valid", () => {
    const storedSnapshot = {
      _currentFrameId: "abc",
      frames: [{ id: "abc", canvas: [] }],
    };

    const storage = createStorageMock(storedSnapshot);

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ValidationService.isPixelArtEditorStorableSnapshot as any).mockReturnValue(true);

    const result = InitializerService.initializeEditorSnapshot({
      history: historyMock as unknown as TPixelArtEditorHistory,
      storage,
    });

    expect(ValidationService.isPixelArtEditorStorableSnapshot).toHaveBeenCalledWith(
      storedSnapshot
    );

    expect(result.frames).toEqual(storedSnapshot.frames);
    expect(result._currentFrameId).toBe("abc");
    expect(result.history).toBe(historyMock);
  });

  it("returns default snapshot with seeded frame when validation fails", () => {
    const storage = createStorageMock(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ValidationService.isPixelArtEditorStorableSnapshot as any).mockReturnValue(false);

    const result = InitializerService.initializeEditorSnapshot({
      history: historyMock as unknown as TPixelArtEditorHistory,
      storage,
    });

    expect(result.history).toBe(historyMock);

    expect(result.frames.length).toBe(1);
    const frame = result.frames[0];

    expect(frame.canvas.length).toBe(DEFAULT_DIMENSIONS.HEIGHT);
    expect(frame.canvas[0].length).toBe(DEFAULT_DIMENSIONS.WIDTH);
    expect(frame.canvas[0][0].color).toBe(COLORS.transparent);

    expect(result._currentFrameId).toBe(frame.id);

    expect(result).toMatchObject({
      ...DEFAULT_EDITOR_SNAPSHOT,
      history: historyMock,
    });
  });
});
