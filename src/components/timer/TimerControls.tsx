import { useMatch } from "../../../hooks/useMatch";
import { Button } from "../ui/button";
import { formatTime } from "../../../utils/time";

export function TimerControls() {
  const {
    pauseTimer,
    resetTimer,
    startTimer,
    advanceHalf,
    decrementOvers,
    match,
  } = useMatch();

  if (!match) return null;

  let actionText = "Start";
  let handleAction = startTimer;

  const neoBrutalBase =
    "border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all";

  let buttonStyle = `bg-primary-400 text-white hover:bg-primary-200 ${neoBrutalBase}`;

  if (match.status === "running") {
    actionText = "Pause";
    handleAction = pauseTimer;
    buttonStyle = `bg-primary-200 text-white hover:bg-primary-300 ${neoBrutalBase}`;
  } else if (match.status === "halftime") {
    actionText = "Start 2nd Half";
    handleAction = advanceHalf;
    buttonStyle = `bg-primary-200 text-white hover:bg-primary-300 ${neoBrutalBase}`;
  } else if (match.status === "waiting-overs") {
    if (match.oversRemaining > 0) {
      actionText = `Deduct Over (${match.oversRemaining} Left)`;
      handleAction = decrementOvers;
      buttonStyle = `bg-amber-500 hover:bg-amber-600 text-black font-bold ${neoBrutalBase}`;
    } else {
      actionText = "Overs Exhausted";
      handleAction = () => {};
      buttonStyle =
        "bg-red-100 text-red-800 cursor-not-allowed border-2 border-red-300 shadow-none";
    }
  } else if (match.status === "finished") {
    actionText = "Match Finished";
    handleAction = () => {};
    buttonStyle =
      "bg-slate-200 text-slate-500 cursor-not-allowed border-2 border-slate-300 shadow-none";
  }

  const isDisabled =
    match.status === "finished" ||
    (match.status === "waiting-overs" && match.oversRemaining <= 0);

  return (
    <div className="grid gap-5 justify-center items-center grid-cols-1 md:grid-cols-2 md:grid-rows-2 mx-10">
      <Button
        type="button"
        size="lg"
        disabled={isDisabled}
        className={`rounded-none text-base px-5 py-5 md:col-span-1 md:order-2 ${buttonStyle}`}
        onClick={handleAction}
      >
        {actionText}
      </Button>

      <h2 className="scroll-m-20 text-6xl font-semibold tracking-tight text-center md:col-span-2 md:order-1 font-mono">
        {match.status === "waiting-overs"
          ? `OVERS: ${match.oversRemaining}`
          : formatTime(match.timeLeft)}
      </h2>

      <Button
        type="button"
        size="lg"
        className={`rounded-none text-base px-5 py-5 md:col-span-1 order-3 bg-white text-black hover:bg-primary-400 hover:text-white ${neoBrutalBase}`}
        onClick={resetTimer}
      >
        Reset
      </Button>
    </div>
  );
}
