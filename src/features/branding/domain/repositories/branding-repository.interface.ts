export interface IBrandingRepository {
  getAuthor(): Promise<IBrandingRepositoryPayload["GetAuthorOut"]>;
}

export interface IBrandingRepositoryPayload {
  GetAuthorOut: {
    github: {
      username: string;
    }
  }
}
