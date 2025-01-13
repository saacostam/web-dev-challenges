import { SetStateAction } from "react";
import { TTask } from "./task.types";

/**
 * Enum representing the states of the Pomodoro timer.
 * @enum {string}
 */
export enum TPomodoroTimerState {
  WORK = "Work",
  SHORT_BREAK = "Short Break",
  LONG_BREAK = "Long Break",
}

/**
 * Interface representing the settings for the Pomodoro timer.
 * @typedef {Object} TPomodoroSettings
 * @property {Record<TPomodoroTimerState, number>} durations - The durations per each timer state.
 * @property {number} longBreakInterval - The number of breaks required before a long break. If 4, then the 4th, 8th, etc. will be long breaks.
 * @property {number} volume - The volume level for notifications.
 * @property {Object} [notification] - Optional notification settings.
 * @property {number} [notification.secTimeBefore] - Seconds before the timer ends to send a notification.
 */
export interface TPomodoroSettings {
  durations: Record<TPomodoroTimerState, number>;
  longBreakInterval: number;
  volume: number;
  notification?: {
    secTimeBefore: number;
  };
}

/**
 * Type representing actions for the Pomodoro settings reducer.
 */
export type TPomodoroSettingsReducerAction =
  | {
      type: "durations";
      payload: {
        state: TPomodoroTimerState;
        duration: number;
      };
    }
  | {
      type: "long-break-interval";
      payload: {
        interval: number;
      };
    }
  | {
      type: "volume";
      payload: {
        volume: number;
      };
    }
  | {
      type: "notification";
      payload:
        | {
            exists: false;
          }
        | {
            exists: true;
            secTimeBefore: number;
          };
    }
  | {
      type: "reset-to-default-settings";
    }
  | {
      type: "set";
      payload: {
        settings: TPomodoroSettings;
      };
    };

/**
 * Function type for the Pomodoro settings reducer.
 */
export type TPomodoroSettingsReducer = (
  settings: TPomodoroSettings,
  action: TPomodoroSettingsReducerAction,
) => TPomodoroSettings;

/**
 * Interface representing the snapshot of the Pomodoro timer state.
 * @typedef {Object} TPomodoroTimerSnapshot
 * @property {number} breakCount - The amount of breaks completed.
 * @property {boolean} isPaused - Whether the timer is paused.
 * @property {number} lastCounterUpdateTime - Timestamp of the last time the counter was updated.
 * @property {boolean} notifiedAlert - Whether a before-end-of-stage alert notification has been sent.
 * @property {boolean} notifiedEnd - Whether an end-of-stage notification has been sent.
 * @property {number} secondsCounter - The amount of seconds that have elapsed since the start of the current stage.
 * @property {TPomodoroSettings} settings - The current Pomodoro settings.
 * @property {TPomodoroTimerState} state - The current state (or stage) of the timer.
 * @property {TTask[]} tasks - List of tasks associated with the Pomodoro session.
 */
export interface TPomodoroTimerSnapshot {
  breakCount: number;
  isPaused: boolean;
  lastCounterUpdateTime: number;
  notifiedAlert: boolean;
  notifiedEnd: boolean;
  secondsCounter: number;
  settings: TPomodoroSettings;
  state: TPomodoroTimerState;
  tasks: TTask[];
}

/**
 * Type representing actions for the Pomodoro timer snapshot reducer.
 */
export type TPomodoroTimerSnapshotAction =
  | {
      type: "break-count";
      payload: {
        breakCount: number;
      };
    }
  | {
      type: "is-paused";
      payload: {
        isPaused: boolean;
      };
    }
  | {
      type: "notified-alert";
    }
  | {
      type: "notified-end";
    }
  | {
      type: "settings";
      payload: {
        settings: TPomodoroSettings;
      };
    }
  | {
      type: "skip";
    }
  | {
      type: "state";
      payload: {
        state: TPomodoroTimerState;
      };
    }
  | {
      type: "tasks";
      payload: {
        tasks: SetStateAction<TTask[]>;
      };
    }
  | {
      type: "update-counter";
    };

/**
 * Function type for the Pomodoro timer snapshot reducer.
 * @typedef {Function} TPomodoroTimerSnapshotReducer
 * @param {TPomodoroTimerSnapshot} snapshot - Current snapshot state.
 * @param {TPomodoroTimerSnapshotAction} action - Action to apply to the state.
 * @returns {TPomodoroTimerSnapshot} Updated snapshot state.
 */
export type TPomodoroTimerSnapshotReducer = (
  snapshot: TPomodoroTimerSnapshot,
  action: TPomodoroTimerSnapshotAction,
) => TPomodoroTimerSnapshot;
