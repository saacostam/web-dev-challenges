export enum DomainErrorType {
  BAD_REQUEST = "Bad Request",
  NOT_FOUND = "Not Found",
}

export class DomainError extends Error {
  public readonly devMsg?: string;
  public readonly type: DomainErrorType;

  constructor(type: DomainErrorType, userMsg: string, devMsg?: string) {
    super(userMsg);

    this.type = type;
    this.devMsg = devMsg;
  }
}

export const DomainErrorUtils = {
  getDefaultMessage(e: unknown, defaultMessage: string): string {
    let message = defaultMessage;
    if (e instanceof DomainError) {
      message = e.message;
    }

    return message;
  },
};
