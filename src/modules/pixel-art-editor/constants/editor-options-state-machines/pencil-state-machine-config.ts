import {
  TMouseInputType,
  TStateMachineConfig,
  TUpdate,
  TMouseClickType,
  TTransitionHandler,
} from "../../types";
import { FrameUtils } from "../../utils";

interface TPencilStateMachineContext {
  update: TUpdate;
  isLeftClick: boolean;
}

const dragWhenClickedTransitionHandler: TTransitionHandler<
  TPencilStateMachineContext
> = ({ buffer, ctx, editorSnapshot, position }) => {
  const color = ctx.isLeftClick
    ? editorSnapshot.currentColorPrimary
    : editorSnapshot.currentColorSecondary;
  const currentColor = buffer.frame.canvas[position.y][position.x].color;

  buffer.frame.canvas[position.y][position.x].color = color;

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
                fromColor: currentColor,
                toColor: color,
                frame: editorSnapshot.currentFrame,
              },
            },
          ],
    },
  };
};

export const pencilStateMachineConfig: TStateMachineConfig<
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
        handler: (input) => {
          const { buffer, ctx, clickType, editorSnapshot } = input;

          buffer.frame = FrameUtils.deepCopyFrame(editorSnapshot.currentFrame);
          buffer.enabled = true;

          return dragWhenClickedTransitionHandler({
            ...input,
            ctx: {
              ...ctx,
              isLeftClick: clickType === TMouseClickType.LEFT,
            },
          });
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
        handler: ({ buffer }) => {
          FrameUtils.clearFrame(buffer.frame);
          buffer.enabled = false;
          return {
            update: {
              mutations: [],
            },
            isLeftClick: true,
          };
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
        handler: dragWhenClickedTransitionHandler,
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
        handler: ({ buffer }) => {
          FrameUtils.clearFrame(buffer.frame);
          buffer.enabled = false;
          return {
            update: {
              mutations: [],
            },
            isLeftClick: true,
          };
        },
      },
    },
  },
};
