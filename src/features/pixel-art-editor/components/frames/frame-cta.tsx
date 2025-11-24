import { MouseEventHandler, useCallback } from "react";

import { twMerge } from "tailwind-merge";

import { DuplicateIcon, TrashIcon } from "../../../../shared/icons";
import { TFrame } from "../../types";
import { FramePreview } from "./frame-preview";

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
  onClickDeleteFrameHandler: _onClickDeleteFrameHandler,
  onClickDuplicateFrameHandler: _onClickDuplicateFrameHandler,
  onClickFrameHandler,
}: FrameCtaProps) {
  const onClickDeleteFrameHandler: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        e.stopPropagation();
        _onClickDeleteFrameHandler();
      },
      [_onClickDeleteFrameHandler],
    );

  const onClickDuplicateFrameHandler: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        e.stopPropagation();
        _onClickDuplicateFrameHandler();
      },
      [_onClickDuplicateFrameHandler],
    );

  return (
    <div
      className={twMerge(
        "btn btn-square btn-primary w-full relative cursor-default no-animation",
        active ? "" : "btn-outline",
      )}
      onClick={onClickFrameHandler}
      role="button"
      style={{
        paddingBottom: "100%",
      }}
    >
      <div className="left-0 top-0 p-2 absolute">
        <FramePreview frame={frame} />
      </div>
      <div className="w-full h-full absolute top-0 right-0 group">
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
