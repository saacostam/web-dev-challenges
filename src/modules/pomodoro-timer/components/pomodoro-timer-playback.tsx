import { ForwardIcon } from "../../icons";

export interface PomodoroTimerPlaybackProps {
  isPaused: boolean;
  onSkip: () => void;
  onTogglePause: () => void;
}

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
