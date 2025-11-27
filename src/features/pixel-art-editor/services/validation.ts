import {
  TEditorOptionName,
  TFrame,
  TPixel,
  TPixelArtEditorStorableSnapShot,
} from "../types";

function isPixelArtEditorStorableSnapshot(
  payload: unknown,
): payload is TPixelArtEditorStorableSnapShot {
  if (typeof payload !== "object" || payload === null) {
    return false;
  }

  const snapshot = payload as TPixelArtEditorStorableSnapShot;

  return (
    typeof snapshot.currentColorPrimary === "string" &&
    typeof snapshot.currentColorSecondary === "string" &&
    typeof snapshot.fps === "number" &&
    Array.isArray(snapshot.frames) &&
    snapshot.frames.every((frame: unknown) => isFrame(frame)) &&
    typeof snapshot._currentFrameId === "string" &&
    Object.values(TEditorOptionName).includes(snapshot.selectedOption) &&
    typeof snapshot.showGrid === "boolean"
  );
}

function isFrame(frame: unknown): frame is TFrame {
  return (
    typeof frame === "object" &&
    frame !== null &&
    typeof (frame as TFrame).id === "string" &&
    Array.isArray((frame as TFrame).canvas) &&
    (frame as TFrame).canvas.every(
      (row: unknown) =>
        Array.isArray(row) && row.every((pixel: unknown) => isPixel(pixel)),
    )
  );
}

function isPixel(pixel: unknown): pixel is TPixel {
  return (
    typeof pixel === "object" &&
    pixel !== null &&
    typeof (pixel as TPixel).color === "string"
  );
}

export const ValidationService = {
  isPixelArtEditorStorableSnapshot,
};
