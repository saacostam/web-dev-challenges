import {
  TMouseClickType,
  TMouseInputType,
  TStateMachineConfig,
} from "../../types";
import { FrameUtils } from "../../utils";

export const colorPickerStateMachineConfig: TStateMachineConfig<
  unknown,
  "clicked" | "not-clicked"
> = {
  ctx: () => ({}),
  defaultState: "not-clicked",
  states: ["clicked", "not-clicked"],
  transitions: {
    "not-clicked": {
      [TMouseInputType.CLICK]: {
        nextState: "clicked",
        handler: ({
          buffer,
          ctx,
          clickType,
          dispatch,
          editorSnapshot,
          position,
        }) => {
          buffer.frame = FrameUtils.deepCopyFrame(editorSnapshot.currentFrame);
          buffer.enabled = true;

          dispatch({
            type:
              clickType === TMouseClickType.LEFT
                ? "current-color-primary"
                : "current-color-secondary",
            payload: {
              color:
                editorSnapshot.currentFrame.canvas[position.y][position.x]
                  .color,
            },
          });

          return ctx;
        },
      },
      [TMouseInputType.DRAG]: {
        nextState: "not-clicked",
        handler: ({ buffer, ctx, position }) => {
          FrameUtils.paintHover(buffer.frame, position);
          return ctx;
        },
      },
      [TMouseInputType.RELEASE]: {
        nextState: "not-clicked",
        handler: ({ ctx }) => ctx,
      },
      [TMouseInputType.CANCEL]: {
        nextState: "not-clicked",
        handler: ({ buffer, ctx }) => {
          FrameUtils.clearFrame(buffer.frame);
          buffer.enabled = false;
          return ctx;
        },
      },
    },
    clicked: {
      [TMouseInputType.CLICK]: {
        nextState: "clicked",
        handler: ({ ctx }) => ctx,
      },
      [TMouseInputType.DRAG]: {
        nextState: "clicked",
        handler: ({ ctx }) => ctx,
      },
      [TMouseInputType.RELEASE]: {
        nextState: "not-clicked",
        handler: ({ ctx }) => ctx,
      },
      [TMouseInputType.CANCEL]: {
        nextState: "not-clicked",
        handler: ({ buffer, ctx }) => {
          FrameUtils.clearFrame(buffer.frame);
          buffer.enabled = false;
          return ctx;
        },
      },
    },
  },
};
