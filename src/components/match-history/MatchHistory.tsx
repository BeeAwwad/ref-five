import { useMatch } from "../../../hooks/useMatch";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";

export function MatchHistory() {
  const { history } = useMatch();
  const sortedHistory = history.sort((b, a) => a.endedAt - b.endedAt);
  return (
    <div className="mx-5 md:mx-20 mb-10 space-y-6">
      <h2 className="scroll-m-20 py-5 text-center text-4xl font-extrabold tracking-tight text-balance uppercase">
        Match History
      </h2>

      {!sortedHistory || sortedHistory.length === 0 ? (
        <div className="border border-dashed border-slate-300 p-10 text-center font-mono text-sm text-muted-foreground rounded-none">
          No matches archived in local data banks.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-2xl xl:max-w-4xl md:mx-auto">
          {sortedHistory.map((match) => {
            const isTraining = match.settings.type === "training";

            const allEvents = match.events || [];
            const teamAEvents = allEvents
              .filter((e) => e.teamId === match.teamA.id)
              .sort((a, b) => a.minute - b.minute);
            const teamBEvents = allEvents
              .filter((e) => e.teamId === match.teamB.id)
              .sort((a, b) => a.minute - b.minute);

            const hasEvents = allEvents.length > 0;

            return (
              <Card
                key={match.id}
                className="rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden"
              >
                <CardHeader className="bg-slate-50 border-b-2 border-black py-3 px-4 flex flex-row items-center justify-between space-y-0">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    {new Date(match.endedAt).toLocaleDateString()} @{" "}
                    {new Date(match.endedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <Badge
                    className={`rounded-none border font-mono font-bold uppercase text-xs tracking-widest ${
                      isTraining
                        ? "bg-amber-100 text-amber-900 border-amber-400"
                        : "bg-blue-100 text-blue-900 border-blue-400"
                    }`}
                  >
                    {match.settings.type}
                  </Badge>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-3 items-center text-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className="inline-block w-4 h-4 border border-black/30"
                        style={{ backgroundColor: match.teamA.color }}
                      />
                      <span className="font-bold text-sm uppercase tracking-wide truncate max-w-30">
                        {match.teamA.name}
                      </span>
                    </div>

                    <div className="font-mono font-black text-2xl bg-black text-white py-1 px-3 inline-block mx-auto tracking-tighter">
                      {match.teamA.score} — {match.teamB.score}
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <span
                        className="inline-block w-4 h-4 border border-black/30"
                        style={{ backgroundColor: match.teamB.color }}
                      />
                      <span className="font-bold text-sm uppercase tracking-wide truncate max-w-30">
                        {match.teamB.name}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-3 text-xs font-mono flex flex-wrap justify-around items-center gap-2">
                    <div>Reg Duration: {match.settings.duration / 60}m</div>
                    <div>Halves Configured: {match.settings.halves}</div>
                    {isTraining && (
                      <div className="text-amber-800 font-bold">
                        Overs Tracked: {match.settings.initialOvers} Played
                      </div>
                    )}
                  </div>

                  {hasEvents && (
                    <div className="border-t border-slate-200 pt-4 grid grid-cols-2 gap-4 divide-x divide-slate-100">
                      <div className="space-y-1.5 pr-2">
                        <h4 className="text-[10px] font-mono uppercase text-muted-foreground font-black tracking-widest text-left mb-2">
                          {match.teamA.name}
                        </h4>
                        {teamAEvents.length === 0 ? (
                          <p className="text-[11px] text-slate-400 font-mono italic">
                            No events logged
                          </p>
                        ) : (
                          <div className="space-y-1">
                            {teamAEvents.map((e, idx) => (
                              <div
                                key={e.id || idx}
                                className="text-xs font-mono flex items-center gap-2 text-slate-700"
                              >
                                <span className="text-slate-400 font-bold w-6 text-left shrink-0">
                                  {e.minute}’
                                </span>
                                {e.type === "goal" ? (
                                  <span></span>
                                ) : (
                                  <span
                                    className={`w-2 h-3 border border-black/40 inline-block shrink-0 ${
                                      e.type === "yellow-card"
                                        ? "bg-yellow-400"
                                        : "bg-red-600"
                                    }`}
                                  />
                                )}
                                <span className="font-medium">
                                  {e.type === "goal"
                                    ? "Goal scored"
                                    : `Card #${e.playerNumber ?? "?"}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5 pl-4">
                        <h4 className="text-[10px] font-mono uppercase text-muted-foreground font-black tracking-widest text-right mb-2">
                          {match.teamB.name}
                        </h4>
                        {teamBEvents.length === 0 ? (
                          <p className="text-[11px] text-slate-400 font-mono italic">
                            No events logged
                          </p>
                        ) : (
                          <div className="space-y-1">
                            {teamBEvents.map((e, idx) => (
                              <div
                                key={e.id || idx}
                                className="text-xs font-mono flex justify-end items-center gap-2 text-slate-700"
                              >
                                <span className="text-slate-400 font-bold w-6 text-left shrink-0">
                                  {e.minute}’
                                </span>
                                {e.type === "goal" ? (
                                  <span></span>
                                ) : (
                                  <span
                                    className={`w-2 h-3 border border-black/40 inline-block shrink-0 ${
                                      e.type === "yellow-card"
                                        ? "bg-yellow-400"
                                        : "bg-red-600"
                                    }`}
                                  />
                                )}
                                <span className="font-medium">
                                  {e.type === "goal"
                                    ? "Goal scored"
                                    : `Card #${e.playerNumber ?? "?"}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
