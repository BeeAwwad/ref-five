import { useMatch } from "../../../hooks/useMatch";
import { useState } from "react";
import {
  type MatchType,
  type Color,
  type MatchData,
  type MatchSettings,
} from "../../../types/types";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
import { Item, ItemContent, ItemDescription, ItemActions } from "../ui/item";

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
  const [matchType, setMatchType] = useState<MatchType>("training");
  const [initialOvers, setInitialOvers] = useState(2);
  const [teamAColor, setTeamAColor] = useState<Color | null>(
    availableColors[0],
  );
  const [teamBColor, setTeamBColor] = useState<Color | null>(
    availableColors[1],
  );
  const { match, setMatch } = useMatch();
  const hasActiveMatch = Boolean(match);
  const teamASelectableColors = availableColors.filter(
    (color) => color.color !== teamBColor?.color,
  );
  const teamBSelectableColors = availableColors.filter(
    (color) => color.color !== teamAColor?.color,
  );

  function handleCreate() {
    if (match || !teamAColor || !teamBColor) return;

    const settings: MatchSettings = {
      type: matchType,
      duration: minutes * 60,
      halves: matchType === "training" ? 1 : 2,
      oversEnabled: matchType === "training",
      initialOvers: matchType === "training" ? initialOvers : 0,
      cardsEnabled: matchType === "professional",
    };

    const newMatch: MatchData = {
      id: crypto.randomUUID(),
      settings,
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
      currentHalf: 1,
      timeLeft: settings.duration,
      status: "waiting",
      oversRemaining: settings.initialOvers,
      events: [],
    };
    setMatch(newMatch);
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
    <Card className="rounded-none mx-5 md:mx-20 mb-10 font-mono">
      <CardHeader className="py-5 sm:px-10 pb-5">
        <CardTitle className="font-mono uppercase font-black tracking-widest">
          {matchType === "training" ? "Training" : "Professional"}
        </CardTitle>
        <CardDescription>
          {matchType === "training"
            ? "Create a training match"
            : "Create a professional match"}
        </CardDescription>
        <CardAction>
          <Button
            className={"underline"}
            variant="link"
            onClick={() =>
              setMatchType(
                matchType === "training" ? "professional" : "training",
              )
            }
          >
            {matchType === "training"
              ? "Switch to Professional"
              : "Switch to Training"}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        {hasActiveMatch ? (
          <Item className="flex flex-col px-5 sm:px-10 mb-10">
            <ItemContent>
              <ItemDescription>
                A match is already active. Finish or cancel the current match
                before creating a new one.
              </ItemDescription>
            </ItemContent>

            <ItemActions className="gap-5 flex-col sm:flex-row">
              <Link
                to={"/match"}
                className="border-b px-2 hover:border-b-2 transition-transform border-slate-700 text-slate-700"
              >
                Go to Match
              </Link>
              <Button
                type="button"
                size="lg"
                className={"rounded-none bg-primary-300"}
                onClick={() => setMatch(null)}
              >
                End Active Match?
              </Button>
            </ItemActions>
          </Item>
        ) : null}
        {matchType === "training" && (
          <Field className="px-5 sm:px-10 pb-5">
            <FieldLabel>Number of Overs</FieldLabel>
            <Input
              className="rounded-none"
              type="number"
              value={initialOvers}
              defaultValue={2}
              onChange={(e) =>
                setInitialOvers(Math.max(2, Number(e.target.value)))
              }
            />
          </Field>
        )}
        <Field className="px-5 sm:px-10 pb-5">
          <FieldLabel>Match duration (minutes)</FieldLabel>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              className="rounded-none"
              type="number"
              value={minutes}
              min="1"
              onChange={(event) => setMinutes(Number(event.target.value))}
              disabled={hasActiveMatch}
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
          <Field className="px-5 sm:px-10">
            <FieldLabel>Team A name</FieldLabel>
            <Input
              className="rounded-none"
              value={teamAName}
              onChange={(event) => setTeamAName(event.target.value)}
            />
          </Field>
          <Field className="px-5 sm:px-10">
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
          <Field className="px-5 sm:px-10">
            <FieldLabel>Team B name</FieldLabel>
            <Input
              className="rounded-none"
              value={teamBName}
              onChange={(event) => setTeamBName(event.target.value)}
              disabled={hasActiveMatch}
            />
          </Field>
          <Field className="px-5 md:px-10">
            <FieldLabel>Team B color</FieldLabel>
            <Select
              value={teamBColor?.color ?? ""}
              onValueChange={(value) =>
                handleColorChange(value, setTeamBColor, teamAColor)
              }
              disabled={hasActiveMatch}
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
          disabled={hasActiveMatch}
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
