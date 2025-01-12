import { SetStateAction } from "react";
import { TTask } from "./task.types";

export enum TPomodoroTimerState {
  WORK = "Work",
  SHORT_BREAK = "Short Break",
  LONG_BREAK = "Long Break",
}

export interface TPomodoroSettings {
  durations: Record<TPomodoroTimerState, number>;
  longBreakInterval: number;
  volume: number;
  notification?: {
    secTimeBefore: number;
  };
}

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

export type TPomodoroSettingsReducer = (
  settings: TPomodoroSettings,
  action: TPomodoroSettingsReducerAction,
) => TPomodoroSettings;

export interface TPomodoroTimerSnapshot {
  breakCount: number;
  isPaused: boolean;
  secondsCounter: number;
  settings: TPomodoroSettings;
  state: TPomodoroTimerState;
  tasks: TTask[];
  lastCounterUpdateTime: number;
}

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
      type: "update-counter";
    }
  | {
      type: "settings";
      payload: {
        settings: TPomodoroSettings;
      };
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
    };

export type TPomodoroTimerSnapshotReducer = (
  snapshot: TPomodoroTimerSnapshot,
  action: TPomodoroTimerSnapshotAction,
) => TPomodoroTimerSnapshot;
