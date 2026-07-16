import {
  useContext,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { MatchData, MatchHistory } from "../types/types";

interface MatchContextType {
  match: MatchData | null;
  setMatch: Dispatch<SetStateAction<MatchData | null>>;

  history: MatchHistory[];
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateScore: (teamId: string, delta?: number) => void;
  addMatchEvent: (
    type: "goal" | "yellow-card" | "red-card",
    teamId: string,
    playerNumber?: number,
  ) => void;
  decrementOvers: () => void;
  advanceHalf: () => void;
  endMatch: () => void;
}

export const MatchContext = createContext<MatchContextType | null>(null);

export function useMatch() {
  const context = useContext(MatchContext);

  if (!context) {
    throw new Error("useMatch must be used inside a MatchProvider block.");
  }

  return context;
}
