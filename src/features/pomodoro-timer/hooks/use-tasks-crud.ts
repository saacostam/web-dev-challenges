import { Dispatch, useCallback, useMemo } from "react";

import { getUuid } from "@/shared/string.utils";
import {
  TCreateTask,
  TDeleteTask,
  TPomodoroTimerSnapshotAction,
  TUpdateTask,
} from "../types";

export interface UseTasksCRUDProps {
  dispatcher: Dispatch<TPomodoroTimerSnapshotAction>;
}

export function useTasksCRUD({ dispatcher }: UseTasksCRUDProps) {
  const createTask: TCreateTask = useCallback(
    (task) =>
      dispatcher({
        type: "tasks",
        payload: {
          tasks: (state) => [...state, { ...task, id: getUuid() }],
        },
      }),
    [dispatcher],
  );

  const deleteTask: TDeleteTask = useCallback(
    (id) => {
      dispatcher({
        type: "tasks",
        payload: {
          tasks: (state) => state.filter((task) => task.id !== id),
        },
      });
    },
    [dispatcher],
  );

  const updateTask: TUpdateTask = useCallback(
    (id, taskSetAction) =>
      dispatcher({
        type: "tasks",
        payload: {
          tasks: (state) =>
            state.map((task) =>
              task.id === id
                ? taskSetAction instanceof Function
                  ? taskSetAction(task)
                  : taskSetAction
                : task,
            ),
        },
      }),
    [dispatcher],
  );

  return useMemo(
    () => ({
      createTask,
      deleteTask,
      updateTask,
    }),
    [createTask, deleteTask, updateTask],
  );
}
