import { ClockIcon } from "../../icons";
import { PomodoroTimer } from "../../pomodoro-timer";
import { DumbFC } from "../components";
import { TChallenge, TChallengeDifficulty } from "../types";

export const CHALLENGES: TChallenge[] = [
  {
    id: "pomodoro-clock",
    name: "Pomodoro Clock",
    description:
      "The Pomodoro Timer boosts productivity by dividing work into 25-minute sessions with 5-minute breaks and longer breaks after multiple cycles.",
    Component: PomodoroTimer,
    difficulty: TChallengeDifficulty.MEDIUM,
    Icon: ClockIcon,
  },
  {
    id: "pomodoro-clock-2",
    name: "Pomodoro Clock",
    description:
      "Pomodoro Timer for Productivity with session and break intervals.",
    Component: DumbFC,
    difficulty: TChallengeDifficulty.EASY,
    Icon: ClockIcon,
  },
];
