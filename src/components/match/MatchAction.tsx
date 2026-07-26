import { useEffect, useRef, useState } from "react";
import { useMatch } from "../../../hooks/useMatch";
import { Button } from "../ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const MatchAction = () => {
  const { match, endMatch } = useMatch();
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const matchResult = match
    ? match.teamA.score === match.teamB.score
      ? {
          type: "draw" as const,
          title: "Draw",
          subtitle: "Both teams finished level",
          color: "#1f2937",
        }
      : match.teamA.score > match.teamB.score
        ? {
            type: "winner" as const,
            title: `${match.teamA.name} won`,
            subtitle: `${match.teamA.name} takes the win`,
            color: match.teamA.color,
          }
        : {
            type: "winner" as const,
            title: `${match.teamB.name} won`,
            subtitle: `${match.teamB.name} takes the win`,
            color: match.teamB.color,
          }
    : null;

  useEffect(() => {
    if (!match || match.status !== "finished") return;

    const frameId = requestAnimationFrame(() => {
      setShowOverlay(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, [match]);

  useGSAP(() => {
    if (
      !showOverlay ||
      !overlayRef.current ||
      !textRef.current ||
      !matchResult
    ) {
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setShowOverlay(false);
      },
    });

    gsap.set(overlayRef.current, {
      opacity: 0,
      scale: 1,
      backgroundColor: matchResult.color,
    });

    gsap.set(textRef.current, {
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
    });

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.15, ease: "power2.out" },
    )
      .fromTo(
        textRef.current,
        { scale: 0.3, rotation: -10, y: 50 },
        {
          scale: 1,
          rotation: 3,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.1",
      )
      .to(textRef.current, {
        x: "random(-6, 6)",
        y: "random(-6, 6)",
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: "none",
      })
      .to(overlayRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.3,
        delay: 0.5,
        ease: "power2.in",
      });
  }, [showOverlay, matchResult?.color]);

  if (!match) return null;

  const isMatchComplete = () => {
    if (match.settings.type === "professional") {
      return match.status === "finished";
    }
    return (
      match.status === "finished" ||
      (match.timeLeft === 0 && match.oversRemaining === 0) ||
      match.teamA.score - match.teamB.score >= 2 ||
      match.teamB.score - match.teamA.score >= 2
    );
  };

  const getDisabledReason = () => {
    if (match.settings.type === "professional") {
      if (match.currentHalf === 1) return "First half must be complete";
      if (match.status !== "finished") return "Second half is active";
    } else {
      if (match.timeLeft > 0) return "Regular match timer active";
      if (match.oversRemaining > 0)
        return `Overs: ${match.oversRemaining} must be played out`;
    }
    return "";
  };

  const disabled = !isMatchComplete();
  const reason = getDisabledReason();

  return (
    <div className="flex flex-col items-center gap-2 mt-10 px-10">
      {showOverlay && matchResult && (
        <div
          ref={overlayRef}
          style={{ backgroundColor: matchResult.color }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center border-2 gap-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none pointer-events-none"
        >
          <h1
            ref={textRef}
            className="text-5xl md:text-6xl font-black text-primary-100 uppercase tracking-tighter italic drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          >
            {matchResult.title}
          </h1>
          <p className="font-mono text-xs text-white uppercase tracking-widest mt-1 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {matchResult.subtitle}
          </p>
        </div>
      )}
      <Button
        className="w-full max-w-md rounded-none bg-primary-300 hover:bg-primary-300 transition-all hover:scale-105 text-white font-semibold py-6 text-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
        onClick={endMatch}
        disabled={disabled}
      >
        Finish Match
      </Button>
      {disabled && reason && (
        <span className="text-xs text-primary-300 font-medium font-mono">
          Disabled: {reason}
        </span>
      )}
    </div>
  );
};

export default MatchAction;
