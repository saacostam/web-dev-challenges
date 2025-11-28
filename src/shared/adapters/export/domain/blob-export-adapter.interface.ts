export interface IBlobExportAdapter {
  dumpToBlob(object: unknown): Blob;
  readFromBlob(blob: Blob): Promise<IBlobExportAdapterPayload["ReadFromBlob"]>;
}

export interface IBlobExportAdapterPayload {
  ReadFromBlob:
    | {
        type: "valid";
        value: unknown;
      }
    | {
        type: "invalid";
        reason: string;
      };
}
