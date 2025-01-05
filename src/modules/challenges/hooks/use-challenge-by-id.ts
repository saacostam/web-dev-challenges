import { useMemo } from "react";
import { CHALLENGES } from "../constants";
import { Identifider } from "../../core.types";

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
