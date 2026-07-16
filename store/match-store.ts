import type { MatchHistory, MatchData } from "../types/types";
const STORAGE_KEY = "match-history";

export function saveMatch(match: MatchData) {
  const existing = getMatchHistory();

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, match]));
}

export function getMatchHistory(): MatchHistory[] {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}
