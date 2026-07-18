import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "../ui/button";

interface Props {
  name: string;
  score: number;
  color: string;
  onGoal: () => void;
  onUndo?: () => void;
}

export function TeamScore({ name, score, color, onGoal, onUndo }: Props) {
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const prevScoreRef = useRef(score);

  useEffect(() => {
    if (score > prevScoreRef.current) {
      setShowOverlay(true);
    }
    prevScoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (showOverlay && overlayRef.current && textRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setShowOverlay(false);
        },
      });

      gsap.set(overlayRef.current, {
        opacity: 0,
        scale: 1,
        backgroundColor: color,
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
          "-=0.1", // Slight overlap with background fade-in
        )
        // Quick retro shake/vibration effect
        .to(textRef.current, {
          x: "random(-6, 6)",
          y: "random(-6, 6)",
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          ease: "none",
        })
        // Hold briefly, then vanish
        .to(overlayRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.3,
          delay: 0.5,
          ease: "power2.in",
        });
    }
  }, [showOverlay]);

  return (
    <div className="flex flex-col gap-4 text-center p-4 border border-transparent">
      {/* Neo-Brutalist Goal Overlay */}
      {showOverlay && (
        <div
          ref={overlayRef}
          style={{ backgroundColor: color }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center border-2 gap-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none pointer-events-none"
        >
          <h1
            ref={textRef}
            className="text-5xl md:text-6xl font-black text-primary-100 uppercase tracking-tighter italic drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          >
            GOAL!!!
          </h1>
          <p className="font-mono text-xs text-white uppercase tracking-widest mt-1 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {name} Scores
          </p>
        </div>
      )}

      <h2 className="text-muted-foreground">{name}</h2>
      <p className="scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight first:mt-0">
        {score}
      </p>
      <div className="flex flex-col gap-2.5">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="rounded-none active:bg-primary-300 hover:bg-primary-300 active:text-white hover:text-white"
          onClick={onGoal}
        >
          Add Goal
        </Button>
        {onUndo ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-none active:bg-primary-200 hover:bg-primary-200 active:text-white hover:text-white"
            onClick={onUndo}
          >
            Cancel goal
          </Button>
        ) : null}
      </div>
    </div>
  );
}
