import { useMatch } from "../../../hooks/useMatch";

export function MatchHistory() {
  const { history } = useMatch();
  console.log("history:", history);
  return (
    <div>
      <h2>History</h2>

      {history
        ? history.map((match) => (
            <div key={match.id}>
              <p>
                {match.team[0].name} {match.team[0].score}
                {" - "}
                {match.team[1].name} {match.team[1].score}
              </p>
              <small>{new Date(match.endedAt).toLocaleString()}</small>
            </div>
          ))
        : "Not Available"}
    </div>
  );
}
