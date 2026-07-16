import { formatTime } from "../../../utils/time";
import { TimerControls } from "./TimerControls";
import { useMatch } from "../../../hooks/useMatch";

export function Timer() {
  const { match } = useMatch();
  if (!match) return;
  return (
    <div className="mx-10 mt-10 space-y-5">
      <h2 className="scroll-m-20 text-5xl font-semibold tracking-tight text-center">
        {formatTime(match.timeLeft)}
      </h2>

      <TimerControls />
    </div>
  );
}
