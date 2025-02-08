import { twMerge } from "tailwind-merge";
import { TFrame } from "../../types";
import { FramePreview } from "./frame-preview";
import { DuplicateIcon, TrashIcon } from "../../../icons";

export interface FrameCtaProps {
  active: boolean;
  frame: TFrame;
  hideMultiFrameCta: boolean;
  onClickDeleteFrameHandler: () => void;
  onClickDuplicateFrameHandler: () => void;
  onClickFrameHandler: () => void;
}

export function FrameCta({
  active,
  frame,
  hideMultiFrameCta,
  onClickDeleteFrameHandler,
  onClickDuplicateFrameHandler,
  onClickFrameHandler,
}: FrameCtaProps) {
  return (
    <div
      className={twMerge(
        "btn btn-square btn-primary w-full h-20 relative cursor-default",
        active ? "" : "btn-outline",
      )}
      onClick={onClickFrameHandler}
      role="button"
    >
      <div className="p-2">
        <FramePreview frame={frame} />
      </div>
      <div className="w-full h-full absolute group">
        <button
          className="absolute top-0 right-0 btn btn-primary btn-square btn-xs hidden group-hover:flex"
          onClick={onClickDuplicateFrameHandler}
        >
          <DuplicateIcon className="size-4" />
        </button>
        {!hideMultiFrameCta && (
          <button
            className="absolute bottom-0 right-0 btn btn-primary btn-square btn-xs hidden group-hover:flex"
            onClick={onClickDeleteFrameHandler}
          >
            <TrashIcon className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
