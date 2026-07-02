interface Props {
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function TimerControls({ start, pause, reset }: Props) {
  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
