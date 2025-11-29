import { createContext, useContext } from "react";

import { IEditorSnapshotService } from "../../types";

export const EditorSnapshotContext = createContext(
  null as unknown as IEditorSnapshotService,
);

export function useEditorSnapshot() {
  return useContext(EditorSnapshotContext);
}
