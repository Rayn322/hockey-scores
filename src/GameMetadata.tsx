import { List } from "@raycast/api";
import { useBoxScore } from "./api";
import type { PreGame } from "./types/PreGame";
import type { LiveOrFinalGame } from "./types/LiveOrFinalGame";

export default function GameMetadata({ gameId }: { gameId: number }) {
  const { game } = useBoxScore(gameId);

  if (!game) {
    return null;
  }

  if (game.state === "pregame") {
    return <PreGame game={game.data} />;
  } else {
    return <LiveOrFinalGame game={game.data} />;
  }
}

function PreGame({ game }: { game: PreGame }) {
  return (
    <List.Item.Detail.Metadata>
      <List.Item.Detail.Metadata.Label title="Home" text={game.homeTeam.name.default} />
      <List.Item.Detail.Metadata.Label title="Away" text={game.awayTeam.name.default} />
      <List.Item.Detail.Metadata.Separator />
      <List.Item.Detail.Metadata.Label title="Location" text={game.venueLocation.default} />
      <List.Item.Detail.Metadata.Label title="Venue" text={game.venue.default} />
    </List.Item.Detail.Metadata>
  );
}

function LiveOrFinalGame({ game }: { game: LiveOrFinalGame }) {
  return (
    <List.Item.Detail.Metadata>
      <List.Item.Detail.Metadata.Label title={game.awayTeam.name.default} text={game.awayTeam.score.toString()} />
      <List.Item.Detail.Metadata.Label title={game.homeTeam.name.default} text={game.homeTeam.score.toString()} />
      <List.Item.Detail.Metadata.Separator />
      <List.Item.Detail.Metadata.Label title="Location" text={game.venueLocation.default} />
      <List.Item.Detail.Metadata.Label title="Venue" text={game.venue.default} />
    </List.Item.Detail.Metadata>
  );
}
