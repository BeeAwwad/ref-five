import { Button } from "../ui/button";

interface Props {
  name: string;
  score: number;
  onGoal: () => void;
  onUndo?: () => void;
}

export function TeamScore({ name, score, onGoal, onUndo }: Props) {
  return (
    <div className="flex flex-col gap-4 text-center mt-10">
      <h2 className="text-muted-foreground">{name}</h2>
      <p className="scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight first:mt-0">
        {score}
      </p>
      <div className="flex flex-col gap-2.5">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="rounded-none active:bg-primary-300 hover:bg-primary-300 active:text-white hover:text-white"
          onClick={onGoal}
        >
          Add Goal
        </Button>
        {onUndo ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-none active:bg-primary-200 hover:bg-primary-200 active:text-white hover:text-white"
            onClick={onUndo}
          >
            Cancel goal
          </Button>
        ) : null}
      </div>
    </div>
  );
}
