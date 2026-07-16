import { TeamScore } from "./TeamScore";
import { useMatch } from "../../../hooks/useMatch";

export function Scoreboard() {
  const { match, updateScore } = useMatch();

  if (!match) {
    return null;
  }
  console.log("team A score: ", match.teamA.score);
  console.log("team B score: ", match.teamB.score);
  return (
    <div className="flex justify-center gap-10 mx-10">
      <TeamScore
        name={match.teamA.name}
        score={match.teamA.score}
        onGoal={() => updateScore(match.teamA.id, 1)}
        onUndo={() => updateScore(match.teamA.id, -1)}
      />

      <TeamScore
        name={match.teamB.name}
        score={match.teamB.score}
        onGoal={() => updateScore(match.teamB.id, 1)}
        onUndo={() => updateScore(match.teamB.id, -1)}
      />
    </div>
  );
}
