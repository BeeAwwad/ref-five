import { Scoreboard } from "../components/scoreboard/Scoreboard";
import { Timer } from "../components/timer/Timer";
import { Cards } from "../components/cards/Cards";
import { useMatch } from "../hooks/useMatch";
import { Link } from "react-router-dom";

export const MatchPage = () => {
  const { match, endMatch } = useMatch();

  if (!match)
    return (
      <section className="flex justify-center items-center">
        <p>
          No active match,{" "}
          <Link
            className="border-b px-2 hover:border-b-2 transition-transform border-slate-700 text-slate-700"
            to={"/"}
          >
            Create one
          </Link>
        </p>
      </section>
    );

  return (
    <section>
      <Scoreboard />
      <Timer seconds={match?.duration || 0} />
      <Cards />

      <button onClick={endMatch}>End Match</button>
    </section>
  );
};
