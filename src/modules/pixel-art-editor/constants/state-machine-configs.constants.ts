import {
  TEditorOptionName,
  TMouseInputType,
  TStateMachineConfig,
  TUpdate,
  TMouseClickType,
} from "../types";
import { COLORS } from "./colors.constants";

const pencilStateMachineConfig: TStateMachineConfig<
  {
    update: TUpdate;
    isLeftClick: boolean;
  },
  "clicked" | "not-clicked"
> = {
  ctx: () => ({
    update: {
      mutations: [],
    },
    isLeftClick: true,
  }),
  defaultState: "not-clicked",
  states: ["clicked", "not-clicked"],
  transitions: {
    "not-clicked": {
      [TMouseInputType.CLICK]: {
        nextState: "clicked",
        handler: ({ bufferFrame, ctx, clickType }) => {
          for (let j = 0; j < bufferFrame.canvas.length; j++) {
            for (let x = 0; x < bufferFrame.canvas[j].length; x++) {
              bufferFrame.canvas[j][x].color = COLORS.transparent;
            }
          }

          return {
            ...ctx,
            isLeftClick: clickType === TMouseClickType.LEFT,
          };
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

          return {
            ...ctx,
          };
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
        handler: ({ bufferFrame, ctx, editorSnapshot, position }) => {
          const color = ctx.isLeftClick
            ? editorSnapshot.currentColorPrimary
            : editorSnapshot.currentColorSecondary;

          bufferFrame.canvas[position.y][position.x].color = color;

          const isPainted = ctx.update.mutations.some(
            (mutation) =>
              mutation.type === "switch-color" &&
              mutation.payload.position.x === position.x &&
              mutation.payload.position.y === position.y &&
              mutation.payload.toColor === color,
          );

          return {
            ...ctx,
            update: {
              mutations: isPainted
                ? ctx.update.mutations
                : [
                    ...ctx.update.mutations,
                    {
                      type: "switch-color",
                      payload: {
                        position,
                        fromColor:
                          bufferFrame.canvas[position.y][position.x].color,
                        toColor: color,
                      },
                    },
                  ],
            },
          };
        },
      },
      [TMouseInputType.RELEASE]: {
        nextState: "not-clicked",
        handler: ({ ctx, dispatch }) => {
          dispatch({
            type: "commit-update",
            payload: {
              update: ctx.update,
            },
          });

          return {
            update: {
              mutations: [],
            },
            isLeftClick: true,
          };
        },
      },
      [TMouseInputType.CANCEL]: {
        nextState: "not-clicked",
        handler: ({ ctx }) => ctx,
      },
    },
  },
};

export const STATE_MACHINE_CONFIGS = {
  [TEditorOptionName.BUCKET]: pencilStateMachineConfig,
  [TEditorOptionName.COLOR_PICKER]: pencilStateMachineConfig,
  [TEditorOptionName.ERASER]: pencilStateMachineConfig,
  [TEditorOptionName.PENCIL]: pencilStateMachineConfig,
};
