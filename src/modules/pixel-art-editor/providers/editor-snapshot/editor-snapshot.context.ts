import { createContext, useContext } from "react";
import { useEditorSnapshotStateHook } from "./use-editor-snapshot";

export const EditorSnapshotContext = createContext(
  null as unknown as ReturnType<typeof useEditorSnapshotStateHook>,
);

export function useEditorSnapshot() {
  return useContext(EditorSnapshotContext);
}
