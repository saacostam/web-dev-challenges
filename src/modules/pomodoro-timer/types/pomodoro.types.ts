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
  lastTransitionDate: Date;
  settings: TPomodoroSettings;
  state: TPomodoroTimerState;
  tasks: TTask[];
}
