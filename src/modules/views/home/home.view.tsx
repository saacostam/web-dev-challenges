import { ChallengeCard, CHALLENGES } from "../../challenges";
import { Header, Paragraph, SubHeader } from "../../core.components";

export function HomeView() {
  return (
    <>
      <Header className="text-center">React Challenges</Header>
      <Paragraph>
        Welcome to React-Challenges, a personal compendium of small projects and
        challenges that I’ve built to explore and deepen my understanding of
        React development.
      </Paragraph>
      <section className="flex mb-8">
        {CHALLENGES.map((challenge) => (
          <ChallengeCard challenge={challenge} />
        ))}
      </section>
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
