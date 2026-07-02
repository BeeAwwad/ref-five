import { Scoreboard } from "../src/components/scoreboard/Scoreboard";
import { Timer } from "../src/components/timer/Timer";
import { Cards } from "../src/components/cards/Cards";
import { useMatch } from "../hooks/useMatch";
import { Link } from "react-router-dom";
import { Button } from "../src/components/ui/button";

export const MatchPage = () => {
  const { match, endMatch } = useMatch();

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
      <Timer seconds={match?.duration || 0} />
      <Cards />
      <div className="flex justify-center mt-10">
        <Button
          className="rounded-none text-base px-7 py-5"
          size={"lg"}
          onClick={endMatch}
        >
          End Match
        </Button>
      </div>
    </section>
  );
};
