import {
  ClientStorageKeys,
  IStorageAdapter,
} from "../../../shared/adapters/storage/domain";
import { DEFAULT_SNAPSHOT } from "../constants";
import {
  TPomodoroSettings,
  TPomodoroTimerSnapshot,
  TPomodoroTimerSnapshotReducer,
  TPomodoroTimerState,
} from "../types";

/**
 * Reducer function to handle actions related to the pomodoro timer snapshot.
 */
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
    case "notified-alert":
      return {
        ...state,
        notifiedAlert: true,
      };
    case "notified-end":
      return {
        ...state,
        notifiedEnd: true,
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
        secondsCounter: 0,
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
        newState.notifiedAlert = false;
        newState.notifiedEnd = false;

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

/**
 * Validates the pomodoro timer snapshot object to ensure it matches the expected structure and types.
 * @param {unknown} data - The data to validate.
 * @returns {data is Omit<TPomodoroTimerSnapshot, "settings">} - Returns true if the data is a valid TPomodoroTimerSnapshot object excluding settings, otherwise false.
 */
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
    typeof snapshot.lastCounterUpdateTime !== "number" ||
    typeof snapshot.notifiedAlert !== "boolean" ||
    typeof snapshot.notifiedEnd !== "boolean"
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

/**
 * Initializes the pomodoro timer snapshot by retrieving it from client storage.
 * If the snapshot is not valid or does not exist, the default snapshot is returned.
 * @param {TPomodoroSettings} settings - The pomodoro settings to associate with the snapshot.
 * @returns {TPomodoroTimerSnapshot} - The validated or default pomodoro timer snapshot.
 */
export function initSnapshot(
  settings: TPomodoroSettings,
  storageAdapter: IStorageAdapter,
): TPomodoroTimerSnapshot {
  const unsanitizedSnapshot = storageAdapter.get(
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

/**
 * Calculates the duration of the current step in seconds based on the snapshot's state and settings.
 * @param {object} args - Arguments containing the snapshot.
 * @param {TPomodoroTimerSnapshot} args.snapshot - The pomodoro timer snapshot.
 * @returns {number} - The duration of the current step in seconds.
 */
export function getCurrentStepDurationInSeconds(args: {
  snapshot: TPomodoroTimerSnapshot;
}): number {
  return args.snapshot.settings.durations[args.snapshot.state] * 60;
}
