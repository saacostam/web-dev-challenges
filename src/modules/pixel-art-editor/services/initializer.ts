import {
  COLORS,
  DEFAULT_DIMENSIONS,
  DEFAULT_EDITOR_SNAPSHOT,
} from "../constants";
import { TPixelArtEditorHistory, TPixelArtEditorSnapShot } from "../types";
import { SeederService } from "./seeder";

export interface InitializeEditorSnapshotInput {
  history: TPixelArtEditorHistory;
}

function initializeEditorSnapshot({
  history,
}: InitializeEditorSnapshotInput): TPixelArtEditorSnapShot {
  const defaultFrame = SeederService.seedFrame({
    defaultColor: COLORS.transparent,
    height: DEFAULT_DIMENSIONS.HEIGHT,
    width: DEFAULT_DIMENSIONS.WIDTH,
  });

  return {
    ...DEFAULT_EDITOR_SNAPSHOT,
    frames: [defaultFrame],
    currentFrame: defaultFrame,
    history,
  };
}

export const InitializerService = {
  initializeEditorSnapshot,
};
