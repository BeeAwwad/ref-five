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
  startedAt: number;
}

export interface MatchData {
  duration: number;

  teamA: {
    name: string;
    color: string;
    score: number;
  };

  teamB: {
    name: string;
    color: string;
    score: number;
  };
}
