import { twMerge } from "tailwind-merge";

import { FormatTimeUtils } from "@/features/time";

/**
 * Props for the PomodoroTimerCounter component.
 * @interface PomodoroTimerCounterProps
 * @property {string} [className] - Optional additional class names to style the component.
 * @property {number} secondsLeft - The number of seconds remaining on the Pomodoro timer.
 */
export interface PomodoroTimerCounterProps {
  className?: string;
  secondsLeft: number;
}

/**
 * A component that displays the remaining time in a Pomodoro timer, formatted as hours, minutes, and seconds.
 * @component
 */
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
