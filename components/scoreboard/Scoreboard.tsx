import { useState } from "react";
import { TeamScore } from "./TeamScore";

export function Scoreboard() {
  const [teamA, setTeamA] = useState(0);

  const [teamB, setTeamB] = useState(0);

  return (
    <div>
      <TeamScore
        name="Team A"
        score={teamA}
        onGoal={() => setTeamA((prev) => prev + 1)}
      />

      <TeamScore
        name="Team B"
        score={teamB}
        onGoal={() => setTeamB((prev) => prev + 1)}
      />
    </div>
  );
}
