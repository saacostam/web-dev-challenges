import { useCallback } from "react";

import { useAdapters } from "../../../../shared/adapters/core/app";
import { SubHeader, useModal } from "../../../../shared/components";
import { ArrowDownTray, ArrowUpTray } from "../../../../shared/icons";
import { DomainErrorUtils } from "../../../error-handling/domain";
import { useEditorSnapshot } from "../../providers";
import { TEditorOptionName } from "../../types";
import { ColorPicker } from "./color-picker";
import { ImportFromJson } from "./import-from-json";
import { ShowGridCheck } from "./show-grid-check";
import { ToolMenu } from "./tool-menu";
import { UndoRedo } from "./undo-redo";

export function Menu() {
  const { notificationsAdapter } = useAdapters();
  const { editorSnapshot, dispatch, downloadSnaphot, loadSnapshot } =
    useEditorSnapshot();
  const {
    Modal: FileModal,
    closeModal: closeFileModal,
    openModal: openFileModal,
  } = useModal();

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
        <div className="mt-2">
          <SubHeader className="text-lg text-center mb-2">File</SubHeader>
          <div className="flex flex-row gap-1">
            <div className="tooltip" data-tip="Download Json">
              <button
                className="btn btn-primary btn-sm flex-1"
                onClick={downloadSnaphot}
              >
                <ArrowDownTray className="size-5" />
              </button>
            </div>
            <div className="tooltip" data-tip="Import Json">
              <button className="btn btn-sm flex-1" onClick={openFileModal}>
                <ArrowUpTray className="size-5" />
              </button>
            </div>
          </div>
        </div>
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
      <FileModal>
        <ImportFromJson
          onSettled={closeFileModal}
          loadSnapshot={loadSnapshot}
          onError={(e) => {
            notificationsAdapter.logError(
              DomainErrorUtils.getMessageWithDefault(e, "Unnable to load file"),
              "import-from-json-error",
            );
          }}
        />
      </FileModal>
    </div>
  );
}
