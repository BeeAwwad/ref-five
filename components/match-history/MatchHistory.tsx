import { getMatchHistory } from "../../store/match-store";

export function MatchHistory() {
  const matches = getMatchHistory();

  return (
    <div>
      <h2>History</h2>

      {matches
        ? matches.map((match) => <div key={match.id}>Match {match.id}</div>)
        : "Not Available"}
    </div>
  );
}
