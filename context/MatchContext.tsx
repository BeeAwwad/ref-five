import React, { useState } from "react";
import { MatchContext } from "../hooks/useMatch";
import type { MatchData } from "../types/match";

export function MatchProvider({ children }: { children: React.ReactNode }) {
  const [match, setMatch] = useState<MatchData | null>(null);

  return (
    <MatchContext.Provider
      value={{
        match,
        setMatch,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}
