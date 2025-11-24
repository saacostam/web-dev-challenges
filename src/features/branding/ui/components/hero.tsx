import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { Logo, Paragraph } from "../../../../shared/components";
import { GithubIcon } from "../../../../shared/icons";
import { useQueryAuthor } from "../../app";

export function Hero() {
  const queryAuthor = useQueryAuthor();

  const githubCtaClassNames = "w-32 h-10 btn btn-sm mt-2 rounded";

  return (
    <HeroLayoutWrapper>
      <Logo className="text-4xl mb-4" iconClassName="size-10" />
      <Paragraph className="mb-0 text-primary-content">
        A personal compendium of small projects and challenges that I’ve built
        to explore and deepen my understanding of React development.
      </Paragraph>
      {queryAuthor.isLoading ? (
        <div className={twMerge(githubCtaClassNames, "skeleton")}></div>
      ) : queryAuthor.isSuccess ? (
        <a
          className={twMerge(githubCtaClassNames, "btn-primary gap-2")}
          href={`https://github.com/${queryAuthor.data.github.username}`}
          target="_blank"
        >
          <GithubIcon /> My Github
        </a>
      ) : null}
    </HeroLayoutWrapper>
  );
}

function HeroLayoutWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className="hero rounded-2xl overflow-clip bg-primary"
      style={{
        backgroundImage: "url(./hero.jpg)",
        backgroundPositionY: "top",
      }}
    >
      <div className="hero-overlay py-32"></div>
      <div className="hero-content text-primary-content">
        <div className="max-w-md">{children}</div>
      </div>
    </div>
  );
}
