import inputToArray from "./inputToArray";

const input = "C - 3 - 4\r\nM - 1 - 0\r\nM - 2 - 1\r\nT - 0 - 3 - 2\r\nT - 1 - 3 - 3\r\nA - Lara - 1 - 1 - S - AADADAGGA\r\nA - Sara - 0 - 0 - S - AADADAGGA";
const testInput = inputToArray(input);

const desiredArray = [['C',3,4],['M',1,0],['M',2,1],['T',0,3,2],['T',1,3,3],['A','Lara',1,1,'S', 'AADADAGGA'],['A','Sara',0,0,'S', 'AADADAGGA']]

test('les entrées créent le bon tableau de données', () => {
    expect(testInput).toMatchObject(desiredArray);
});