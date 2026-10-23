import { IDownloaderAdapter } from "@/shared/adapters/downloader/domain";
import { IBlobExportAdapter } from "@/shared/adapters/export/domain";
import { INotificationsAdapter } from "@/shared/adapters/notifications/domain";
import { IStorageAdapter } from "@/shared/adapters/storage/domain";

export interface IAdapters {
  blobExportAdapter: IBlobExportAdapter;
  downloaderAdapter: IDownloaderAdapter;
  notificationsAdapter: INotificationsAdapter;
  storageAdapter: IStorageAdapter;
}
