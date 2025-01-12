import { ClientStorage, ClientStorageKeys } from "../../client-storage";
import { DEFAULT_SNAPSHOT } from "../constants";
import {
  TPomodoroSettings,
  TPomodoroTimerSnapshot,
  TPomodoroTimerSnapshotReducer,
  TPomodoroTimerState,
} from "../types";

export const snapshotReducer: TPomodoroTimerSnapshotReducer = (
  state,
  action,
) => {
  switch (action.type) {
    case "break-count":
      return {
        ...state,
        breakCount: action.payload.breakCount,
      };
    case "is-paused":
      return {
        ...state,
        isPaused: action.payload.isPaused,
      };
    case "settings": {
      return {
        ...state,
        settings: action.payload.settings,
      };
    }
    case "state": {
      return {
        ...state,
        state: action.payload.state,
      };
    }
    case "tasks": {
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    }
    case "update-counter": {
      const prev = new Date(state.lastCounterUpdateTime);
      const delta = Date.now() - prev.getTime();

      return {
        ...state,
        secondsCounter: state.secondsCounter + delta / 1000,
        lastCounterUpdateTime: Date.now(),
      };
    }
  }
};

function validatePomodoroTimerSnapshot(
  data: unknown,
): data is Omit<TPomodoroTimerSnapshot, "settings"> {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const snapshot = data as TPomodoroTimerSnapshot;

  if (
    typeof snapshot.breakCount !== "number" ||
    typeof snapshot.isPaused !== "boolean" ||
    typeof snapshot.secondsCounter !== "number" ||
    typeof snapshot.lastCounterUpdateTime !== "number"
  ) {
    return false;
  }

  if (!Object.values(TPomodoroTimerState).includes(snapshot.state)) {
    return false;
  }

  if (!Array.isArray(snapshot.tasks)) {
    return false;
  }

  for (const task of snapshot.tasks) {
    if (
      typeof task.checked !== "boolean" ||
      typeof task.name !== "string" ||
      (task.estimatedPomodoros !== undefined &&
        typeof task.estimatedPomodoros !== "number")
    ) {
      return false;
    }
  }

  return true;
}

export function initSnapshot(
  settings: TPomodoroSettings,
): TPomodoroTimerSnapshot {
  const unsanitizedSnapshot = ClientStorage.get(
    ClientStorageKeys.POMODORO_SNAPSHOT,
  );

  if (!validatePomodoroTimerSnapshot(unsanitizedSnapshot))
    return {
      ...DEFAULT_SNAPSHOT,
      settings,
    };

  return {
    ...unsanitizedSnapshot,
    settings: settings,
  };
}
