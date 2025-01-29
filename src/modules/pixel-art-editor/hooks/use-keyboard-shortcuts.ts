import { useEffect } from "react";
import { useEditorSnapshot } from "../providers";
import { TEditorOptionName } from "../types";

export function useKeyboardShortcuts() {
  const { dispatch, editorSnapshot } = useEditorSnapshot();

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "b":
          dispatch({
            type: "current-option",
            payload: {
              currentOption: TEditorOptionName.BUCKET,
            },
          });
          break;
        case "p":
          dispatch({
            type: "current-option",
            payload: {
              currentOption: TEditorOptionName.PENCIL,
            },
          });
          break;
        case "e":
          dispatch({
            type: "current-option",
            payload: {
              currentOption: TEditorOptionName.ERASER,
            },
          });
          break;
        case "c":
          dispatch({
            type: "current-option",
            payload: {
              currentOption: TEditorOptionName.COLOR_PICKER,
            },
          });
          break;
        case "g":
          dispatch({
            type: "show-grid",
            payload: {
              showGrid: !editorSnapshot.showGrid,
            },
          });
      }
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [dispatch, editorSnapshot.showGrid]);
}
