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
      <Paragraph className="mb-0">
        A personal compendium of small projects and challenges that I’ve built
        to explore and deepen my understanding of web development.
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
    <div className="rounded-2xl overflow-clip border-primary border p-8">
      {children}
    </div>
  );
}
