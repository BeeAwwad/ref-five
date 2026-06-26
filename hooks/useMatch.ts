import { useContext, createContext } from "react";
import type { MatchData } from "../types/match";

interface MatchContextType {
  match: MatchData | null;

  setMatch: (match: MatchData) => void;
}

export const MatchContext = createContext<MatchContextType | null>(null);

export function useMatch() {
  const context = useContext(MatchContext);

  if (!context) {
    throw new Error("Must be used inside provider");
  }

  return context;
}
