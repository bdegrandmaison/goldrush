import {
  isTreasure,
  isMountain,
  isTile,
  isMap,
  isPlayer,
  isGame,
} from "./interfaces";
import { advance, turn } from "./util";

export class Mountain {
  constructor(readonly x: number, readonly y: number) {
    this.x = x;
    this.y = y;
  }

  output() {
    return ["M", this.x, this.y];
  }
}

export class Treasure {
  constructor(readonly x: number, readonly y: number, public count: number) {
    this.x = x;
    this.y = y;
    this.count = count;
  }

  output() {
    return ["T", this.x, this.y, this.count];
  }
}

export class Tile implements isTile {
  treasure = 0;
  onPosition = false;
  constructor(readonly x: number, readonly y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Map implements isMap {
  constructor(
    readonly x: number,
    readonly y: number,
    public map?: isTile[][] | undefined
  ) {
    this.x = x;
    this.y = y;
    this.map = this.createMap();
  }

  output() {
    return ["C", this.x, this.y];
  }

  createMap(): isTile[][] {
    if (!this.map) {
      let map: isTile[][] = [];
      for (let i = 0; i < this.x; i++) {
        let line: isTile[] = [];
        for (let a = 0; a < this.y; a++) {
          line.push(new Tile(i, a));
        }
        map.push(line);
      }
      this.map = map;
    }
    return this.map;
  }
}

export class Player implements isPlayer {
  constructor(
    readonly name: string,
    readonly x: number,
    readonly y: number,
    public orientation: string,
    readonly actionList: string,
    public treasureCount: number = 0
  ) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.actionList = actionList;
    this.treasureCount = treasureCount;
  }

  output() {
    if (this.treasureCount === 0)
      return ["A", this.name, this.x, this.y, this.orientation];
    return [
      "A",
      this.name,
      this.x,
      this.y,
      this.orientation,
      this.treasureCount,
    ];
  }

  play(value: number, mapDef: isMap, treasures: isTreasure[]) {
    this.actionList.charAt(value) === "A"
      ? advance(this, mapDef, treasures)
      : turn(this.actionList.charAt(value), this);
  }
}

export class Game implements isGame {
  constructor(
    readonly map: isMap,
    readonly players: isPlayer[],
    readonly maxActions: number,
    readonly mountains: isMountain[],
    public treasures: isTreasure[],
    public history: (string | number)[][][],
    public played: boolean = false
  ) {
    this.map = map;
    this.players = players;
    this.maxActions = maxActions;
    this.mountains = mountains;
    this.treasures = treasures;
    this.history = history;
    this.played = played;
  }

  createHistory() {
    let step = [];
    step.push(this.map.output());
    if (this.mountains.length)
      this.mountains.forEach((mont) => step.push(mont.output()));
    if (this.treasures.length)
      this.treasures.forEach(
        (treasure) => treasure.count && step.push(treasure.output())
      );
    this.players.forEach((player) => step.push(player.output()));
    this.history.push(step);
  }

  async playGame() {
    if (!this.played) {
      for (let i = 0; i < this.maxActions; i++) {
        this.players.forEach((player) => {
          player.play(i, this.map, this.treasures);
          this.createHistory();
        });
      }
      this.played = true;
    }
  }
}
