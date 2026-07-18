import { useMatch } from "../../../hooks/useMatch";
import { Button } from "../ui/button";

const MatchAction = () => {
  const { match, endMatch } = useMatch();
  if (!match) return null;

  const isMatchComplete = () => {
    if (match.settings.type === "professional") {
      return match.status === "finished";
    }
    return (
      match.status === "finished" ||
      (match.timeLeft === 0 && match.oversRemaining === 0) ||
      match.teamA.score - match.teamB.score >= 2 ||
      match.teamB.score - match.teamA.score >= 2
    );
  };

  const getDisabledReason = () => {
    if (match.settings.type === "professional") {
      if (match.currentHalf === 1) return "First half must be complete";
      if (match.status !== "finished") return "Second half is active";
    } else {
      if (match.timeLeft > 0) return "Regular match timer active";
      if (match.oversRemaining > 0)
        return `Overs: ${match.oversRemaining} must be played out`;
    }
    return "";
  };

  const disabled = !isMatchComplete();
  const reason = getDisabledReason();

  return (
    <div className="flex flex-col items-center gap-2 mt-10 px-10">
      <Button
        className="w-full max-w-md rounded-none bg-primary-300 hover:bg-primary-300 transition-all hover:scale-105 text-white font-semibold py-6 text-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
        onClick={endMatch}
        disabled={disabled}
      >
        Finish Match
      </Button>
      {disabled && reason && (
        <span className="text-xs text-primary-300 font-medium font-mono">
          Disabled: {reason}
        </span>
      )}
    </div>
  );
};

export default MatchAction;
