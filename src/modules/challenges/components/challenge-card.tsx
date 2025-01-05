import { twMerge } from "tailwind-merge";
import { TRoute, useGetRoutes } from "../../router";
import { TChallenge } from "../types";

export interface TChallengeCardProps {
  challenge: TChallenge;
  className?: string;
}

export function ChallengeCard({ challenge, className }: TChallengeCardProps) {
  const router = useGetRoutes();

  return (
    <div className={twMerge("card bg-base-100 shadow-xl", className)}>
      <div className="card-body">
        <h2 className="card-title">
          {challenge.Icon ? <challenge.Icon className="size-5" /> : null}
          {challenge.name}
        </h2>
        <p>{challenge.description}</p>
        <div className="card-actions justify-end">
          <a
            className="btn btn-primary"
            href={router.getHref({
              type: TRoute.CHALLENGE_BY_ID,
              id: challenge.id,
            })}
          >
            Check it out!
          </a>
        </div>
      </div>
    </div>
  );
}
