import { Scoreboard } from "../src/components/scoreboard/Scoreboard";
import { Timer } from "../src/components/timer/Timer";
import { Cards } from "../src/components/cards/Cards";
import { useMatch } from "../hooks/useMatch";
import { Link } from "react-router-dom";
import MatchAction from "../src/components/match/MatchAction";
import OversControl from "../src/components/match/OversControl";

export const MatchPage = () => {
  const { match } = useMatch();

  if (!match)
    return (
      <section className="flex justify-center items-center">
        <p className="leading-7 not-first::mt-6">
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
      <Timer />
      <Cards />
      <OversControl />
      <MatchAction />
    </section>
  );
};
