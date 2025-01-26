import {
  TMouseInputType,
  TStateMachineConfig,
  TMouseClickType,
} from "../../types";
import { COLORS } from "../colors.constants";

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
          for (let j = 0; j < bufferFrame.canvas.length; j++) {
            for (let x = 0; x < bufferFrame.canvas[j].length; x++) {
              bufferFrame.canvas[j][x].color = COLORS.transparent;
            }
          }

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
          for (let j = 0; j < bufferFrame.canvas.length; j++) {
            for (let x = 0; x < bufferFrame.canvas[j].length; x++) {
              bufferFrame.canvas[j][x].color =
                j === position.y && x === position.x
                  ? COLORS.hover
                  : COLORS.transparent;
            }
          }

          return ctx;
        },
      },
      [TMouseInputType.RELEASE]: {
        nextState: "not-clicked",
        handler: ({ ctx }) => ctx,
      },
      [TMouseInputType.CANCEL]: {
        nextState: "not-clicked",
        handler: ({ ctx }) => ctx,
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
        handler: ({ ctx }) => ctx,
      },
    },
  },
};
