import { useState } from "react";

export function Cards() {
  const [card, setCard] = useState<"yellow" | "red" | null>(null);

  return (
    <div
      className={`min-h-40 ${
        card === "yellow"
          ? "bg-yellow-500"
          : card === "red"
            ? "bg-red-600"
            : "bg-transparent"
      }`}
    >
      <button onClick={() => setCard(card === "yellow" ? null : "yellow")}>
        Yellow Card
      </button>
      <button onClick={() => setCard(card === "red" ? null : "red")}>
        Red Card
      </button>
    </div>
  );
}
