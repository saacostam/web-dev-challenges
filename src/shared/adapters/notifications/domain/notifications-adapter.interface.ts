export interface INotificationsAdapter {
  logSuccess(message: string, id: string): void;
  logError(message: string, id: string): void;
}
