import React, { useState } from "react";
import { MatchContext } from "../hooks/useMatch";
import type { MatchData, MatchHistory } from "../types/types";
import { getMatchHistory } from "../store/match-store";
import { useNavigate } from "react-router-dom";

export function MatchProvider({ children }: { children: React.ReactNode }) {
  const matchHistory = getMatchHistory();
  const [match, setMatch] = useState<MatchData | null>(null);
  const [history, setHistory] = useState<MatchHistory[]>(matchHistory);
  const navigate = useNavigate();

  function endMatch() {
    if (!match) return;
    const finishedMatch: MatchHistory = {
      id: crypto.randomUUID(),
      team: [match.teamA, match.teamB],
      duration: match.duration,
      endedAt: Date.now(),
    };

    console.log("finishedMatch:", finishedMatch);

    const updated = [...history, finishedMatch];

    localStorage.setItem("match-history", JSON.stringify(updated));

    setHistory(updated);
    navigate("/history");
    setMatch(null);
  }

  function updateScore(team: string, delta = 1) {
    setMatch((currentMatch) => {
      if (!currentMatch) {
        return currentMatch;
      }

      if (team === currentMatch.teamA.name) {
        return {
          ...currentMatch,
          teamA: {
            ...currentMatch.teamA,
            score: Math.max(0, currentMatch.teamA.score + delta),
          },
        };
      }

      return {
        ...currentMatch,
        teamB: {
          ...currentMatch.teamB,
          score: Math.max(0, currentMatch.teamB.score + delta),
        },
      };
    });
  }

  return (
    <MatchContext.Provider
      value={{
        match,
        setMatch,
        history,
        endMatch,
        updateScore,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}
