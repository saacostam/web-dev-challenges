import { TEditorOptionName, TPixelArtEditorSnapShot } from "../types";
import { COLORS } from "./colors.constants";

export const DEFAULT_EDITOR_SNAPSHOT: Omit<TPixelArtEditorSnapShot, "history"> =
  {
    currentColorPrimary: COLORS.black,
    currentColorSecondary: COLORS.white,
    fps: 12,
    frames: [],
    selectedOption: TEditorOptionName.PENCIL,
    showGrid: true,
  };
