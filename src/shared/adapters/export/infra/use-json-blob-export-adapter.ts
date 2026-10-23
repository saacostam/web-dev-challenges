import { useCallback, useMemo } from "react";

import { IBlobExportAdapter, IBlobExportAdapterPayload } from "@/shared/adapters/export/domain";

const JSON_MIME = "application/json";

export function useJsonBlobExportAdapter(): IBlobExportAdapter {
  const dumpToBlob = useCallback((object: unknown): Blob => {
    const json = JSON.stringify(object);
    return new Blob([json], { type: JSON_MIME });
  }, []);

  const readFromBlob = useCallback(
    async ({
      blob,
    }: IBlobExportAdapterPayload["ReadFromBlobIn"]): Promise<
      IBlobExportAdapterPayload["ReadFromBlobOut"]
    > => {
      if (!blob.type.includes("json")) {
        return {
          type: "invalid",
          reason: "Invalid file type",
        };
      }

      const text = await blob.text();

      try {
        const parsed = JSON.parse(text);
        return { type: "valid", value: parsed };
      } catch {
        return {
          type: "invalid",
          reason: "Invalid JSON structure",
        };
      }
    },
    [],
  );

  return useMemo(
    () => ({ dumpToBlob, readFromBlob }),
    [dumpToBlob, readFromBlob],
  );
}
