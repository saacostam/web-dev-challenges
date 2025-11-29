import { useCallback, useMemo } from "react";

import toast from "react-hot-toast";

import { INotificationsAdapter } from "../domain";

export function useToastNotificationsAdapter(): INotificationsAdapter {
  const logError: INotificationsAdapter["logError"] = useCallback(
    (message, id) => {
      toast.error(message, {
        id,
      });
    },
    [],
  );

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
      logError,
      logSuccess,
    }),
    [logError, logSuccess],
  );
}
