import { TimerControls } from "./TimerControls";
import { useMatch } from "../../../hooks/useMatch";

export function Timer() {
  const { match } = useMatch();
  if (!match) return;
  return (
    <div className="mt-10 pb-10 space-y-5 border-b border-black">
      <TimerControls />
    </div>
  );
}
