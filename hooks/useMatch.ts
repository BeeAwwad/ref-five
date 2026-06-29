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

  endMatch: () => void;
  updateScore: (team: string, delta?: number) => void;
}

export const MatchContext = createContext<MatchContextType | null>(null);

export function useMatch() {
  const context = useContext(MatchContext);

  if (!context) {
    throw new Error("Must be used inside provider");
  }

  return context;
}
