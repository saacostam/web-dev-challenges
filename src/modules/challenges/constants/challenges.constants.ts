import { ClockIcon } from "../../icons";
import { PomodoroTimer } from "../../pomodoro-timer";
import { DumbFC } from "../components";
import { TChallenge, TChallengeDifficulty } from "../types";

export const CHALLENGES: TChallenge[] = [
  {
    id: "pomodoro-clock",
    name: "Pomodoro Clock",
    description:
      "The Pomodoro Timer enhances productivity by breaking work into 25-minute focused sessions, followed by short 5-minute breaks, with longer breaks after completing several cycles. This challenge aims to replicate this timer using React and Web APIs to create an interactive and functional implementation.",
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
  {
    id: "pomodoro-clock-3",
    name: "Pomodoro Clock",
    description:
      "Pomodoro Timer for Productivity with session and break intervals.",
    Component: DumbFC,
    difficulty: TChallengeDifficulty.EASY,
    Icon: ClockIcon,
  },
  {
    id: "pomodoro-clock-4",
    name: "Pomodoro Clock",
    description:
      "Pomodoro Timer for Productivity with session and break intervals.",
    Component: DumbFC,
    difficulty: TChallengeDifficulty.EASY,
    Icon: ClockIcon,
  },
];
