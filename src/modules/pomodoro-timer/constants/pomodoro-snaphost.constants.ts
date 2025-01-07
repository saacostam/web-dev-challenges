import { TPomodoroTimerSnapshot, TPomodoroTimerState } from "../types";

export const DEFAULT_SNAPSHOT: Omit<TPomodoroTimerSnapshot, "settings"> = {
  breakCount: 0,
  isPaused: true,
  secondCounter: 0,
  state: TPomodoroTimerState.WORK,
  tasks: [],
};
