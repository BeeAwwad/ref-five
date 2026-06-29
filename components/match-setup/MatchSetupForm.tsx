import { useMatch } from "../../hooks/useMatch";
import { useState } from "react";
import type { Color } from "../../types/types";
import { useNavigate } from "react-router-dom";

const availableColors: Color[] = [
  { name: "neon yellow", color: "#CCFF00" },
  { name: "fluorescent green", color: "#39FF14" },
  { name: "orange", color: "#FF5F1F" },
  { name: "royal blue", color: "#4169E1" },
  { name: "sky blue", color: "#87CEEB" },
  { name: "red", color: "#FF0000" },
  { name: "maroon", color: "#800020" },
];

export function MatchSetupForm() {
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(10);
  const [teamAName, setTeamAName] = useState("Team A");
  const [teamBName, setTeamBName] = useState("Team B");
  const [teamAColor, setTeamAColor] = useState<Color | null>(
    availableColors[0],
  );
  const [teamBColor, setTeamBColor] = useState<Color | null>(
    availableColors[1],
  );

  const { setMatch } = useMatch();

  function handleCreate() {
    if (!teamAColor || !teamBColor) {
      return;
    }

    setMatch({
      duration: minutes * 60,
      teamA: {
        id: crypto.randomUUID(),
        name: teamAName.trim() || "Team A",
        color: teamAColor.color,
        score: 0,
      },
      teamB: {
        id: crypto.randomUUID(),
        name: teamBName.trim() || "Team B",
        color: teamBColor.color,
        score: 0,
      },
    });

    navigate("/match");
  }

  function handleColorChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    setter: (color: Color | null) => void,
  ) {
    const selectedColor = availableColors.find(
      (color) => color.color === event.target.value,
    );

    setter(selectedColor ?? null);
  }

  return (
    <div>
      <label>
        Match duration (minutes)
        <input
          type="number"
          value={minutes}
          min="1"
          onChange={(event) => setMinutes(Number(event.target.value))}
        />
      </label>

      <label>
        Team A name
        <input
          value={teamAName}
          onChange={(event) => setTeamAName(event.target.value)}
        />
      </label>

      <label>
        Team A color
        <select
          value={teamAColor?.color ?? ""}
          onChange={(event) => handleColorChange(event, setTeamAColor)}
        >
          <option value="" disabled>
            Select a color
          </option>
          {availableColors.map((color) => (
            <option key={color.color} value={color.color}>
              {color.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Team B name
        <input
          value={teamBName}
          onChange={(event) => setTeamBName(event.target.value)}
        />
      </label>

      <label>
        Team B color
        <select
          value={teamBColor?.color ?? ""}
          onChange={(event) => handleColorChange(event, setTeamBColor)}
        >
          <option value="" disabled>
            Select a color
          </option>
          {availableColors.map((color) => (
            <option key={color.color} value={color.color}>
              {color.name}
            </option>
          ))}
        </select>
      </label>

      <button type="button" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}
