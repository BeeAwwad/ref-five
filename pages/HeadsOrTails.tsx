import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../src/components/ui/button";

gsap.registerPlugin(useGSAP);

type Outcome = "heads" | "tails" | null;
type Rule = "heads-out" | "tails-out";

interface TeamConfig {
  id: "teamA" | "teamB";
  name: string;
  choice: "heads" | "tails";
}

const getRandomOutcome = (): "heads" | "tails" =>
  Math.random() < 0.5 ? "heads" : "tails";

export function HeadsOrTailsPage() {
  const [teamA, setTeamA] = useState<TeamConfig>({
    id: "teamA",
    name: "Team A",
    choice: "heads",
  });

  const [teamB, setTeamB] = useState<TeamConfig>({
    id: "teamB",
    name: "Team B",
    choice: "tails",
  });

  const [rule, setRule] = useState<Rule>("tails-out");
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<Outcome>(null);
  const [eliminatedTeam, setEliminatedTeam] = useState<string | null>(null);

  const coinRef = useRef<HTMLDivElement>(null);
  const currentRotationRef = useRef<number>(0);

  useGSAP(() => {
    gsap.set(coinRef.current, { y: 0, rotateX: 0 });
  });

  const handleTeamAChoiceChange = (choice: "heads" | "tails") => {
    setTeamA((prev) => ({ ...prev, choice }));
    setTeamB((prev) => ({
      ...prev,
      choice: choice === "heads" ? "tails" : "heads",
    }));
  };

  const handleTeamBChoiceChange = (choice: "heads" | "tails") => {
    setTeamB((prev) => ({ ...prev, choice }));
    setTeamA((prev) => ({
      ...prev,
      choice: choice === "heads" ? "tails" : "heads",
    }));
  };

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null);
    setEliminatedTeam(null);

    const outcome = getRandomOutcome();

    const extraRotations = 360 * 5;
    const targetFaceAngle = outcome === "heads" ? 0 : 180;

    const currentRot = currentRotationRef.current;
    const nextBaseRot = Math.ceil(currentRot / 360) * 360 + extraRotations;
    const finalRotation = nextBaseRot + targetFaceAngle;

    currentRotationRef.current = finalRotation;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFlipping(false);
        setResult(outcome);
        processElimination(outcome);
      },
    });

    tl.to(coinRef.current, {
      y: -180,
      duration: 1.2,
      ease: "power2.out",
    }).to(coinRef.current, {
      y: 0,
      duration: 1.0,
      ease: "bounce.out",
    });

    tl.to(
      coinRef.current,
      {
        rotateX: finalRotation,
        duration: 2.2,
        ease: "power3.inOut",
      },
      0,
    );
  };

  const processElimination = (outcome: "heads" | "tails") => {
    const isTailsOut = rule === "tails-out";

    const knockedOut =
      outcome === "tails"
        ? isTailsOut
          ? teamA.choice === "tails"
            ? teamA.name
            : teamB.name
          : teamA.choice === "heads"
            ? teamA.name
            : teamB.name
        : rule === "heads-out"
          ? teamA.choice === "heads"
            ? teamA.name
            : teamB.name
          : teamA.choice === "tails"
            ? teamA.name
            : teamB.name;

    setEliminatedTeam(knockedOut);
  };

  return (
    <div className="min-h-screen bg-primary-400 text-slate-100 flex flex-col items-center justify-between p-6 font-mono">
      <header className="text-center max-w-xl my-4">
        <h1 className="text-3xl text-primary-500 font-extrabold tracking-wider uppercase border-b-2 border-primary-500 pb-2">
          Heads ou Tails
        </h1>
        <p className="text-xs text-primary-500 mt-2">Coin Toss</p>
      </header>

      <div className="w-full max-w-2xl flex flex-col items-center my-auto">
        <div className="h-64 flex items-center justify-center perspective-[1000px] my-4">
          <div
            ref={coinRef}
            className="w-36 h-36 relative transform-3d cursor-pointer"
            onClick={flipCoin}
          >
            {/* Heads Face */}
            <div className="absolute inset-0 rounded-full bg-primary-100 border-4 border-primary-100/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center backface-hidden">
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center">
                <span className="text-2xl font-black text-amber-950 uppercase">
                  Heads
                </span>
              </div>
            </div>

            {/* Tails Face */}
            <div className="absolute inset-0 rounded-full bg-slate-300 border-4 border-slate-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center backface-hidden transform-[rotateX(180deg)]">
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-slate-500 flex items-center justify-center">
                <span className="text-2xl font-black text-slate-900 uppercase">
                  Tails
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Toss Action */}
        <Button
          onClick={flipCoin}
          disabled={isFlipping}
          size="lg"
          className="rounded-none bg-primary-100 text-black hover:bg-primary-100/90 border-2 border-black font-bold uppercase text-base px-8 py-6 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50 mb-8"
        >
          {isFlipping ? "Flicking Coin..." : "Flick Coin"}
        </Button>

        {result && (
          <div className="w-full p-4 bg-primary-500 text-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] mb-8 animate-in fade-in zoom-in-95 duration-200 shadow-black">
            <p className="text-xs text-slate-100 uppercase tracking-widest">
              Landed On
            </p>
            <p className="text-2xl font-bold uppercase text-white my-1">
              {result}
            </p>
            {eliminatedTeam && (
              <div className="mt-2 pt-2 border-t border-primary-400">
                <span className="text-primary-300 font-bold uppercase text-sm">
                  {eliminatedTeam} HAS BEEN ELIMINATED!
                </span>
              </div>
            )}
          </div>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary-500 p-4">
            <p>Team A</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Call:</span>
              <div className="flex border border-primary-400">
                <button
                  type="button"
                  onClick={() => handleTeamAChoiceChange("heads")}
                  className={`px-3 py-1 text-xs uppercase font-bold ${
                    teamA.choice === "heads"
                      ? "bg-primary-100 text-black"
                      : "bg-primary-500 text-slate-100"
                  }`}
                >
                  Heads
                </button>
                <button
                  type="button"
                  onClick={() => handleTeamAChoiceChange("tails")}
                  className={`px-3 py-1 text-xs uppercase font-bold ${
                    teamA.choice === "tails"
                      ? "bg-primary-100 text-black"
                      : "bg-primary-500 text-slate-100"
                  }`}
                >
                  Tails
                </button>
              </div>
            </div>
          </div>

          <div className="bg-primary-500 p-4">
            <p>Team B</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Call:</span>
              <div className="flex border border-primary-400">
                <button
                  type="button"
                  onClick={() => handleTeamBChoiceChange("heads")}
                  className={`px-3 py-1 text-xs uppercase font-bold ${
                    teamB.choice === "heads"
                      ? "bg-primary-100 text-black"
                      : "bg-primary-500 text-slate-100"
                  }`}
                >
                  Heads
                </button>
                <button
                  type="button"
                  onClick={() => handleTeamBChoiceChange("tails")}
                  className={`px-3 py-1 text-xs uppercase font-bold ${
                    teamB.choice === "tails"
                      ? "bg-primary-100 text-black"
                      : "bg-primary-500 text-slate-100"
                  }`}
                >
                  Tails
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-primary-500 p-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-100 uppercase">
            Elimination Condition:
          </span>
          <div className="flex border border-primary-400 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setRule("tails-out")}
              className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs uppercase font-bold ${
                rule === "tails-out"
                  ? "bg-primary-300 text-white"
                  : "bg-primary-500 text-slate-100"
              }`}
            >
              Tails Out
            </button>
            <button
              type="button"
              onClick={() => setRule("heads-out")}
              className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs uppercase font-bold ${
                rule === "heads-out"
                  ? "bg-primary-300 text-white"
                  : "bg-primary-500 text-slate-100"
              }`}
            >
              Heads Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
