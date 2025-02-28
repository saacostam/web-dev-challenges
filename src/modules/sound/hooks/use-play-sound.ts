import { useCallback, useEffect, useMemo, useRef } from "react";

export interface UseSoundPlayerProps {
  audioSrc: string;
  volume: number;
}

export function useSoundPlayer({ audioSrc, volume }: UseSoundPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.load();
  }

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(volume, 1));
    }
  }, [volume]);

  return useMemo(
    () => ({
      play,
    }),
    [play],
  );
}

export default useSoundPlayer;
