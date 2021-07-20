import { Game, Map, Treasure, Player, Mountain } from "./gameClasses";

import { isMap, isPlayer, isTreasure, isMountain } from "./interfaces";

export default async function gameInit(arr: (string | number)[][]) {
  let mapDef: isMap | undefined = undefined;
  let players: isPlayer[] = [];
  let maxActions: number | undefined = undefined;
  let mountains: isMountain[] = [];
  let treasures: isTreasure[] = [];
  let history: (string | number)[][][] = [];
  arr.forEach((el) => {
    if (
      el[0] === "C" &&
      typeof el[1] === "number" &&
      typeof el[2] === "number" &&
      el[1] >= 0 &&
      el[2] >= 0 &&
      el[1] * el[2] > 0 &&
      el[1] * el[2] <= 85182
    ) {
      if (!mapDef) {
        mapDef = new Map(el[1], el[2]);
      } else {
        return "La carte ne peut être définie qu'une seule fois";
      }
    }
    if (mapDef && mapDef.map) {
      if (
        el[0] === "M" &&
        typeof el[1] === "number" &&
        typeof el[2] === "number" &&
        mapDef.map[el[1]][el[2]] &&
        !mapDef.map[el[1]][el[2]].onPosition
      ) {
        mapDef.map[el[1]][el[2]].onPosition = true;
        mountains.push(new Mountain(el[1], el[2]));
      }
      if (
        el[0] === "T" &&
        typeof el[1] === "number" &&
        typeof el[2] === "number" &&
        typeof el[3] === "number" &&
        mapDef.map[el[1]][el[2]] &&
        el[3] >= 0
      ) {
        if (!mapDef.map[el[1]][el[2]].treasure) {
          let treasure = new Treasure(el[1], el[2], el[3]);
          treasures.push(treasure);
          mapDef.map[el[1]][el[2]].treasure = treasure.count;
        } else {
          return "les trésors d'une même case doivent être définie sur une ligne";
        }
      }
      if (
        el[0] === "A" &&
        el.length === 6 &&
        typeof el[1] === "string" &&
        typeof el[2] === "number" &&
        typeof el[3] === "number" &&
        typeof el[4] === "string" &&
        typeof el[5] === "string" &&
        mapDef.map[el[2]][el[3]] &&
        !mapDef.map[el[2]][el[3]].onPosition &&
        ["N", "S", "E", "O"].includes(el[4]) &&
        el[5].length === el[5].match(/[A,D,G]/g)?.length
      ) {
        let player = new Player(el[1], el[2], el[3], el[4], el[5]);
        players.push(player);
        mapDef.map[el[2]][el[3]].onPosition = true;
        if (!maxActions) {
          maxActions = el[5].length;
        } else {
          if (maxActions < el[5].length) maxActions = el[5].length;
        }
      }
    }
  });
  history.push(arr);
  if (mapDef && players.length > 0 && maxActions) {
    const game = new Game(
      mapDef,
      players,
      maxActions,
      mountains,
      treasures,
      history
    );
    await game.playGame();
    return game;
  } else {
    return "Erreur dans le fichier de données";
  }
}
