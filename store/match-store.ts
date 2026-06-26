import { Match } from "../types/match";
const STORAGE_KEY = "match-history";

export function saveMatch(match: Match) {
  const existing = getMatchHistory();

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, match]));
}

export function getMatchHistory(): Match[] {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}
