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
  Component: FC;
  difficulty: TChallengeDifficulty;
  inProgress?: boolean;
  Icon?: TIcon;
}
