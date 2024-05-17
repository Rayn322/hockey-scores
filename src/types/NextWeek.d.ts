// Generated from quicktype.io, good enough

type SeriesAbbrev = "R1" | "R2" | "R3" | "R4";
type PeriodType = "REG";
type Market = "N";
type GameScheduleState = "OK";
type GameState = "FUT" | "OFF" | "LIVE" | "CRIT" | "FINAL";
type CountryCode = "CA" | "US";

export interface NextWeek {
  nextStartDate: string;
  previousStartDate: string;
  gameWeek: GameWeek[];
  oddsPartners: OddsPartner[];
  preSeasonStartDate: string;
  regularSeasonStartDate: string;
  regularSeasonEndDate: string;
  playoffEndDate: string;
  numberOfGames: number;
}

interface GameWeek {
  date: string;
  dayAbbrev: string;
  numberOfGames: number;
  games: Game[];
}

interface Game {
  id: number;
  season: number;
  gameType: number;
  venue: Venue;
  neutralSite: boolean;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  gameState: GameState;
  gameScheduleState: GameScheduleState;
  tvBroadcasts: TvBroadcast[];
  awayTeam: Team;
  homeTeam: Team;
  periodDescriptor: PeriodDescriptor;
  gameOutcome?: GameOutcome;
  winningGoalie?: WinningGoal;
  winningGoalScorer?: WinningGoal;
  seriesStatus: SeriesStatus;
  seriesUrl: string;
  threeMinRecap?: string;
  threeMinRecapFr?: string;
  gameCenterLink: string;
  ticketsLink?: string;
}

interface Team {
  id: number;
  placeName: PlaceName;
  abbrev: string;
  logo: string;
  darkLogo: string;
  awaySplitSquad?: boolean;
  score?: number;
  radioLink?: string;
  odds?: Odd[];
  homeSplitSquad?: boolean;
}

interface Odd {
  providerId: number;
  value: string;
}

interface PlaceName {
  default: string;
  fr?: string;
}

interface GameOutcome {
  lastPeriodType: PeriodType;
}

interface PeriodDescriptor {
  number: number;
  periodType: PeriodType;
}

interface SeriesStatus {
  round: number;
  seriesAbbrev: SeriesAbbrev;
  seriesLetter: string;
  neededToWin: number;
  topSeedTeamAbbrev: string;
  topSeedWins: number;
  bottomSeedTeamAbbrev: string;
  bottomSeedWins: number;
  gameNumberOfSeries: number;
}

interface TvBroadcast {
  id: number;
  market: Market;
  countryCode: CountryCode;
  network: string;
  sequenceNumber: number;
}

interface Venue {
  default: string;
}

interface WinningGoal {
  playerId: number;
  firstInitial: Venue;
  lastName: LastName;
}

interface LastName {
  default: string;
  cs?: string;
  sk?: string;
  fi?: string;
}

interface OddsPartner {
  partnerId: number;
  country: string;
  name: string;
  imageUrl: string;
  siteUrl?: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}
