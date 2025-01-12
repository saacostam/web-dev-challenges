import { TPomodoroTimerSnapshot, TPomodoroTimerState } from "../types";

export const DEFAULT_SNAPSHOT: Omit<TPomodoroTimerSnapshot, "settings"> = {
  breakCount: 0,
  isPaused: true,
  secondsCounter: 0,
  state: TPomodoroTimerState.WORK,
  tasks: [
    {
      name: "Task 1",
      checked: true,
    },
    {
      name: "Task 2",
      checked: false,
    },
    {
      name: "Task 3",
      checked: false,
    },
  ],
  lastCounterUpdateTime: Date.now(),
};

export const ALL_POMODORO_TIMER_STATES = Object.values(TPomodoroTimerState);
