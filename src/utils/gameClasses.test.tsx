import { Tile, Map, Player } from "./gameClasses";

const mapDef = ['C', 3, 4];
const playerDef = ['A', 'Lara', 1 ,1, 'S', 'AADADAGGA']

const testMap = new Map(...mapDef);
testMap.createMap;
const testPlayer= new Player(...playerDef)
const desiredPlayer = {
    letter: 'A',
    name: 'Lara',
    x: 1,
    y: 1,
    orientation: 'S',
    actionList: 'AADADAGGA',
    treasure: 0
}

const desiredMap= { 
    letter: 'C',
    x: 3,
    y: 4,
    map: [
        [new Tile(0,0), new Tile(0,1),new Tile(0,2)],
        [new Tile(1,0), new Tile(1,1),new Tile(1,2)],
        [new Tile(2,0), new Tile(2,1),new Tile(2,2)],
        [new Tile(3,0), new Tile(3,1),new Tile(3,2)]
    ]
} 

test('la carte est elle bonne', () => {
    expect(testMap).toMatchObject(desiredMap);
});
test('le joueur est bien le même', () => {
    expect(testPlayer).toMatchObject(desiredPlayer);
});

