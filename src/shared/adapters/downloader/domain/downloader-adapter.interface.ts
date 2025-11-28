export interface IDownloaderAdapter {
  download(blob: Blob, fileName: string): void;
}
