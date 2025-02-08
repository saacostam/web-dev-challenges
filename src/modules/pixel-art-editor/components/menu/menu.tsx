import { useCallback } from "react";
import { SubHeader } from "../../../core.components";
import { useEditorSnapshot } from "../../providers";
import { ColorPicker } from "./color-picker";
import { ToolMenu } from "./tool-menu";
import { TEditorOptionName } from "../../types";
import { ShowGridCheck } from "./show-grid-check";
import { UndoRedo } from "./undo-redo";

export function Menu() {
  const { editorSnapshot, dispatch } = useEditorSnapshot();

  const onClickMenuOption = useCallback(
    (name: TEditorOptionName) =>
      dispatch({
        type: "current-option",
        payload: { currentOption: name },
      }),
    [dispatch],
  );

  const setCurrentColorPrimary = useCallback(
    (color: string) =>
      dispatch({
        type: "current-color-primary",
        payload: { color },
      }),
    [dispatch],
  );

  const setCurrentColorSecondary = useCallback(
    (color: string) =>
      dispatch({
        type: "current-color-secondary",
        payload: { color },
      }),
    [dispatch],
  );

  const setShowGrid = useCallback(
    (showGrid: boolean) =>
      dispatch({
        type: "show-grid",
        payload: { showGrid },
      }),
    [dispatch],
  );

  const undo = useCallback(() => {
    dispatch({
      type: "undo",
    });
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch({
      type: "redo",
    });
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-y-4 h-full">
      <div>
        <SubHeader className="text-lg text-center mb-2">Tool Belt</SubHeader>
        <ToolMenu
          selectedOptionName={editorSnapshot.selectedOption}
          onClickMenuOption={onClickMenuOption}
        />
      </div>
      <div>
        <SubHeader className="text-lg text-center mb-2">Color</SubHeader>
        <ColorPicker
          currentColorPrimary={editorSnapshot.currentColorPrimary}
          setCurrentColorPrimary={setCurrentColorPrimary}
          currentColorSecondary={editorSnapshot.currentColorSecondary}
          setCurrentColorSecondary={setCurrentColorSecondary}
        />
      </div>
      <div className="mt-auto">
        <ShowGridCheck
          className="mb-2"
          setShowGrid={setShowGrid}
          showGrid={editorSnapshot.showGrid}
        />
        <UndoRedo
          redo={redo}
          redoAvailable={editorSnapshot.history.redoAvailable}
          undo={undo}
          undoAvailable={editorSnapshot.history.undoAvailable}
        />
      </div>
    </div>
  );
}
