import { TeamScore } from "./TeamScore";
import { useMatch } from "../../hooks/useMatch";

export function Scoreboard() {
  const { match, updateScore } = useMatch();

  if (!match) {
    return null;
  }

  return (
    <div>
      <TeamScore
        name={match.teamA.name}
        score={match.teamA.score}
        onGoal={() => updateScore(match.teamA.name, 1)}
        onUndo={() => updateScore(match.teamA.name, -1)}
      />

      <TeamScore
        name={match.teamB.name}
        score={match.teamB.score}
        onGoal={() => updateScore(match.teamB.name, 1)}
        onUndo={() => updateScore(match.teamB.name, -1)}
      />
    </div>
  );
}
