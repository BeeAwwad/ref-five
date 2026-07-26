import { useState, useCallback } from "react";

export function useSound(soundPath: string) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;

    const audio = new Audio(soundPath);
    audio.play().catch((err) => {
      console.warn("Audio playback blocked or failed:", err);
    });
  }, [soundPath, soundEnabled]);

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  return { playSound, soundEnabled, toggleSound };
}
