import { Button } from "../ui/button";

interface Props {
  isRunning: boolean;
  toggle: () => void;
  reset: () => void;
}

export function TimerControls({ isRunning, toggle, reset }: Props) {
  return (
    <div className="flex gap-2.5 justify-center">
      <Button
        type="button"
        size="lg"
        className={`rounded-none ${isRunning ? "bg-primary-200 text-white" : ""} active:bg-primary-200 hover:bg-primary-200 active:text-white hover:text-white text-base px-7 py-5`}
        onClick={toggle}
      >
        {isRunning ? "Pause" : "Start"}
      </Button>
      <Button
        type="button"
        size="lg"
        className="rounded-none active:bg-primary-300 hover:bg-primary-300 active:text-white hover:text-white text-base px-7 py-5"
        onClick={reset}
      >
        Reset
      </Button>
    </div>
  );
}
