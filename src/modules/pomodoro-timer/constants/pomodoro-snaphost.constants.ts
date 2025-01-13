import { TPomodoroTimerSnapshot, TPomodoroTimerState } from "../types";

/**
 * Default Pomodoro timer snapshot with initial values.
 * This snapshot is used as a starting point when no saved state exists.
 * @type {Omit<TPomodoroTimerSnapshot, "settings">}
 */
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

/**
 * All possible states for the Pomodoro timer.
 * These states represent the different phases of the Pomodoro timer, including work and break intervals.
 * @type {TPomodoroTimerState[]}
 */
export const ALL_POMODORO_TIMER_STATES: TPomodoroTimerState[] =
  Object.values(TPomodoroTimerState);
