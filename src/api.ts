import { NextWeek } from "./types/NextWeek";
import { useFetch } from "@raycast/utils";
import { PreGame } from "./types/PreGame";
import { LiveGame } from "./types/LiveGame";

const baseUrl = "https://api-web.nhle.com/v1";

export function useTodaysGames() {
  const { isLoading, data } = useFetch<NextWeek>(`${baseUrl}/schedule/now`);
  return { isLoading, data };
}

// type BoxScore =
//   | {
//       state: "pregame";
//       data: PreGame;
//     }
//   | {
//       state: "live";
//       data: PreGame;
//     }
//   | {
//       state: "final";
//       data: PreGame;
//     };

export function useBoxScore(gameId: number) {
  const { isLoading, data } = useFetch<{ gameState: string }>(`${baseUrl}/gamecenter/${gameId}/boxscore`);

  if (!data) {
    return { isLoading, game: null };
  }

  let game;

  if (data.gameState === "FUT" || data.gameState === "PRE") {
    game = { state: "pregame" as const, data: data as PreGame };
  } else if (data.gameState === "LIVE" || data.gameState === "CRIT") {
    game = { state: "live" as const, data: data as LiveGame };
  } else {
    game = { state: "final" as const, data };
  }

  return { isLoading, game };
}
