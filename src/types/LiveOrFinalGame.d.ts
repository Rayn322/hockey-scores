type Venue = {
  default: string;
};

type Team = {
  id: number;
  commonName: {
    default: string;
  };
  abbrev: string;
  score: number;
  sog: number;
  logo: string;
  radioLink: string;
  placeName: {
    default: string;
  };
};

type Player = {
  playerId: number;
  sweaterNumber: number;
  name: {
    default: string;
  };
  position: "C" | "L" | "R" | "D" | "G";
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  pim: number;
  hits: number;
  powerPlayGoals: number;
  shots: number;
  faceoffWinningPctg: number;
  toi: string;
};

type GamePeriodDescriptor = {
  number: number;
  periodType: "REG" | "OT";
};

type Goalie = Player & {
  evenStrengthShotsAgainst: string;
  powerPlayShotsAgainst: string;
  shorthandedShotsAgainst: string;
  saveShotsAgainst: string;
  savePctg: string;
  evenStrengthGoalsAgainst: number;
  powerPlayGoalsAgainst: number;
  shorthandedGoalsAgainst: number;
  goalsAgainst: number;
};

type GameState = "FUT" | "LIVE" | "CRIT" | "FINAL" | "OFF";

type GameScheduleState = "OK";

type Summary = {
  linescore: {
    byPeriod: {
      periodDescriptor: GamePeriodDescriptor;
      away: number;
      home: number;
    }[];
    totals: {
      away: number;
      home: number;
    };
  };
  shotsByPeriod: {
    periodDescriptor: GamePeriodDescriptor;
    away: number;
    home: number;
  }[];
  teamGameStats: {
    category: string;
    awayValue: number | string;
    homeValue: number | string;
  }[];
  seasonSeries: {
    id: number;
    season: number;
    gameType: number;
    gameDate: string;
    startTimeUTC: string;
    easternUTCOffset: string;
    venueUTCOffset: string;
    gameState: GameState;
    gameScheduleState: GameScheduleState;
    awayTeam: Team & { score: number };
    homeTeam: Team & { score: number };
    clock: {
      timeRemaining: string;
      secondsRemaining: number;
      running: boolean;
      inIntermission: boolean;
    };
    gameCenterLink: string;
    periodDescriptor: GamePeriodDescriptor & { otPeriods?: number };
    gameOutcome: {
      lastPeriodType: "REG" | "OT";
      otPeriods?: number;
    };
  }[];
};

export type LiveOrFinalGame = {
  id: number;
  season: number;
  gameType: number;
  limitedScoring: boolean;
  gameDate: string;
  venue: Venue;
  venueLocation: Venue;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  tvBroadcasts: {
    id: number;
    market: string;
    countryCode: string;
    network: string;
    sequenceNumber: number;
  }[];
  gameState: GameState;
  gameScheduleState: GameScheduleState;
  periodDescriptor: GamePeriodDescriptor & { regPeriods?: number };
  regPeriods: number;
  awayTeam: Team & { forwards: Player[]; defense: Player[]; goalies: Goalie[] };
  homeTeam: Team & { forwards: Player[]; defense: Player[]; goalies: Goalie[] };
  clock: {
    timeRemaining: string;
    secondsRemaining: number;
    running: boolean;
    inIntermission: boolean;
  };
  playerByGameStats: {
    awayTeam: Team & { forwards: Player[]; defense: Player[]; goalies: Goalie[] };
    homeTeam: Team & { forwards: Player[]; defense: Player[]; goalies: Goalie[] };
  };
  summary: Summary;
};
