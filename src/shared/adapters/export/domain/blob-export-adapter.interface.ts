export interface IBlobExportAdapter {
  dumpToBlob(object: unknown): Blob;
  readFromBlob(
    args: IBlobExportAdapterPayload["ReadFromBlobIn"],
  ): Promise<IBlobExportAdapterPayload["ReadFromBlobOut"]>;
}

export interface IBlobExportAdapterPayload {
  ReadFromBlobIn: {
    blob: Blob;
  };

  ReadFromBlobOut:
    | {
        type: "valid";
        value: unknown;
      }
    | {
        type: "invalid";
        reason: string;
      };
}
