import { useQuery } from "@tanstack/react-query";

import { BASE_URL, QueryKey } from "../../api";

export interface GetAuthorResponse {
  github: {
    username: string;
  };
}

export function useGetAuthor() {
  return useQuery<GetAuthorResponse>({
    queryKey: [QueryKey.AUTHOR],
    queryFn: async () => {
      const response = await fetch(
        new URL("static-data/me/get.json", BASE_URL),
      );
      return response.json();
    },
  });
}
