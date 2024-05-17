import { Color, List } from "@raycast/api";
import { DateTime } from "luxon";
import GameMetadata from "./GameMetadata";
import { useTodaysGames } from "./api";

export default function GameList() {
  const { isLoading, data } = useTodaysGames();

  return (
    <List isLoading={isLoading} isShowingDetail>
      {data &&
        data.gameWeek.map((day) => {
          // if (DateTime.fromISO(day.date).toISODate() !== DateTime.now().toISODate()) {
          //   return null;
          // }

          return (
            <List.Section
              key={day.date}
              title={DateTime.fromISO(day.date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
            >
              {day.games
                .sort((a, b) => {
                  // sort in time order
                  // finished games go last
                  // live games go first
                  // future games go in the middle

                  const aDate = DateTime.fromISO(a.startTimeUTC);
                  const bDate = DateTime.fromISO(b.startTimeUTC);

                  if (
                    (a.gameState === "FINAL" && b.gameState !== "FINAL") ||
                    (a.gameState === "OFF" && b.gameState !== "OFF")
                  ) {
                    return 1;
                  }

                  if (
                    (a.gameState !== "FINAL" && b.gameState === "FINAL") ||
                    (a.gameState !== "OFF" && b.gameState === "OFF")
                  ) {
                    return -1;
                  }

                  if (a.gameState === "LIVE" && b.gameState !== "LIVE") {
                    return -1;
                  }

                  if (a.gameState !== "LIVE" && b.gameState === "LIVE") {
                    return 1;
                  }

                  return aDate.toMillis() - bDate.toMillis();
                })
                .map((game) => {
                  const gameDate = DateTime.fromISO(game.startTimeUTC);
                  return (
                    <List.Item
                      key={game.id}
                      icon={game.homeTeam.abbrev == "DAL" ? game.homeTeam.logo : game.homeTeam.darkLogo}
                      title={`${game.awayTeam.abbrev} at ${game.homeTeam.abbrev}`}
                      accessories={[
                        game.gameState === "LIVE" || game.gameState === "CRIT"
                          ? {
                              tag: {
                                value: "LIVE",
                                color: Color.Green,
                              },
                            }
                          : {
                              text:
                                game.gameState === "FINAL" || game.gameState === "OFF"
                                  ? "FINAL"
                                  : gameDate.toLocaleString(DateTime.TIME_SIMPLE),
                            },
                      ]}
                      detail={<List.Item.Detail metadata={<GameMetadata gameId={game.id} />} />}
                    />
                  );
                })}
            </List.Section>
          );
        })}
    </List>
  );
}
