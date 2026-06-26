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
