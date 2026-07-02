import { useEffect, useState } from "react";

export function useTimer(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => setIsRunning(true);

  const pause = () => setIsRunning(false);

  const toggle = () => setIsRunning((prev) => !prev);

  const reset = () => {
    setTimeLeft(initialSeconds);
    setIsRunning(false);
  };

  return {
    timeLeft,
    isRunning,
    toggle,
    start,
    pause,
    reset,
  };
}
