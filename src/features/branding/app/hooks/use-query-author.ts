import { useQuery } from "@tanstack/react-query";

import { QueryKey } from "@/shared/async-state-management";
import { useRepositories } from "@/shared/repositories/app";

export function useQueryAuthor() {
  const { brandingRepository } = useRepositories();

  return useQuery({
    queryKey: [QueryKey.AUTHOR],
    queryFn: () => brandingRepository.getAuthor(),
  });
}
