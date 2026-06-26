import { Timer } from "../components/timer/Timer";
import { Scoreboard } from "../components/scoreboard/Scoreboard";
import { Cards } from "../components/cards/Cards";
function App() {
  return (
    <>
      <h1>Ref 5</h1>
      <section>
        <Timer seconds={60} />
        <Scoreboard />
        <Cards />
      </section>
    </>
  );
}

export default App;
