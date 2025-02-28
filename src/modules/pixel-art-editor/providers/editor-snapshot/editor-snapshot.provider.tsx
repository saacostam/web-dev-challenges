import { PropsWithChildren } from "react";

import { EditorSnapshotContext } from "./editor-snapshot.context";
import { useEditorSnapshotStateHook } from "./use-editor-snapshot";

export function EditorSnaphostProvider({ children }: PropsWithChildren) {
  return (
    <EditorSnapshotContext.Provider value={useEditorSnapshotStateHook()}>
      {children}
    </EditorSnapshotContext.Provider>
  );
}
