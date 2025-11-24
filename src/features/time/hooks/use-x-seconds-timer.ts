import { useEffect } from "react";

export interface UseXSecondsTimerProps {
  onTimerEnd: () => void;
  secondsInterval: number;
}

export function useXSecondsTimer({
  onTimerEnd,
  secondsInterval,
}: UseXSecondsTimerProps) {
  useEffect(() => {
    const interval = setInterval(onTimerEnd, secondsInterval * 1000);
    return () => clearInterval(interval);
  }, [onTimerEnd, secondsInterval]);
}
