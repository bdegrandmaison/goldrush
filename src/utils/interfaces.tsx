export interface isTreasure {
  x: number;
  y: number;
  count: number;
  output(): (string | number)[];
}

export interface isMountain {
  x: number;
  y: number;
  output(): (string | number)[];
}

export interface isTile {
  x: number;
  y: number;
  treasure: number;
  onPosition: boolean;
}

export interface isMap {
  x: number;
  y: number;
  map?: isTile[][];
  createMap(): isTile[][];
  output(): (string | number)[];
}

export interface isPlayer {
  name: string;
  x: number;
  y: number;
  actionList: string;
  orientation: string;
  treasureCount: number;
  play(value: number, mapDef: isMap, treasures: isTreasure[]): any;
  output(): (string | number)[];
}

export interface isGame {
  map: isMap;
  players: isPlayer[];
  maxActions: number;
  mountains: isMountain[];
  treasures: isTreasure[];
  history: (string | number)[][][];
  played: boolean;
  playGame(): any;
}
