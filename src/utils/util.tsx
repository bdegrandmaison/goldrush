import { isMap, isPlayer, isTreasure } from "./interfaces";

export function turn(str: string, player: isPlayer) {
  if (str === "D") {
    switch (player.orientation) {
      case "N":
        player.orientation = "E";
        break;
      case "E":
        player.orientation = "S";
        break;
      case "S":
        player.orientation = "O";
        break;
      case "O":
        player.orientation = "N";
        break;
      default:
        break;
    }
  }
  if (str === "G") {
    switch (player.orientation) {
      case "N":
        player.orientation = "O";
        break;
      case "O":
        player.orientation = "S";
        break;
      case "S":
        player.orientation = "E";
        break;
      case "E":
        player.orientation = "N";
        break;
      default:
        break;
    }
  }
}

export function goldSeek(
  player: isPlayer,
  mapDef: isMap,
  treasures: isTreasure[]
) {
  if (mapDef.map && mapDef.map[player.x][player.y].treasure) {
    mapDef.map[player.x][player.y].treasure--;
    player.treasureCount++;
    treasures = treasures
      .map((el) => {
        if (el.x === player.x && el.y === player.y) el.count--;
        return el;
      })
      .filter((ele) => ele.count);
  }
}

export function advance(
  player: isPlayer,
  mapDef: isMap,
  treasures: isTreasure[]
) {
  switch (player.orientation) {
    case "N":
      if (
        mapDef.map &&
        mapDef.map[player.x][player.y - 1] &&
        !mapDef.map[player.x][player.y - 1].onPosition
      ) {
        mapDef.map[player.x][player.y].onPosition = false;
        player.y--;
        mapDef.map[player.x][player.y].onPosition = true;
        goldSeek(player, mapDef, treasures);
      }

      break;
    case "S":
      if (
        mapDef.map &&
        mapDef.map[player.x][player.y + 1] &&
        !mapDef.map[player.x][player.y + 1].onPosition
      ) {
        mapDef.map[player.x][player.y].onPosition = false;
        player.y++;
        mapDef.map[player.x][player.y].onPosition = true;
        goldSeek(player, mapDef, treasures);
      }

      break;
    case "O":
      if (
        mapDef.map &&
        mapDef.map[player.x - 1][player.y] &&
        !mapDef.map[player.x - 1][player.y].onPosition
      ) {
        mapDef.map[player.x][player.y].onPosition = false;
        player.x--;
        mapDef.map[player.x][player.y].onPosition = true;
        goldSeek(player, mapDef, treasures);
      }

      break;
    case "E":
      if (
        mapDef.map &&
        mapDef.map[player.x + 1][player.y] &&
        !mapDef.map[player.x + 1][player.y].onPosition
      ) {
        mapDef.map[player.x][player.y].onPosition = false;
        player.x++;
        mapDef.map[player.x][player.y].onPosition = true;
        goldSeek(player, mapDef, treasures);
      }

      break;

    default:
      break;
  }
}
