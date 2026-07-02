import { useMatch } from "../../../hooks/useMatch";
import { useState } from "react";
import type { Color } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";

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
  const teamASelectableColors = availableColors.filter(
    (color) => color.color !== teamBColor?.color,
  );
  const teamBSelectableColors = availableColors.filter(
    (color) => color.color !== teamAColor?.color,
  );

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

  function handleDurationChange(delta: number) {
    setMinutes((currentMinutes) => Math.max(1, currentMinutes + delta));
  }

  function handleColorChange(
    value: string | null,
    setter: (color: Color | null) => void,
    excludedColor: Color | null,
  ) {
    const selectedColor = availableColors.find(
      (color) => color.color === value,
    );

    if (!selectedColor || selectedColor.color === excludedColor?.color) {
      return;
    }

    setter(selectedColor);
  }

  return (
    <Card className="rounded-none mx-5 md:mx-20 mb-10">
      <CardContent className="pt-5 px-0">
        <Field className="px-10 pb-5">
          <FieldLabel>Match duration (minutes)</FieldLabel>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              className="rounded-none"
              type="number"
              value={minutes}
              min="1"
              onChange={(event) => setMinutes(Number(event.target.value))}
            />
            <div className="flex gap-2">
              {[
                { label: "+1", delta: 1 },
                { label: "+2", delta: 2 },
                { label: "-1", delta: -1 },
                { label: "-2", delta: -2 },
              ].map((control) => (
                <Button
                  key={control.label}
                  type="button"
                  variant="outline"
                  size="lg"
                  className="rounded-none"
                  onClick={() => handleDurationChange(control.delta)}
                >
                  {control.label}
                </Button>
              ))}
            </div>
          </div>
        </Field>
        <div className="border-t py-5 space-y-5">
          <Field className="px-10">
            <FieldLabel>Team A name</FieldLabel>
            <Input
              className="rounded-none"
              value={teamAName}
              onChange={(event) => setTeamAName(event.target.value)}
            />
          </Field>
          <Field className="px-10">
            <FieldLabel>Team A color</FieldLabel>
            <Select
              value={teamAColor?.color ?? ""}
              onValueChange={(value) =>
                handleColorChange(value, setTeamAColor, teamBColor)
              }
            >
              <SelectTrigger className={"rounded-none"}>
                <SelectValue placeholder="Select color">
                  {teamAColor?.name ?? "Select color"}
                  {teamAColor?.color ? (
                    <span
                      className="h-3.5 w-3.5 border border-black/20"
                      style={{ backgroundColor: teamAColor.color }}
                    />
                  ) : (
                    ""
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className={"rounded-none"}>
                {teamASelectableColors.map((color) => (
                  <SelectItem key={color.color} value={color.color}>
                    <span className="flex items-center gap-2">
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: color.color }}
                      />
                      <span className="flex flex-col leading-tight">
                        <span>{color.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {color.color}
                        </span>
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="border-t space-y-5 py-5">
          <Field className="px-10">
            <FieldLabel>Team B name</FieldLabel>
            <Input
              className="rounded-none"
              value={teamBName}
              onChange={(event) => setTeamBName(event.target.value)}
            />
          </Field>
          <Field className="px-10">
            <FieldLabel>Team B color</FieldLabel>
            <Select
              value={teamBColor?.color ?? ""}
              onValueChange={(value) =>
                handleColorChange(value, setTeamBColor, teamAColor)
              }
            >
              <SelectTrigger className={"rounded-none"}>
                <SelectValue placeholder="Select color">
                  {teamBColor?.name ?? "Select color"}
                  {teamBColor?.color ? (
                    <span
                      className="h-3.5 w-3.5 border border-black/20"
                      style={{ backgroundColor: teamBColor.color }}
                    />
                  ) : (
                    ""
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className={"rounded-none"}>
                {teamBSelectableColors.map((color) => (
                  <SelectItem key={color.color} value={color.color}>
                    <span className="flex items-center gap-2">
                      <span
                        className="h-3.5 w-3.5 border border-black/20"
                        style={{ backgroundColor: color.color }}
                      />
                      <span className="flex flex-col leading-tight">
                        <span>{color.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {color.color}
                        </span>
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={"mx-auto w-full max-w-lg rounded-none"}
          type="button"
          onClick={handleCreate}
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
