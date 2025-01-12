import { twMerge } from "tailwind-merge";
import { TPomodoroTimerState } from "../types";

export interface PomodoroTimerStateTabsProps {
  tabs: {
    label: TPomodoroTimerState;
    onClick: (state: TPomodoroTimerState) => void;
  }[];
  activeTab: TPomodoroTimerState;
}

export function PomodoroTimerStateTabs({
  tabs,
  activeTab,
}: PomodoroTimerStateTabsProps) {
  return (
    <div role="tablist" className="tabs grid-cols-3 tabs-boxed bg-transparent">
      {tabs.map(({ label, onClick }) => (
        <button
          role="tab"
          className={twMerge(
            "tab text-neutral",
            label === activeTab && "tab-active",
          )}
          key={label}
          onClick={() => onClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
