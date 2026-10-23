export enum TRoute {
  HOME = "home",
  CHALLENGE_BY_ID = "challenge by id",
}

export type GetHrefProps =
  | {
      type: TRoute.HOME;
    }
  | {
      type: TRoute.CHALLENGE_BY_ID;
      id: string;
    };
