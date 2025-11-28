import { IDownloaderAdapter } from "../../../downloader/domain";
import { IBlobExportAdapter } from "../../../export/domain";
import { IStorageAdapter } from "../../../storage/domain";

export interface IAdapters {
  blobExportAdapter: IBlobExportAdapter;
  downloaderAdapter: IDownloaderAdapter;
  storageAdapter: IStorageAdapter;
}
