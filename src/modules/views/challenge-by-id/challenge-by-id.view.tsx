import { useParams } from "react-router-dom";
import { TChallenge, useChallengeById } from "../../challenges";
import { Error404 } from "../../error-handling";
import { Divider, Header, Paragraph, Pill } from "../../core.components";

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
  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <Header className="mb-2 inline-flex items-center gap-2">
          {challenge.Icon && <challenge.Icon className="size-8" />}
          {challenge.name}
        </Header>
        <Pill>Difficulty: {challenge.difficulty}</Pill>
      </div>
      <challenge.Component />
      <Divider />
      <Paragraph>{challenge.description}</Paragraph>
    </>
  );
}
