import { twMerge } from "tailwind-merge";
import { FormatTimeUtils } from "../../time";

export interface PomodoroTimerCounterProps {
  className?: string;
  secondsLeft: number;
}

export function PomodoroTimerCounter({
  className,
  secondsLeft,
}: PomodoroTimerCounterProps) {
  const { hours, minutes, seconds } =
    FormatTimeUtils.destructureFromSeconds(secondsLeft);

  return (
    <div className={twMerge("text-center", className)}>
      <span className="countdown font-mono text-5xl sm:text-7xl">
        {/* @ts-expect-error: This a custom property for daisyUi */}
        <span style={{ "--value": hours }}></span>:
        {/* @ts-expect-error: This a custom property for daisyUi */}
        <span style={{ "--value": minutes }}></span>:
        {/* @ts-expect-error: This a custom property for daisyUi */}
        <span style={{ "--value": seconds }}></span>
      </span>
    </div>
  );
}
