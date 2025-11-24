import { ForwardIcon } from "../../../shared/icons";

/**
 * Props for the PomodoroTimerPlayback component.
 * @interface PomodoroTimerPlaybackProps
 * @property {boolean} isPaused - A boolean flag indicating whether the timer is paused.
 * @property {() => void} onSkip - A function that is called when the skip button is clicked.
 * @property {() => void} onTogglePause - A function that is called to toggle the pause/play state of the timer.
 */
export interface PomodoroTimerPlaybackProps {
  isPaused: boolean;
  onSkip: () => void;
  onTogglePause: () => void;
}

/**
 * A component that handles playback control for the Pomodoro timer.
 * @component
 */
export function PomodoroTimerPlayback({
  isPaused,
  onSkip,
  onTogglePause,
}: PomodoroTimerPlaybackProps) {
  return (
    <div className="grid grid-cols-3 items-center">
      <button className="btn btn-primary col-start-2" onClick={onTogglePause}>
        {isPaused ? "Start" : "Pause"}
      </button>
      {!isPaused && (
        <button
          className="btn btn-ghost col-start-3 justify-self-end"
          onClick={onSkip}
        >
          <ForwardIcon />
        </button>
      )}
    </div>
  );
}
