import { TPomodoroTimerSnapshot, TPomodoroTimerState } from "../types";

export const DEFAULT_SNAPSHOT: Omit<TPomodoroTimerSnapshot, "settings"> = {
  breakCount: 0,
  isPaused: true,
  secondsCounter: 0,
  state: TPomodoroTimerState.WORK,
  tasks: [
    {
      id: "1",
      name: "Completed Task",
      checked: true,
    },
    {
      id: "2",
      name: "Uncompleted Task",
      checked: false,
    },
  ],
  lastCounterUpdateTime: Date.now(),
  notifiedAlert: false,
  notifiedEnd: false,
};

export const ALL_POMODORO_TIMER_STATES = Object.values(TPomodoroTimerState);
