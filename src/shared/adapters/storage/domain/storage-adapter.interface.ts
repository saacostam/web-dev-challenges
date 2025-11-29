export enum ClientStorageKeys {
  PIXEL_ART_EDITOR_SNAPSHOT = "Pixel Art Editor SnapShot",
  POMODORO_SNAPSHOT = "Pomodoro SnapShot",
  POMODORO_SETTINGS = "Pomodoro Settings",
}

export interface IStorageAdapter {
  unsafeGet<T>(key: ClientStorageKeys): T | null;
  get(key: ClientStorageKeys): unknown | null;
  set(key: ClientStorageKeys, obj: unknown): void;
  removeItem(key: ClientStorageKeys): void;
}
