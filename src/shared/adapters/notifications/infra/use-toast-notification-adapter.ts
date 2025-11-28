import { useCallback, useMemo } from "react";

import toast from "react-hot-toast";

import { INotificationsAdapter } from "../domain";

export function useToastNotificationsAdapter(): INotificationsAdapter {
  const logSuccess: INotificationsAdapter["logSuccess"] = useCallback(
    (message, id) => {
      toast.success(message, {
        id,
      });
    },
    [],
  );

  return useMemo(
    () => ({
      logSuccess,
    }),
    [logSuccess],
  );
}
