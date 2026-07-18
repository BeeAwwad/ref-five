import { Scoreboard } from "../src/components/scoreboard/Scoreboard";
import { Timer } from "../src/components/timer/Timer";
import { Cards } from "../src/components/cards/Cards";
import { useMatch } from "../hooks/useMatch";
import { Link } from "react-router-dom";
import MatchAction from "../src/components/match/MatchAction";

export const MatchPage = () => {
  const { match } = useMatch();

  if (!match)
    return (
      <section className="flex justify-center items-center h-[80vh]">
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
    <section className="mt-2">
      <h2 className="scroll-m-20 py-5 text-center text-4xl font-extrabold tracking-tight text-balance uppercase">
        {match.settings.type === "training" ? "Training " : "Professional "}{" "}
        Match
      </h2>
      <div className="py-10 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden mx-5 sm:mx-20 mb-10 font-mono max-w-2xl xl:max-w-4xl md:mx-auto">
        <Scoreboard />
        <Timer />
        <Cards />
        <MatchAction />
      </div>
    </section>
  );
};
