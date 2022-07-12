const arrowFunction = require('../app/e3n1e2');

/* 
Al substituir una funcio qualsevol per una mock function 
console.log() = jest.fn();
el que fas es substituir les crides a console.log per crides a una
funcio de la qual pots saber tot, el que torna
*/

describe(`Intended use, amb console.log(param) al callback i un mock de console.log`, () => {
    console.log = jest.fn();
    test(`Si li passes good ha de sortir un missatges en concret`, () => {
        arrowFunction(`good`, (param) => {console.log(param);});
        expect(console.log.mock.calls.length).toBe(1); 
        expect(console.log.mock.calls[0][0]).toBe(`allz goood my fren`);
    });
    test(`Si li passes bad ha de sortir un altre missatge`, () => {
        arrowFunction(`bad`, (param) => {console.log(param);});
        expect(console.log.mock.calls.length).toBe(2); 
        expect(console.log.mock.calls[1][0]).toBe(`what is even happening OMG`);
    });
    test(`Si li passes qualsevol altra cosa ha de sortir un tercer missatge en concret`, () => {
        arrowFunction(``, (param) => {console.log(param);});
        arrowFunction(new Object(), (param) => {console.log(param);});
        expect(console.log.mock.calls.length).toBe(4); 
        expect(console.log.mock.calls[2][0]).toBe(`I hadn't planned for this...`);
        expect(console.log.mock.calls[3][0]).toBe(`I hadn't planned for this...`);
    });
});

describe(`Ara canvio el log per una mock function i prou`, () => {
    mockFunctionInCallback = jest.fn();
    test(`Si li passes good ha de sortir un missatges en concret`, () => {
        arrowFunction(`good`, (param) => {mockFunctionInCallback(param);});
        expect(mockFunctionInCallback.mock.calls.length).toBe(1); 
        expect(mockFunctionInCallback.mock.calls[0][0]).toBe(`allz goood my fren`);
    });
    test(`Si li passes bad ha de sortir un altre missatge`, () => {
        arrowFunction(`bad`, (param) => {mockFunctionInCallback(param);});
        expect(mockFunctionInCallback.mock.calls.length).toBe(2); 
        expect(mockFunctionInCallback.mock.calls[1][0]).toBe(`what is even happening OMG`);
    });
    test(`Si li passes qualsevol altra cosa ha de sortir un tercer missatge en concret`, () => {
        arrowFunction(``, (param) => {mockFunctionInCallback(param);});
        arrowFunction(new Object(), (param) => {mockFunctionInCallback(param);});
        expect(mockFunctionInCallback.mock.calls.length).toBe(4); 
        expect(mockFunctionInCallback.mock.calls[2][0]).toBe(`I hadn't planned for this...`);
        expect(mockFunctionInCallback.mock.calls[3][0]).toBe(`I hadn't planned for this...`);
    });
});
