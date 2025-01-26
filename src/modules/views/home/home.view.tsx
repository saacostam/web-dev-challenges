import { Hero } from "../../branding";
import { ChallengeCard, CHALLENGES } from "../../challenges";
import {
  Divider,
  // Pagination,
  Paragraph,
  Select,
  SubHeader,
} from "../../core.components";
import { SearchBar } from "../../filters";

export function HomeView() {
  return (
    <>
      <Hero />
      <Divider />
      <section>
        <div className="py-4 flex flex-wrap items-center gap-4">
          <SearchBar />
          <Select description="Difficulty" className="w-full sm:w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {CHALLENGES.map((challenge) => (
            <ChallengeCard challenge={challenge} key={challenge.id} />
          ))}
        </div>
        {/* <div className="flex justify-center">
          <Pagination />
        </div> */}
      </section>
      <Divider />
      <Paragraph>
        Each entry in this collection reflects a specific concept, feature, or
        tool within the React ecosystem. This repository captures my ongoing
        learning journey, showcasing experiments, problem-solving approaches,
        and the growth of my React expertise.
      </Paragraph>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <SubHeader>Why React-Challenges?</SubHeader>
          <Paragraph>
            This isn't a public challenge list or a formal curriculum. Instead,
            it's a curated collection of personal explorations that have helped
            me dive deep into the nuances of React. From state management to
            component architecture, each challenge represents a stepping stone
            in my development as a React developer.
          </Paragraph>
        </div>
        <div>
          <SubHeader>Sharing My React Journey</SubHeader>
          <Paragraph>
            Feel free to explore through the projects and see how I&apos;ve
            tackled different React concepts. While this collection is personal,
            I hope it can serve as a source of inspiration for fellow developers
            looking to learn, experiment, or solve similar problems in their own
            React journeys.
          </Paragraph>
        </div>
      </section>
    </>
  );
}
