import { TPomodoroTimerSnapshot, TPomodoroTimerState } from "../types";

export const DEFAULT_SNAPSHOT: Omit<TPomodoroTimerSnapshot, "settings"> = {
  breakCount: 0,
  isPaused: true,
  secondsCounter: 0,
  state: TPomodoroTimerState.WORK,
  tasks: [],
};

export const ALL_POMODORO_TIMER_STATES = Object.values(TPomodoroTimerState);
