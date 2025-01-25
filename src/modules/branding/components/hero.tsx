import { PropsWithChildren } from "react";
import { Logo, Paragraph } from "../../core.components";

export function Hero() {
  return (
    <HeroLayoutWrapper>
      <Logo className="text-4xl mb-4" iconClassName="size-10" />
      <Paragraph className="mb-0 text-primary-content">
        A personal compendium of small projects and challenges that I’ve built
        to explore and deepen my understanding of React development.
      </Paragraph>
    </HeroLayoutWrapper>
  );
}

function HeroLayoutWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className="hero rounded-2xl overflow-clip bg-primary"
      style={{
        backgroundImage: "url(./hero.jpg)",
      }}
    >
      <div className="hero-overlay py-32"></div>
      <div className="hero-content text-primary-content">
        <div className="max-w-md">{children}</div>
      </div>
    </div>
  );
}
