/*
- Exercici 2
Crea una nova funció asíncrona que cridi a una altra que retorni una
 Promise que efectuï la seva funció resolve() després de 2 segons de 
 la seva invocació.
*/

var {delayedResolve, delayedExec} = require('../app/e4n1e2');
// import delayedResolve from '../app/e4n1e2';
// import delayedExec from '../app/e4n1e2';

jest.setTimeout(20000);

// jest.mock(delayedResolve);
jest.enableAutomock();

describe(`Comprovo que la asíncrona crida a l'altra`, () => {
    test(`aqui va el expect`, async () => {
        await delayedExec();
        // console.log(`${delayedResolve}`);
        expect(delayedResolve.mock.calls.length).toBe(1); //Pq .calls.length es 0 :(
    });
});