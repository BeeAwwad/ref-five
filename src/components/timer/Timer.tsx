import { formatTime } from "../../../utils/time";
import { useTimer } from "../../../hooks/useTimer";
import { TimerControls } from "./TimerControls";

interface Props {
  seconds: number;
}

export function Timer({ seconds }: Props) {
  const { timeLeft, isRunning, toggle, reset } = useTimer(seconds);

  return (
    <div className="mx-10 mt-10 space-y-5">
      <h2 className="scroll-m-20 text-5xl font-semibold tracking-tight text-center">
        {formatTime(timeLeft)}
      </h2>

      <TimerControls isRunning={isRunning} toggle={toggle} reset={reset} />
    </div>
  );
}
