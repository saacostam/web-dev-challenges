import { PropsWithChildren } from "react";
import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from "../../../icons";
import { twMerge } from "tailwind-merge";

export interface UndoRedoProps {
  redo: () => void;
  redoAvailable: boolean;
  undo: () => void;
  undoAvailable: boolean;
}

export function UndoRedo({
  redo,
  redoAvailable,
  undo,
  undoAvailable,
}: UndoRedoProps) {
  return (
    <div className="flex gap-1">
      <Button tooltip="Back" onClick={undo} disabled={!undoAvailable}>
        <ArrowUturnLeftIcon className="size-4" />
      </Button>
      <Button tooltip="Forward" onClick={redo} disabled={!redoAvailable}>
        <ArrowUturnRightIcon className="size-4" />
      </Button>
    </div>
  );
}

function Button(
  props: PropsWithChildren<{
    disabled: boolean;
    tooltip: string;
    onClick: () => void;
  }>,
) {
  return (
    <div className="tooltip" data-tip={props.tooltip}>
      <button
        className={twMerge(
          "btn btn-square btn-primary transition-transform btn-outline",
          props.disabled ? "btn-disabled" : "",
        )}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
}
