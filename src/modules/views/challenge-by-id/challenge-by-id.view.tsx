import { useParams } from "react-router-dom";
import { TChallenge, useChallengeById } from "../../challenges";
import { Error404 } from "../../error-handling";

export function ChallengeByIdView() {
  const params = useParams();
  const { challenge } = useChallengeById({
    id: params["id"],
  });

  if (challenge === undefined) return <Error404 />;

  return <Challenge challenge={challenge} />;
}

interface ChallengeProps {
  challenge: TChallenge;
}

function Challenge({ challenge }: ChallengeProps) {
  return <>{JSON.stringify(challenge)}</>;
}
