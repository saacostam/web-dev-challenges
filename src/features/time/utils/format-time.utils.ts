export const FormatTimeUtils = {
  destructureFromSeconds: (_totalSeconds: number) => {
    const totalSeconds = Math.max(0, _totalSeconds);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return { hours, minutes, seconds };
  },
};
