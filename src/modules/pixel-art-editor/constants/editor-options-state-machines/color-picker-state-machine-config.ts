import {
  TMouseInputType,
  TStateMachineConfig,
  TMouseClickType,
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
          bufferFrame,
          ctx,
          clickType,
          dispatch,
          editorSnapshot,
          position,
        }) => {
          FrameUtils.clearFrame(bufferFrame);

          dispatch({
            type:
              clickType === TMouseClickType.LEFT
                ? "current-color-primary"
                : "current-color-secondary",
            payload: {
              color:
                editorSnapshot.frames[0].canvas[position.y][position.x].color,
            },
          });

          return ctx;
        },
      },
      [TMouseInputType.DRAG]: {
        nextState: "not-clicked",
        handler: ({ bufferFrame, ctx, position }) => {
          FrameUtils.paintHover(bufferFrame, position);
          return ctx;
        },
      },
      [TMouseInputType.RELEASE]: {
        nextState: "not-clicked",
        handler: ({ ctx }) => ctx,
      },
      [TMouseInputType.CANCEL]: {
        nextState: "not-clicked",
        handler: ({ bufferFrame, ctx }) => {
          FrameUtils.clearFrame(bufferFrame);
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
        handler: ({ bufferFrame, ctx }) => {
          FrameUtils.clearFrame(bufferFrame);
          return ctx;
        },
      },
    },
  },
};
