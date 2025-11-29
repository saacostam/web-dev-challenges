import { useParams } from "react-router-dom";

import {
  InProgressPill,
  TChallenge,
  useChallengeById,
} from "../../../features/challenges";
import { Error404 } from "../../../features/error-handling/ui";
import {
  Divider,
  Header,
  Paragraph,
  Pill,
  SubHeader,
} from "../../../shared/components";

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
        <Header className="mb-4 inline-flex items-center gap-2">
          {challenge.Icon && <challenge.Icon className="size-8" />}
          {challenge.name}
        </Header>
        <div className="flex gap-2">
          <Pill>Difficulty: {challenge.difficulty}</Pill>
          {challenge.inProgress && <InProgressPill />}
        </div>
      </div>
      <challenge.Component />
      <Divider />
      <SubHeader>About this challenge</SubHeader>
      <Paragraph>{challenge.description}</Paragraph>
    </>
  );
}
