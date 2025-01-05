import { ClockIcon } from "../../icons";
import { getUuid } from "../../string.utils";
import { DumbFC } from "../components";
import { TChallenge, TChallengeDifficulty } from "../types";

export const CHALLENGES: TChallenge[] = [
  {
    id: getUuid(),
    name: "Pomodoro Clock",
    description:
      "Pomodoro Timer for Productivity with session and break intervals.",
    Component: DumbFC,
    difficulty: TChallengeDifficulty.EASY,
    Icon: ClockIcon,
  },
  {
    id: getUuid(),
    name: "Pomodoro Clock",
    description:
      "Pomodoro Timer for Productivity with session and break intervals.",
    Component: DumbFC,
    difficulty: TChallengeDifficulty.EASY,
    Icon: ClockIcon,
  },
  {
    id: getUuid(),
    name: "Pomodoro Clock",
    description:
      "Pomodoro Timer for Productivity with session and break intervals.",
    Component: DumbFC,
    difficulty: TChallengeDifficulty.EASY,
    Icon: ClockIcon,
  },
  {
    id: getUuid(),
    name: "Pomodoro Clock",
    description:
      "Pomodoro Timer for Productivity with session and break intervals.",
    Component: DumbFC,
    difficulty: TChallengeDifficulty.EASY,
    Icon: ClockIcon,
  },
];
