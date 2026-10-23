import { useMutation } from "@tanstack/react-query";

import { MutationKey } from "@/shared/async-state-management";
import { useAdapters } from "@/shared/adapters/core/app";
import { IBlobExportAdapterPayload } from "@/shared/adapters/export/domain";

export function useMutationReadFromBlob() {
  const { blobExportAdapter } = useAdapters();

  return useMutation({
    mutationKey: [MutationKey.READ_FROM_BLOB],
    mutationFn: (args: IBlobExportAdapterPayload["ReadFromBlobIn"]) =>
      blobExportAdapter.readFromBlob(args),
  });
}
