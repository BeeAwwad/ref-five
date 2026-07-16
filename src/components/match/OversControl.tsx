import { useMatch } from "../../../hooks/useMatch";
import { Button } from "../ui/button";

const OversControl = () => {
  const { decrementOvers, match } = useMatch();
  console.log(match?.timeLeft);
  if (!match || match.settings.type !== "training" || match.timeLeft > 0)
    return null;
  const isExhausted = match.oversRemaining === 0;
  console.log("overs remaining", match.oversRemaining);
  return (
    <div className="mx-auto max-w-sm mt-8 p-6 border rounded bg-slate-50 text-center space-y-4">
      <div>
        <h3 className="text-xl font-bold">Overs Countdown</h3>
        <p className="text-xs text-muted-foreground">
          Regulation time expired. Track remaining out-of-play segments.
        </p>
      </div>

      <div className="space-y-2">
        <div className="text-5xl font-mono font-bold text-primary-300">
          {match.oversRemaining}
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Overs Left
        </div>
      </div>

      {!isExhausted ? (
        <Button
          className={
            "w-full rounded-none bg-amber-500 hover:bg-amber-600 text-black py-4 font-bold"
          }
          onClick={() => decrementOvers()}
        >
          Ball Out (-1 Over)
        </Button>
      ) : (
        <div className="p-3 bg-red-100 text-red-800 text-xs font-bold uppercase tracking-widest rounded">
          Match State Locked - Overs Complete
        </div>
      )}
    </div>
  );
};

export default OversControl;
