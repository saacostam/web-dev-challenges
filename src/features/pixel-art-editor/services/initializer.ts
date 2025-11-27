import {
  ClientStorageKeys,
  IStorageAdapter,
} from "../../../shared/adapters/storage/domain";
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
import { ValidationService } from "./validation";

export interface InitializeEditorSnapshotInput {
  history: TPixelArtEditorHistory;
  storage: IStorageAdapter;
}

function initializeEditorSnapshot({
  history,
  storage,
}: InitializeEditorSnapshotInput): TPixelArtEditorInternalSnapShot {
  const rawEditorSnapshot = storage.get(
    ClientStorageKeys.PIXEL_ART_EDITOR_SNAPSHOT,
  );
  if (ValidationService.isPixelArtEditorStorableSnapshot(rawEditorSnapshot)) {
    return {
      ...rawEditorSnapshot,
      history,
    };
  }

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
