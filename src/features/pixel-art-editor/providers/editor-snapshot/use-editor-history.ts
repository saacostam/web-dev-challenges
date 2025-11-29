import { useCallback, useMemo, useState } from "react";

import { TPixelArtEditorHistory, TUpdate } from "../../types";

const DEFAULT_UPDATES_STACK: TUpdate[] = [];
const DEFAULT_HISTORY_STACK: TUpdate[] = [];

/**
 * Creates a state container to manage the history of a pixel art editor. The returned object has the following properties:
 * - `updates`: The current state of the editor as an array of updates
 * - `add`: A function to add a new action to the history
 * - `undo`: A function to undo the last action
 * - `undoAvailable`: A boolean indicating whether undo is available
 * - `redo`: A function to redo the last action that was undone
 * - `redoAvailable`: A boolean indicating whether redo is available
 *
 * @returns {TPixelArtEditorHistory}
 */
export function useEditorHistoryStateHook(): TPixelArtEditorHistory {
  const [updatesStack, setUpdatesStack] = useState<TUpdate[]>(
    DEFAULT_UPDATES_STACK,
  );
  const [historyStack, setHistoryStack] = useState<TUpdate[]>(
    DEFAULT_HISTORY_STACK,
  );

  const reset = useCallback(() => {
    setUpdatesStack(DEFAULT_UPDATES_STACK);
    setHistoryStack(DEFAULT_HISTORY_STACK);
  }, []);

  const add = useCallback((action: TUpdate) => {
    // When a new action is added, clear the history stack as a new "path" is created
    setUpdatesStack((prev) => [...prev, action]);
    setHistoryStack([]);

    return action;
  }, []);

  const undo = useCallback(() => {
    if (updatesStack.length === 0) return undefined;
    const lastUpdate = updatesStack[updatesStack.length - 1];

    setUpdatesStack((prev) => prev.filter((update) => update !== lastUpdate));
    setHistoryStack((prev) => [...prev, lastUpdate]);

    return lastUpdate;
  }, [updatesStack]);

  const undoAvailable = useMemo(() => updatesStack.length > 0, [updatesStack]);

  const redo = useCallback(() => {
    if (historyStack.length === 0) return undefined;
    const lastUpdateFromHistory = historyStack[historyStack.length - 1];

    setHistoryStack((prev) =>
      prev.filter((update) => update !== lastUpdateFromHistory),
    );
    setUpdatesStack((prev) => [...prev, lastUpdateFromHistory]);

    return lastUpdateFromHistory;
  }, [historyStack]);

  const redoAvailable = useMemo(() => historyStack.length > 0, [historyStack]);

  return useMemo(
    () => ({
      updates: updatesStack,
      add,
      undo,
      undoAvailable,
      redo,
      redoAvailable,
      reset,
    }),
    [updatesStack, add, undo, undoAvailable, redo, redoAvailable, reset],
  );
}
