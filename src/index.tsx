import { List } from "@raycast/api";
import { DateTime } from "luxon";
import GameMetadata from "./GameMetadata";
import { useTodaysGames } from "./api";

export default function GameList() {
  const { isLoading, data } = useTodaysGames();

  return (
    <List isLoading={isLoading} isShowingDetail>
      {data &&
        data.gameWeek.map((day) => {
          if (DateTime.fromISO(day.date).toISODate() !== DateTime.now().toISODate()) {
            return null;
          }

          return day.games.map((game) => {
            const gameDate = DateTime.fromISO(game.startTimeUTC);
            return (
              <List.Item
                key={game.id}
                icon={game.homeTeam.abbrev == "DAL" ? game.homeTeam.logo : game.homeTeam.darkLogo}
                title={`${game.awayTeam.abbrev} at ${game.homeTeam.abbrev}`}
                accessories={[{ text: gameDate.toLocaleString(DateTime.TIME_SIMPLE) }]}
                detail={<List.Item.Detail metadata={<GameMetadata gameId={game.id} />} />}
              />
            );
          });
        })}
    </List>
  );
}
