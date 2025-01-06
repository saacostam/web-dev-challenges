import { TPomodoroTimerState } from "../types";

export const DEFAULT_SETTINGS = {
  durations: {
    [TPomodoroTimerState.WORK]: 25,
    [TPomodoroTimerState.SHORT_BREAK]: 5,
    [TPomodoroTimerState.LONG_BREAK]: 15,
  },
  longBreakInterval: 4,
  volume: 8,
  notification: {
    secTimeBefore: 30 * 1,
  },
};

export const SETTINGS_CONFIG = {
  DURATIONS: {
    MIN: 1,
    MAX: 24 * 60,
  },
  LONG_BREAK_INTERVAL: {
    MIN: 1,
    MAX: 32,
  },
  VOLUME: {
    MIN: 1,
    MAX: 10,
  },
  NOTIFICATION: {
    SEC_TIME_BEFORE: {
      MIN: 1,
      MAX: 60,
    },
  },
};
