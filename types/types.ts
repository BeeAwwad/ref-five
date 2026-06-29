export interface Team {
  id: string;
  name: string;
  color: string;
  score: number;
}

export interface Match {
  id: string;
  team: [Team, Team];
  duration: number;
}

export interface MatchHistory {
  id: string;
  team: [Team, Team];
  duration: number;
  endedAt: number;
}

export interface MatchData {
  duration: number;
  teamA: Team;
  teamB: Team;
}

export interface Color {
  name: string;
  color: string;
}
