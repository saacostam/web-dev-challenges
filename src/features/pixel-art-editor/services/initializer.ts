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

export interface CreateDefaultEditorSnapshotArgs {
  history: TPixelArtEditorHistory;
}

function createDefaultEditorSnapshot({
  history,
}: CreateDefaultEditorSnapshotArgs): TPixelArtEditorInternalSnapShot {
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

export interface InitializeEditorSnapshotArgs {
  history: TPixelArtEditorHistory;
  storage: IStorageAdapter;
}

function initializeEditorSnapshot({
  history,
  storage,
}: InitializeEditorSnapshotArgs): TPixelArtEditorInternalSnapShot {
  const rawEditorSnapshot = storage.get(
    ClientStorageKeys.PIXEL_ART_EDITOR_SNAPSHOT,
  );
  if (ValidationService.isPixelArtEditorStorableSnapshot(rawEditorSnapshot)) {
    return {
      ...rawEditorSnapshot,
      history,
    };
  }

  return createDefaultEditorSnapshot({ history });
}

export interface ResetEditorSnapshotArgs {
  history: TPixelArtEditorHistory;
  storage: IStorageAdapter;
}

function resetEditorSnapshot({
  history,
  storage,
}: ResetEditorSnapshotArgs): TPixelArtEditorInternalSnapShot {
  storage.removeItem(ClientStorageKeys.PIXEL_ART_EDITOR_SNAPSHOT);
  return createDefaultEditorSnapshot({ history });
}

export const InitializerService = {
  initializeEditorSnapshot,
  resetEditorSnapshot,
};
