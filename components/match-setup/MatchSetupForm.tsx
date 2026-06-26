import { useState } from "react";

export function MatchSetupForm() {
  const [minutes, setMinutes] = useState(10);

  return (
    <div>
      <h2>Start Match</h2>

      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
      />

      <button>Start Match</button>
    </div>
  );
}
