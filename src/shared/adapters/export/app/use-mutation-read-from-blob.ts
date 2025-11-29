import { useMutation } from "@tanstack/react-query";

import { MutationKey } from "../../../async-state-management";
import { useAdapters } from "../../core/app";
import { IBlobExportAdapterPayload } from "../domain";

export function useMutationReadFromBlob() {
  const { blobExportAdapter } = useAdapters();

  return useMutation({
    mutationKey: [MutationKey.READ_FROM_BLOB],
    mutationFn: (args: IBlobExportAdapterPayload["ReadFromBlobIn"]) =>
      blobExportAdapter.readFromBlob(args),
  });
}
