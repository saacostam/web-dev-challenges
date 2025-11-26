import {
  COLORS,
  DEFAULT_DIMENSIONS,
  DEFAULT_EDITOR_SNAPSHOT,
} from "../constants";
import {
  TPixelArtEditorHistory,
  TPixelArtEditorInternalSnapShot,
} from "../types";
import { SeederService } from "./seeder";

export interface InitializeEditorSnapshotInput {
  history: TPixelArtEditorHistory;
}

function initializeEditorSnapshot({
  history,
}: InitializeEditorSnapshotInput): TPixelArtEditorInternalSnapShot {
  const defaultFrame = SeederService.seedFrame({
    defaultColor: COLORS.transparent,
    height: DEFAULT_DIMENSIONS.HEIGHT,
    width: DEFAULT_DIMENSIONS.WIDTH,
  });

  return {
    ...DEFAULT_EDITOR_SNAPSHOT,
    frames: [defaultFrame],
    _currentFrameId: defaultFrame.id,
    history,
  };
}

export const InitializerService = {
  initializeEditorSnapshot,
};
