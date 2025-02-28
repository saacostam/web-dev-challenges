import {
  TMouseInputType,
  TStateMachineConfig,
  TTransitionHandler,
  TUpdate,
} from "../../types";
import { FrameUtils } from "../../utils";
import { COLORS } from "../colors.constants";

interface TEraserStateMachineContext {
  update: TUpdate;
}

const dragWhenClickedTransitionHandler: TTransitionHandler<
  TEraserStateMachineContext
> = ({ buffer, ctx, editorSnapshot, position }) => {
  const color = COLORS.transparent;
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

export const eraserStateMachineConfig: TStateMachineConfig<
  {
    update: TUpdate;
  },
  "clicked" | "not-clicked"
> = {
  ctx: () => ({
    update: {
      mutations: [],
    },
  }),
  defaultState: "not-clicked",
  states: ["clicked", "not-clicked"],
  transitions: {
    "not-clicked": {
      [TMouseInputType.CLICK]: {
        nextState: "clicked",
        handler: (input) => {
          const { buffer, ctx, editorSnapshot } = input;

          buffer.frame = FrameUtils.deepCopyFrame(editorSnapshot.currentFrame);
          buffer.enabled = true;

          return dragWhenClickedTransitionHandler({
            ...input,
            ctx: {
              ...ctx,
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
          };
        },
      },
    },
  },
};
