import { formatTime } from "../../utils/time";
import { useTimer } from "../../hooks/useTimer";
import { TimerControls } from "./TimerControls";

interface Props {
  seconds: number;
}

export function Timer({ seconds }: Props) {
  const { timeLeft, start, pause, reset } = useTimer(seconds);

  return (
    <div>
      <h1>{formatTime(timeLeft)}</h1>

      <TimerControls start={start} pause={pause} reset={reset} />
    </div>
  );
}
