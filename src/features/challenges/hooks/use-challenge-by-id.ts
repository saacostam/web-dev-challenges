import { useMemo } from "react";

import { Identifider } from "@/shared/types";
import { CHALLENGES } from "../constants";

export interface UseChallengeByIdProps {
  id?: Identifider;
}

export function useChallengeById({ id }: UseChallengeByIdProps) {
  const challenge = useMemo(
    () => CHALLENGES.find((challenge) => challenge.id === id),
    [id],
  );

  return useMemo(
    () => ({
      challenge,
    }),
    [challenge],
  );
}
