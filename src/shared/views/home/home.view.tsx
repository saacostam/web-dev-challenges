import { Hero } from "../../../features/branding/ui";
import { CHALLENGES, ChallengeCard } from "../../../features/challenges";
import {
  Divider,
  // Pagination,
  // Select,
} from "../../../shared/components";

// import { SearchBar } from "../../filters";

export function HomeView() {
  return (
    <>
      <Hero />
      <Divider />
      <section>
        {/* <div className="py-4 flex flex-wrap items-center gap-4">
          <SearchBar />
          <Select description="Difficulty" className="w-full sm:w-64" />
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {CHALLENGES.map((challenge) => (
            <ChallengeCard challenge={challenge} key={challenge.id} />
          ))}
        </div>
        {/* <div className="flex justify-center">
          <Pagination />
        </div> */}
      </section>
    </>
  );
}
