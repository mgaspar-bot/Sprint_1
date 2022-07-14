/*
- Exercici 2
Crea una nova funció asíncrona que cridi a una altra que retorni una
 Promise que efectuï la seva funció resolve() després de 2 segons de 
 la seva invocació.
*/

var {delayedResolve, delayedExec} = require('../app/e4n1e2');

jest.setTimeout(20000); //Pq no em salti el limit de timeout

// console.log(`${jest.isMockFunction(delayedExec)} ${jest.isMockFunction(delayedResolve)}`);

test(`Comprova que la asincrona (delayedExec) crida a l'altra`, async () => {
    delayedResolveMock = jest.fn();
    await delayedExec(delayedResolveMock);
    // expect(delayedResolve).toHaveBeenCalledTimes(1);
    expect(delayedResolveMock.mock.calls.length).toBe(1); //Pq .calls.length es 0 :( 
    //ho era pq tot i que faig la assignacio delayedResolve = jest.fn(); aquí, quan s'executa el delayedExec crida al 
    //delayedResolve d'allà, que no es una mock. Per solucionar-ho fem que delayedExec rebi delayedResolve com a callback    
});
test(`Comprova que aquesta altra (delayedResolve) torna una Promise, i que la promise es resol amb el valor esperat`, () => {
    expect(delayedResolve()).toBeInstanceOf(Promise);
    expect(delayedResolve()).resolves.toBe(`M'he resolt!`);
});
test(`Comprova que la promise de delayedResolve triga uns 2 segons a resoldre's`, () => {
    
})