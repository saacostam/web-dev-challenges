import { twMerge } from "tailwind-merge";
import { TRoute, useGetRoutes } from "../../router";
import { TChallenge } from "../types";
import { Link } from "react-router-dom";
import { Pill } from "../../core.components";
import { InProgressPill } from "./in-progress-pill";

export interface TChallengeCardProps {
  challenge: TChallenge;
  className?: string;
}

export function ChallengeCard({ challenge, className }: TChallengeCardProps) {
  const router = useGetRoutes();

  return (
    <div
      className={twMerge(
        "card bg-base-100 shadow-xl text-base-content",
        className,
      )}
    >
      <div className="card-body">
        <h2 className="card-title">
          {challenge.Icon ? <challenge.Icon className="size-6" /> : null}
          {challenge.name}
          <Pill className="p-2">{challenge.difficulty}</Pill>
          {challenge.inProgress && <InProgressPill className="p-2" />}
        </h2>
        <p>{challenge.description}</p>
        <div className="card-actions justify-end">
          <Link
            className="btn btn-primary"
            to={router.getHref({
              type: TRoute.CHALLENGE_BY_ID,
              id: challenge.id,
            })}
          >
            Check it out!
          </Link>
        </div>
      </div>
    </div>
  );
}
