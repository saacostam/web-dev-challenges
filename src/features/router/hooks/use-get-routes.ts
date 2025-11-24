import { useCallback, useMemo } from "react";

import { GetHrefProps, TRoute } from "../types";

export function useGetRoutes() {
  const getHref = useCallback((props: GetHrefProps): string => {
    switch (props.type) {
      case TRoute.HOME:
        return "/";
      case TRoute.CHALLENGE_BY_ID:
        return `/${props.id}`;
    }
    return "#";
  }, []);

  return useMemo(
    () => ({
      getHref,
    }),
    [getHref],
  );
}
