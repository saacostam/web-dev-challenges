import {
  COLORS,
  DEFAULT_DIMENSIONS,
  DEFAULT_EDITOR_SNAPSHOT,
} from "../constants";
import { TPixelArtEditorHistory, TPixelArtEditorSnapShot } from "../types";
import { SeederService } from "./seeder";

export interface GetEditorSnapshotFromClientStorageInput {
  history: TPixelArtEditorHistory;
}

function getEditorSnapshotFromClientStorage({
  history,
}: GetEditorSnapshotFromClientStorageInput): TPixelArtEditorSnapShot {
  return {
    ...DEFAULT_EDITOR_SNAPSHOT,
    frames: [
      SeederService.seedFrame({
        defaultColor: COLORS.transparent,
        height: DEFAULT_DIMENSIONS.HEIGHT,
        width: DEFAULT_DIMENSIONS.WIDTH,
      }),
    ],
    history,
  };
}

export const ClientStorageService = {
  getEditorSnapshotFromClientStorage,
};
