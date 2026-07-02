import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";

type CardType = "yellow" | "red" | null;

gsap.registerPlugin(useGSAP);

export function Cards() {
  const [card, setCard] = useState<CardType>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<number | null>(null);
  const isClosing = useRef(false);

  // Entry animation
  useGSAP(
    () => {
      if (!card) return;

      isClosing.current = false;

      gsap.set(overlayRef.current, {
        opacity: 0,
      });

      gsap.set(cardRef.current, {
        y: 500,
        rotation: -25,
        scale: 0.5,
        opacity: 0,
        transformOrigin: "bottom center",
      });

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.2,
      }).to(cardRef.current, {
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.8)",
      });

      timeoutRef.current = window.setTimeout(() => {
        animateOut();
      }, 5000);
    },
    { dependencies: [card] },
  );

  function showCard(color: "yellow" | "red") {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCard(color);
  }

  function animateOut() {
    // prevent double close
    if (isClosing.current) return;

    isClosing.current = true;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCard(null);
        isClosing.current = false;
      },
    });

    tl.to(cardRef.current, {
      y: 400,
      rotation: 15,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.25,
      },
      "-=0.15",
    );
  }

  return (
    <div className="flex justify-center gap-6 mt-10">
      {card && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            onClick={animateOut}
            className={`absolute inset-0 ${
              card === "yellow" ? "bg-yellow-300/80" : "bg-red-500/80"
            }`}
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
            className={`relative z-40 w-72 h-112 border-4 border-black shadow-2xl ${
              card === "yellow" ? "bg-yellow-400" : "bg-red-600"
            }`}
          />
        </div>
      )}

      <Button
        className="rounded-none text-base px-7 py-5 bg-yellow-400"
        size="lg"
        onClick={() => showCard("yellow")}
      >
        Yellow Card
      </Button>

      <Button
        className="rounded-none text-base px-7 py-5 bg-red-600"
        size="lg"
        onClick={() => showCard("red")}
      >
        Red Card
      </Button>
    </div>
  );
}
