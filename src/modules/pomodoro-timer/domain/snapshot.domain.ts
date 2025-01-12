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
    case "skip": {
      const currentStepDurationInSeconds = getCurrentStepDurationInSeconds({
        snapshot: state,
      });

      return {
        ...state,
        secondsCounter: currentStepDurationInSeconds,
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
        tasks:
          action.payload.tasks instanceof Function
            ? action.payload.tasks(state.tasks)
            : action.payload.tasks,
      };
    }
    case "update-counter": {
      const newState = {
        ...state,
      };

      const prev = new Date(state.lastCounterUpdateTime);
      newState.lastCounterUpdateTime = Date.now();

      const timeDelta = Math.max(0, Date.now() - prev.getTime());
      const milisecondsToAdd = newState.isPaused ? 0 : timeDelta;
      newState.secondsCounter = state.secondsCounter + milisecondsToAdd / 1000;

      const currentStepHasCompleted =
        newState.secondsCounter >
        getCurrentStepDurationInSeconds({ snapshot: newState });
      if (currentStepHasCompleted) {
        newState.secondsCounter = 0;

        // Transition to next state
        if (state.state !== TPomodoroTimerState.WORK) {
          newState.breakCount++;
          newState.state = TPomodoroTimerState.WORK;
        } else {
          const isNextLongBreak =
            Math.max(state.breakCount, 1) % state.settings.longBreakInterval ===
            state.settings.longBreakInterval - 1;

          newState.state = isNextLongBreak
            ? TPomodoroTimerState.LONG_BREAK
            : TPomodoroTimerState.SHORT_BREAK;
        }
      }

      return newState;
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
    if (typeof task.checked !== "boolean" || typeof task.name !== "string") {
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

export function getCurrentStepDurationInSeconds(args: {
  snapshot: TPomodoroTimerSnapshot;
}): number {
  return args.snapshot.settings.durations[args.snapshot.state] * 60 + 1;
}
