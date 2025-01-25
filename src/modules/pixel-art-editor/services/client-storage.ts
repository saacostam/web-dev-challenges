import { DEFAULT_EDITOR_SNAPSHOT } from "../constants";
import { TPixelArtEditorHistory, TPixelArtEditorSnapShot } from "../types";

export interface GetEditorSnapshotFromClientStorageInput {
  history: TPixelArtEditorHistory;
}

function getEditorSnapshotFromClientStorage({
  history,
}: GetEditorSnapshotFromClientStorageInput): TPixelArtEditorSnapShot {
  return {
    ...DEFAULT_EDITOR_SNAPSHOT,
    history,
  };
}

export const ClientStorageService = {
  getEditorSnapshotFromClientStorage,
};
