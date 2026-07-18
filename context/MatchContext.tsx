import React, { useEffect, useRef, useState } from "react";
import { MatchContext } from "../hooks/useMatch";
import type { MatchData, MatchEvent, MatchHistory } from "../types/types";
import { getMatchHistory } from "../store/match-store";
import { useNavigate } from "react-router-dom";

export function MatchProvider({ children }: { children: React.ReactNode }) {
  const [match, setMatch] = useState<MatchData | null>(null);
  const [history, setHistory] = useState<MatchHistory[]>(() =>
    getMatchHistory(),
  );
  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (match?.status === "running") {
      timerRef.current = window.setInterval(() => {
        setMatch((current) => {
          if (!current || current.status !== "running") return current;

          if (current.timeLeft <= 1) {
            if (current.settings.type === "professional") {
              if (current.currentHalf === 1 && current.settings.halves === 2) {
                return { ...current, timeLeft: 0, status: "halftime" };
              } else {
                return { ...current, timeLeft: 0, status: "finished" };
              }
            } else {
              return { ...current, timeLeft: 0, status: "waiting-overs" };
            }
          }

          return { ...current, timeLeft: current.timeLeft - 1 };
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [match?.status]);

  const startTimer = () => {
    setMatch((current) => (current ? { ...current, status: "running" } : null));
  };

  const pauseTimer = () => {
    setMatch((current) => (current ? { ...current, status: "waiting" } : null));
  };

  const resetTimer = () => {
    setMatch((current) => {
      if (!current) return null;
      return {
        ...current,
        status: "waiting",
        timeLeft: current.settings.duration,
        overs: 2,
      };
    });
  };

  const isActionAllowed = (current: MatchData) => {
    if (current.status === "finished") return false;

    if (
      current.settings.type === "training" &&
      current.status === "waiting-overs" &&
      current.oversRemaining <= 0
    ) {
      return false;
    }
    if (current.status === "waiting") return false;

    return true;
  };

  const updateScore = (teamId: string, delta = 1) => {
    setMatch((current) => {
      if (!current || !isActionAllowed(current)) return current;
      const isTeamA = current.teamA.id === teamId;
      const targetTeam = isTeamA ? current.teamA : current.teamB;
      const updatedTeam = {
        ...targetTeam,
        score: Math.max(0, targetTeam.score + delta),
      };

      const updatedEvents = [...current.events];
      if (delta > 0) {
        const elapsedSeconds = current.settings.duration - current.timeLeft;
        const currentMinute = Math.ceil(elapsedSeconds / 60) || 1;
        updatedEvents.push({
          id: crypto.randomUUID(),
          minute: currentMinute,
          half: current.currentHalf,
          teamId,
          type: "goal",
        });
      }

      return {
        ...current,
        teamA: isTeamA ? updatedTeam : current.teamA,
        teamB: isTeamA ? current.teamB : updatedTeam,
        events: updatedEvents,
      };
    });
  };

  const addMatchEvent = (
    type: "goal" | "yellow-card" | "red-card",
    teamId: string,
    playerNumber?: number,
  ) => {
    setMatch((current) => {
      if (!current || !isActionAllowed(current)) return current;
      if (type === "goal") return current;
      if (!current.settings.cardsEnabled) return current;

      const elapsedSeconds = current.settings.duration - current.timeLeft;
      const currentMinute = Math.ceil(elapsedSeconds / 60) || 1;

      const newEvent: MatchEvent = {
        id: crypto.randomUUID(),
        minute: currentMinute,
        half: current.currentHalf,
        teamId,
        playerNumber,
        type,
      };

      return { ...current, events: [...current.events, newEvent] };
    });
  };

  const decrementOvers = () => {
    setMatch((current) => {
      if (!current || current.oversRemaining <= 0) return current;
      if (current.settings.type !== "training") return current;

      const nextOvers = current.oversRemaining - 1;
      return {
        ...current,
        oversRemaining: nextOvers,
        status: nextOvers === 0 ? "finished" : "waiting-overs",
      };
    });
  };

  const advanceHalf = () => {
    setMatch((current) => {
      if (!current) return current;

      const canAdvance =
        current.status === "halftime" || current.status === "waiting-overs";
      if (!canAdvance) return current;

      return {
        ...current,
        currentHalf: 2,
        status: "waiting",
        timeLeft: current.settings.duration,
      };
    });
  };

  const endMatch = () => {
    if (!match) return;

    const finishedMatch: MatchHistory = {
      id: match.id,
      settings: match.settings,
      teamA: match.teamA,
      teamB: match.teamB,
      currentHalf: match.currentHalf,
      events: match.events,
      overs: match.settings.initialOvers,
      endedAt: Date.now(),
    };

    const updateHistory = [...history, finishedMatch];
    localStorage.setItem("match-history", JSON.stringify(updateHistory));
    setHistory(updateHistory);
    setMatch(null);
    navigate("/history");
  };

  return (
    <MatchContext.Provider
      value={{
        match,
        setMatch,
        history,
        startTimer,
        pauseTimer,
        resetTimer,
        addMatchEvent,
        decrementOvers,
        advanceHalf,
        endMatch,
        updateScore,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}
