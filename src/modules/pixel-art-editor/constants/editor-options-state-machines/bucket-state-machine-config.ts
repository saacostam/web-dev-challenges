import {
  TMouseInputType,
  TStateMachineConfig,
  TMouseClickType,
  TUpdate,
  TPosition,
} from "../../types";
import { FrameUtils } from "../../utils";

export const bucketStateMachineConfig: TStateMachineConfig<
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

          const currentColor =
            editorSnapshot.frames[0].canvas[position.y][position.x].color;
          const objectiveColor =
            clickType === TMouseClickType.LEFT
              ? editorSnapshot.currentColorPrimary
              : editorSnapshot.currentColorSecondary;
          const update: TUpdate = {
            mutations: [],
          };

          const getHash = (pos: TPosition) => `${pos.x}-${pos.y}`;

          const visited = new Set<string>();
          const dfs = (pos: TPosition) => {
            if (pos.y < 0 || pos.y >= bufferFrame.canvas.length) return;
            if (pos.x < 0 || pos.x >= bufferFrame.canvas[0].length) return;

            const isSameColor =
              editorSnapshot.frames[0].canvas[pos.y][pos.x].color ===
              currentColor;

            if (visited.has(getHash(pos)) || !isSameColor) return;
            visited.add(getHash(pos));

            update.mutations.push({
              type: "switch-color",
              payload: {
                position: pos,
                fromColor: editorSnapshot.frames[0].canvas[pos.y][pos.x].color,
                toColor: objectiveColor,
              },
            });

            dfs({ x: pos.x - 1, y: pos.y });
            dfs({ x: pos.x + 1, y: pos.y });
            dfs({ x: pos.x, y: pos.y - 1 });
            dfs({ x: pos.x, y: pos.y + 1 });
          };

          dfs(position);

          dispatch({
            type: "commit-update",
            payload: {
              update,
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
