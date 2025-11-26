import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { type TChallenge, TChallengeDifficulty } from "../types";
import { ChallengeCard } from "./challenge-card";

function DummyIcon() {
  return <svg data-testid="dummy-icon" />;
}

describe("ChallengeCard", () => {
  it("renders the challenge content", () => {
    const challenge: TChallenge = {
      id: "abc123",
      name: "Binary Trees",
      description: "Learn recursive tree traversal.",
      difficulty: TChallengeDifficulty.HARD,
      inProgress: true,
      Icon: DummyIcon,
      Component: () => null,
    };

    render(
      <MemoryRouter>
        <ChallengeCard challenge={challenge} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Binary Trees")).toBeDefined();
    expect(screen.getByText("Learn recursive tree traversal.")).toBeDefined();
    expect(screen.getByText(TChallengeDifficulty.HARD)).toBeDefined();
    expect(screen.getByText("In progress")).toBeDefined();
    expect(screen.getByTestId("dummy-icon")).toBeDefined();

    const link = screen.getByRole("link", { name: "Check it out!" });
    expect(link).toBeDefined();
  });

  it("does not render icon or in-progress pill when missing", () => {
    const challenge: TChallenge = {
      id: "xyz789",
      name: "Sorting Algorithms",
      description: "Master quicksort and mergesort.",
      difficulty: TChallengeDifficulty.EASY,
      inProgress: false,
      Icon: undefined,
      Component: () => null,
    };

    render(
      <MemoryRouter>
        <ChallengeCard challenge={challenge} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Sorting Algorithms")).toBeDefined();
    expect(screen.getByText("Master quicksort and mergesort.")).toBeDefined();
    expect(screen.getByText(TChallengeDifficulty.EASY)).toBeDefined();

    expect(screen.queryByTestId("dummy-icon")).toBeNull();
    expect(screen.queryByText("In progress")).toBeNull();
  });
});
