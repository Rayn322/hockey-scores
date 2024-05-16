// chatgpt-ed

type Venue = {
  default: string;
};

type VenueLocation = {
  default: string;
};

type TvBroadcast = {
  id: number;
  market: "N";
  countryCode: "US" | "CA";
  network: "TNT" | "truTV" | "MAX" | "SN" | "CBC" | "TVAS";
  sequenceNumber: number;
};

type Team = {
  id: number;
  name: {
    default: string;
  };
  abbrev: string;
  logo: string;
  placeName: {
    default: string;
  };
};

export type PreGame = {
  id: number;
  season: number;
  gameType: number;
  limitedScoring: boolean;
  gameDate: string;
  venue: Venue;
  venueLocation: VenueLocation;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  tvBroadcasts: TvBroadcast[];
  gameState: "FUT";
  gameScheduleState: "OK";
  regPeriods: number;
  awayTeam: Team;
  homeTeam: Team;
};
