import { PropsWithChildren } from "react";
import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from "../../../icons";

export interface UndoRedoProps {
  redo: () => void;
  undo: () => void;
}

export function UndoRedo({ redo, undo }: UndoRedoProps) {
  return (
    <div className="flex gap-1">
      <Button tooltip="Back" onClick={undo}>
        <ArrowUturnLeftIcon className="size-4" />
      </Button>
      <Button tooltip="Forward" onClick={redo}>
        <ArrowUturnRightIcon className="size-4" />
      </Button>
    </div>
  );
}

function Button(
  props: PropsWithChildren<{
    tooltip: string;
    onClick: () => void;
  }>,
) {
  return (
    <div className="tooltip" data-tip={props.tooltip}>
      <button
        className="btn btn-square btn-primary transition-transform btn-outline"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
}
