import { IDownloaderAdapter } from "../../../downloader/domain";
import { IBlobExportAdapter } from "../../../export/domain";
import { INotificationsAdapter } from "../../../notifications/domain";
import { IStorageAdapter } from "../../../storage/domain";

export interface IAdapters {
  blobExportAdapter: IBlobExportAdapter;
  downloaderAdapter: IDownloaderAdapter;
  notificationsAdapter: INotificationsAdapter;
  storageAdapter: IStorageAdapter;
}
