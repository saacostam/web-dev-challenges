import { twMerge } from "tailwind-merge";

import { TPomodoroTimerState } from "../types";

/**
 * Props for the PomodoroTimerStateTabs component.
 * @interface PomodoroTimerStateTabsProps
 * @property {Array<{ label: TPomodoroTimerState, onClick: (state: TPomodoroTimerState) => void }>} tabs - The list of tabs with their labels and associated click handlers.
 * @property {TPomodoroTimerState} activeTab - The current active tab's state value.
 */
export interface PomodoroTimerStateTabsProps {
  tabs: {
    label: TPomodoroTimerState;
    onClick: (state: TPomodoroTimerState) => void;
  }[];
  activeTab: TPomodoroTimerState;
}

/**
 * A component that renders a set of tabs for the Pomodoro timer states.
 * @component
 */
export function PomodoroTimerStateTabs({
  tabs,
  activeTab,
}: PomodoroTimerStateTabsProps) {
  return (
    <div
      role="tablist"
      className="tabs tabs-sm sm:tabs-md grid-cols-3 tabs-boxed bg-transparent"
    >
      {tabs.map(({ label, onClick }) => (
        <button
          role="tab"
          className={twMerge("tab", label === activeTab && "tab-active")}
          key={label}
          onClick={() => onClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
