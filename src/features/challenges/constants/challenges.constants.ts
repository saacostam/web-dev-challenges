import { ClockIcon, CubeIcon } from "../../icons";
import { PixelArtEditor } from "../../pixel-art-editor";
import { PomodoroTimer } from "../../pomodoro-timer";
import { TChallenge, TChallengeDifficulty } from "../types";

export const CHALLENGES: TChallenge[] = [
  {
    id: "pixel-art-editor",
    name: "Pixel Art Editor",
    description:
      "Pixel Art Editor with core features commonly found in similar applications.",
    Component: PixelArtEditor,
    difficulty: TChallengeDifficulty.HARD,
    inProgress: true,
    Icon: CubeIcon,
  },
  {
    id: "pomodoro-clock",
    name: "Pomodoro Clock",
    description:
      "The Pomodoro Timer boosts productivity by dividing work into 25-minute sessions with 5-minute breaks and longer breaks after multiple cycles.",
    Component: PomodoroTimer,
    difficulty: TChallengeDifficulty.MEDIUM,
    Icon: ClockIcon,
  },
];
