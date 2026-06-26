import { Scoreboard } from "../components/scoreboard/Scoreboard";
import { Timer } from "../components/timer/Timer";
import { Cards } from "../components/cards/Cards";
import { useNavigate } from "react-router-dom";

export const MatchPage = () => {
  const navigate = useNavigate();

  function endMatch() {
    // save to localStorage

    navigate("/history");
  }

  return (
    <section>
      <Scoreboard />
      <Timer seconds={600} />
      <Cards />

      <button onClick={endMatch}>End Match</button>
    </section>
  );
};
