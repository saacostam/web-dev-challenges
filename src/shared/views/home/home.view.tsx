import { Hero } from "@/features/branding/ui";
import { CHALLENGES, ChallengeCard } from "@/features/challenges";
import {
  Divider,
} from "@/shared/components";

export function HomeView() {
  return (
    <>
      <Hero />
      <Divider />
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {CHALLENGES.map((challenge) => (
            <ChallengeCard challenge={challenge} key={challenge.id} />
          ))}
        </div>
      </section>
    </>
  );
}
