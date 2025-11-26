import { TEditorOptionName, TPixelArtEditorInternalSnapShot } from "../types";
import { COLORS } from "./colors.constants";

export const DEFAULT_EDITOR_SNAPSHOT: Omit<
  TPixelArtEditorInternalSnapShot,
  "history" | "frames" | "_currentFrameId"
> = {
  currentColorPrimary: COLORS.black,
  currentColorSecondary: COLORS.transparent,
  fps: 12,
  selectedOption: TEditorOptionName.PENCIL,
  showGrid: true,
};
