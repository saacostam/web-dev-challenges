import { Hero } from "../../branding";
import { ChallengeCard, CHALLENGES } from "../../challenges";
import {
  Divider,
  Pagination,
  Paragraph,
  SubHeader,
} from "../../core.components";

export function HomeView() {
  return (
    <>
      <Hero />
      <Divider />
      <section>
        <div className="bg-primary text-primary-content h-16 w-full rounded-2xl mb-4 flex items-center justify-center font-bold">
          🚧 FILTER 🚧
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {CHALLENGES.map((challenge) => (
            <ChallengeCard challenge={challenge} />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination />
        </div>
      </section>
      <Divider />
      <Paragraph>
        Each entry in this collection reflects a specific concept, feature, or
        tool within the React ecosystem. This repository serves as a record of
        my continuous learning journey—showcasing my experiments,
        problem-solving, and growing expertise in React.
      </Paragraph>
      <SubHeader>Why React-Challenges?</SubHeader>
      <Paragraph>
        This is not a public challenge list or a formal curriculum. Instead,
        it’s a curated set of personal explorations that have allowed me to dive
        deep into the nuances of React. From state management to component
        architecture, each challenge serves as a stepping stone in my
        development as a React developer.
      </Paragraph>
      <SubHeader>Explore, Learn, and Be Inspired</SubHeader>
      <Paragraph>
        Feel free to browse through the projects and see how I’ve tackled
        different React concepts. While this collection is personal, I hope it
        can serve as a source of inspiration for fellow developers looking to
        learn, experiment, or solve similar problems in their own React
        journeys.
      </Paragraph>
      <Paragraph>
        Whether you're just getting started with React or you're looking for
        unique ways to refine your skills, these challenges are here to offer
        insights and inspiration. Enjoy the journey, and happy coding!
      </Paragraph>
    </>
  );
}
