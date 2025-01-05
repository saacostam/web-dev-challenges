import { FC } from "react";
import { TIcon } from "../../icons";

export enum TChallengeDifficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export interface TChallenge {
  id: string;
  name: string;
  description: string;
  component: FC;
  difficulty: TChallengeDifficulty;
  Icon?: TIcon;
}
