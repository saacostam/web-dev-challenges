import {
  TMouseClickType,
  TMouseInputType,
  TPosition,
  TStateMachineConfig,
  TUpdate,
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
          buffer,
          ctx,
          clickType,
          dispatch,
          editorSnapshot,
          position,
        }) => {
          buffer.frame = FrameUtils.deepCopyFrame(editorSnapshot.currentFrame);
          buffer.enabled = true;

          const currentColor =
            editorSnapshot.currentFrame.canvas[position.y][position.x].color;
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
            if (pos.y < 0 || pos.y >= buffer.frame.canvas.length) return;
            if (pos.x < 0 || pos.x >= buffer.frame.canvas[0].length) return;

            const isSameColor =
              editorSnapshot.currentFrame.canvas[pos.y][pos.x].color ===
              currentColor;

            if (visited.has(getHash(pos)) || !isSameColor) return;
            visited.add(getHash(pos));

            update.mutations.push({
              type: "switch-color",
              payload: {
                position: pos,
                fromColor:
                  editorSnapshot.currentFrame.canvas[pos.y][pos.x].color,
                toColor: objectiveColor,
                frame: editorSnapshot.currentFrame,
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
