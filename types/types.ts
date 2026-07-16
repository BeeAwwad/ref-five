export interface Team {
  id: string;
  name: string;
  color: string;
  score: number;
}

export type MatchType = "training" | "professional";

export interface MatchSettings {
  type: MatchType;
  duration: number;
  halves: 1 | 2;
  oversEnabled: boolean;
  initialOvers: number;
  cardsEnabled: boolean;
}

export type MatchStatus =
  | "waiting"
  | "running"
  | "halftime"
  | "waiting-overs"
  | "finished";

type MatchEventType = "goal" | "yellow-card" | "red-card";

export interface MatchEvent {
  id: string;
  minute: number;
  half: 1 | 2;
  teamId: string;
  playerNumber?: number;
  type: MatchEventType;
}

export interface MatchData {
  id: string;
  settings: MatchSettings;
  teamA: Team;
  teamB: Team;
  currentHalf: 1 | 2;
  timeLeft: number;
  status: MatchStatus;
  oversRemaining: number;
  events: MatchEvent[];
}

export interface MatchHistory {
  id: string;
  settings: MatchSettings;
  teamA: Team;
  teamB: Team;
  currentHalf: 1 | 2;
  events: MatchEvent[];
  endedAt: number;
  overs: number;
}

export interface Color {
  name: string;
  color: string;
}
