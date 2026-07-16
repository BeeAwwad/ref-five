import { useMatch } from "../../../hooks/useMatch";
import { Button } from "../ui/button";

export function TimerControls() {
  const { pauseTimer, resetTimer, startTimer, match } = useMatch();
  if (!match) return;
  return (
    <div className="flex gap-2.5 justify-center">
      <Button
        type="button"
        size="lg"
        className={`rounded-none ${match.status === "running" ? "bg-primary-200 text-white" : ""} active:bg-primary-200 hover:bg-primary-200 active:text-white hover:text-white text-base px-5 py-5`}
        onClick={match.status === "running" ? pauseTimer : startTimer}
      >
        {match.status === "running" ? "Pause" : "Start"}
      </Button>
      <Button
        type="button"
        size="lg"
        className="rounded-none active:bg-primary-300 hover:bg-primary-300 active:text-white hover:text-white text-base px-5 py-5"
        onClick={resetTimer}
      >
        Reset
      </Button>
    </div>
  );
}
