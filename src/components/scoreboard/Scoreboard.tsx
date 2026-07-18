import { TeamScore } from "./TeamScore";
import { useMatch } from "../../../hooks/useMatch";

export function Scoreboard() {
  const { match, updateScore } = useMatch();

  if (!match) {
    return null;
  }
  return (
    <div className="flex justify-center gap-10 pb-10 border-b border-black">
      <TeamScore
        name={match.teamA.name}
        score={match.teamA.score}
        color={match.teamA.color}
        onGoal={() => updateScore(match.teamA.id, 1)}
        onUndo={() => updateScore(match.teamA.id, -1)}
      />

      <TeamScore
        name={match.teamB.name}
        score={match.teamB.score}
        color={match.teamB.color}
        onGoal={() => updateScore(match.teamB.id, 1)}
        onUndo={() => updateScore(match.teamB.id, -1)}
      />
    </div>
  );
}
