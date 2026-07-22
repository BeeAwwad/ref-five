import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import { useMatch } from "../../../hooks/useMatch";

type CardType = "yellow" | "red" | null;

gsap.registerPlugin(useGSAP);

export function Cards() {
  const { match, addMatchEvent } = useMatch();
  const [card, setCard] = useState<CardType>(null);
  const [playerNum, setPlayerNum] = useState("");
  const [activeTeamId, setActiveTeamId] = useState<string>("");

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const isClosing = useRef(false);

  useEffect(() => {
    if (match && !activeTeamId) {
      const t = window.setTimeout(() => setActiveTeamId(match.teamA.id), 0);
      return () => clearTimeout(t);
    }
  }, [match, activeTeamId]);

  useGSAP(
    () => {
      if (!card) return;
      isClosing.current = false;

      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(cardRef.current, {
        y: 500,
        scale: 0.5,
        opacity: 0,
        transformOrigin: "bottom center",
      });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.2 }).to(
        cardRef.current,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.inOut",
        },
      );

      timeoutRef.current = window.setTimeout(() => {
        animateOut();
      }, 5000);
    },
    { dependencies: [card] },
  );

  function showCard(color: "yellow" | "red") {
    if (!activeTeamId) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const type = color === "yellow" ? "yellow-card" : "red-card";
    const numericPlayer = playerNum ? parseInt(playerNum, 10) : undefined;
    const isTraining = match?.settings?.type === "training";

    if (isTraining) {
      console.log(
        "Training Mode: Skipping event log ledger, playing animation only.",
      );
    } else {
      addMatchEvent(type, activeTeamId, numericPlayer);
    }

    setCard(color);
  }

  function animateOut() {
    if (isClosing.current) return;
    isClosing.current = true;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const tl = gsap.timeline({
      onComplete: () => {
        setCard(null);
        setPlayerNum("");
        isClosing.current = false;
      },
    });

    tl.to(cardRef.current, {
      y: 400,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    }).to(overlayRef.current, { opacity: 0, duration: 0.25 }, "-=0.15");
  }

  if (!match) return null;

  const selectedTeamName =
    activeTeamId === match.teamA.id ? match.teamA.name : match.teamB.name;

  return (
    <div className="pt-8 pb-8 border-b border-black px-10 bg-slate-50/30">
      {match.settings.type === "professional" && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex border-2 w-fit mx-auto md:mx-0 border-black p-0.5 bg-slate-100 max-w-xs">
            <button
              type="button"
              onClick={() => setActiveTeamId(match.teamA.id)}
              className={`px-3 py-1 text-xs font-mono font-bold uppercase transition-all rounded-none truncate ${
                activeTeamId === match.teamA.id
                  ? "bg-black text-white"
                  : "text-slate-600 hover:text-black"
              }`}
            >
              {match.teamA.name}
            </button>
            <button
              type="button"
              onClick={() => setActiveTeamId(match.teamB.id)}
              className={`px-3 py-1 text-xs font-mono font-bold uppercase transition-all rounded-none truncate ${
                activeTeamId === match.teamB.id
                  ? "bg-black text-white"
                  : "text-slate-600 hover:text-black"
              }`}
            >
              {match.teamB.name}
            </button>
          </div>

          <div className="flex items-center gap-2 justify-center md:justify-end">
            <span className="font-mono text-[10px] font-bold uppercase text-slate-400">
              Player No.
            </span>
            <input
              type="number"
              placeholder="Jersey #"
              value={playerNum}
              onChange={(e) => setPlayerNum(e.target.value)}
              className="w-20 border border-black p-1 font-mono text-base sm:text-xs rounded-none text-center outline-none focus:bg-slate-50"
            />
          </div>
        </div>
      )}

      {card && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            onClick={animateOut}
            className={`absolute inset-0 ${card === "yellow" ? "bg-yellow-300/80" : "bg-red-500/80"}`}
          />
          <button
            onClick={animateOut}
            className="absolute top-6 right-6 z-50 text-3xl font-bold"
          >
            ✕
          </button>
          <div
            ref={cardRef}
            onClick={animateOut}
            className={`relative z-40 w-72 h-112 border-4 border-black shadow-2xl flex flex-col items-center justify-center ${
              card === "yellow" ? "bg-yellow-400" : "bg-red-600"
            }`}
          >
            {match.settings.type === "professional" && (
              <span
                className={`font-mono text-xl font-black uppercase tracking-widest p-2 px-4 border-2 border-black bg-white ${card === "yellow" ? "text-yellow-600" : "text-red-600"}`}
              >
                #{playerNum || "?"}
              </span>
            )}
            <span className="font-mono text-[11px] font-bold uppercase text-black mt-2 tracking-wide max-w-50 truncate">
              {selectedTeamName}
            </span>
          </div>
        </div>
      )}

      <div className="grid gap-4 mt-6 grid-cols-2">
        <Button
          className="rounded-none text-sm font-bold bg-yellow-400 text-black border-2 border-black hover:bg-yellow-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
          size="lg"
          onClick={() => showCard("yellow")}
        >
          Yellow Card
        </Button>

        <Button
          className="rounded-none text-sm font-bold bg-red-600 text-white border-2 border-black hover:bg-red-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
          size="lg"
          onClick={() => showCard("red")}
        >
          Red Card
        </Button>
      </div>
    </div>
  );
}
