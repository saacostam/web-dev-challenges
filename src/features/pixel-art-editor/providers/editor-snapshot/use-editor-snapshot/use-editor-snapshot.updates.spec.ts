import { act } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  MockAdapters,
  renderHookWithProviders,
} from "@/shared/test";
import { TCanvas, TPixelArtEditorAction, TUpdate } from "../../../types";
import { applyUpdate } from "../apply-and-rever-update";
import { useEditorSnapshotStateHook } from "./use-editor-snapshot";

const mockAdapter: MockAdapters = {
  blobExportAdapter: {},
  downloaderAdapter: {},
  storageAdapter: {
    get: () => null,
    set: () => {},
  },
};

describe("useEditorSnapshotStateHook [Update-based actions]", () => {
  it("should commit-update", () => {
    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      {
        adapters: mockAdapter,
      },
    );

    const ogState = result.current.editorSnapshot;

    const update: TUpdate = {
      mutations: [],
    };
    act(() => {
      result.current.dispatch({
        type: "commit-update",
        payload: {
          update: update,
        },
      });
    });

    expect(result.current.editorSnapshot.history.updates).toContain(update);
    expect({
      ...result.current.editorSnapshot,
      history: undefined,
    }).toMatchObject({
      ...applyUpdate(update, ogState),
      history: undefined,
    });
  });

  describe("undo-redo", () => {
    it("should undo and redo", () => {
      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        {
          adapters: mockAdapter,
        },
      );

      const canvas: TCanvas = [];
      const update: TUpdate = {
        mutations: [
          {
            type: "create-frame",
            payload: {
              newFrame: {
                canvas: canvas,
              },
              order: 0,
            },
          },
        ],
      };
      act(() => {
        result.current.dispatch({
          type: "commit-update",
          payload: {
            update: update,
          },
        });
      });

      // Undo
      expect(
        result.current.editorSnapshot.frames.map((f) => f.canvas),
      ).toContain(canvas);

      act(() => {
        result.current.dispatch({
          type: "undo",
        });
      });
      expect(
        result.current.editorSnapshot.frames.map((f) => f.canvas),
      ).not.toContain(canvas);

      // Redo
      act(() => {
        result.current.dispatch({
          type: "redo",
        });
      });
      expect(
        result.current.editorSnapshot.frames.map((f) => f.canvas),
      ).toContain(canvas);
    });

    it("should gracefully handle empty history", () => {
      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        {
          adapters: mockAdapter,
        },
      );

      const safeDispatch = (action: TPixelArtEditorAction) =>
        act(() => expect(() => result.current.dispatch(action)).not.toThrow());

      safeDispatch({ type: "undo" });
      safeDispatch({ type: "undo" });
      safeDispatch({ type: "redo" });
      safeDispatch({ type: "redo" });
    });
  });

  it("should create-frame", () => {
    const { result } = renderHookWithProviders(
      () => useEditorSnapshotStateHook(),
      { adapters: mockAdapter },
    );

    const initialFrameCount = result.current.editorSnapshot.frames.length;
    const currentFrame = result.current.editorSnapshot.currentFrame;

    act(() => {
      result.current.dispatch({
        type: "create-frame",
        payload: { order: initialFrameCount },
      });
    });

    const frames = result.current.editorSnapshot.frames;

    expect(frames.length).toBe(initialFrameCount + 1);

    const last = frames[frames.length - 1];

    expect(last.canvas.length).toBe(currentFrame.canvas.length);
    expect(last.canvas[0]?.length).toBe(currentFrame.canvas[0]?.length ?? 0);
  });

  describe("delete-frame", () => {
    it("should delete-frame", () => {
      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        { adapters: mockAdapter },
      );

      act(() => {
        result.current.dispatch({
          type: "create-frame",
          payload: { order: 1 },
        });
      });

      const beforeFrameCount = result.current.editorSnapshot.frames.length;
      const secondFrame = result.current.editorSnapshot.frames[1];

      act(() => {
        result.current.dispatch({
          type: "delete-frame",
          payload: { id: secondFrame.id },
        });
      });

      const frames = result.current.editorSnapshot.frames;

      expect(frames.length).toBe(beforeFrameCount - 1);
      expect(frames.find((f) => f.id === secondFrame.id)).toBeUndefined();
    });

    it("should ignore delete-frame when only one frame exists", () => {
      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        { adapters: mockAdapter },
      );

      const initialId = result.current.editorSnapshot.currentFrame.id;

      act(() => {
        result.current.dispatch({
          type: "delete-frame",
          payload: { id: initialId },
        });
      });

      const frames = result.current.editorSnapshot.frames;

      expect(frames.length).toBe(1);
      expect(frames[0].id).toBe(initialId);
    });
  });

  describe("duplicate-frame", () => {
    it("should duplicate-frame", () => {
      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        { adapters: mockAdapter },
      );

      const original = result.current.editorSnapshot.currentFrame;
      const originalIndex = result.current.editorSnapshot.frames.findIndex(
        (f) => f.id === original.id,
      );

      act(() => {
        result.current.dispatch({
          type: "duplicate-frame",
          payload: { id: original.id },
        });
      });

      const frames = result.current.editorSnapshot.frames;
      const dup = frames[originalIndex + 1];

      expect(dup).toBeDefined();
      expect(dup).not.toBe(original);
      expect(dup.canvas).not.toBe(original.canvas);
      expect(dup.canvas).toMatchObject(original.canvas);

      expect(result.current.editorSnapshot._currentFrameId).toBe(dup.id);
    });

    it("should ignore duplicate-frame when frame does not exist", () => {
      const { result } = renderHookWithProviders(
        () => useEditorSnapshotStateHook(),
        { adapters: mockAdapter },
      );

      const before = result.current.editorSnapshot.frames.length;

      act(() => {
        result.current.dispatch({
          type: "duplicate-frame",
          payload: { id: "does-not-exist" },
        });
      });

      expect(result.current.editorSnapshot.frames.length).toBe(before);
    });
  });
});
