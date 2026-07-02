import { useState } from "react";

export function Cards() {
  const [card, setCard] = useState<"yellow" | "red" | null>(null);

  function showCard(color: "yellow" | "red") {
    setCard(color);
    setTimeout(() => {
      setCard(null);
    }, 3000);
  }
  return (
    <>
      {card && (
        <div
          className={`fixed inset-0 ${card === "yellow" ? "bg-yellow-400" : "bg-red-500"} z-999`}
        ></div>
      )}

      <button onClick={() => showCard("yellow")}>Yellow Card</button>
      <button onClick={() => showCard("red")}>Red Card</button>
    </>
  );
}
