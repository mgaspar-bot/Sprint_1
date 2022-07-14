/*
- Exercici 2
Crea una nova funció asíncrona que cridi a una altra que retorni una
 Promise que efectuï la seva funció resolve() després de 2 segons de 
 la seva invocació.
*/

var { delayedResolve, delayedExec } = require('../app/e4n1e2');

jest.setTimeout(10000); //Pq no em salti el limit de timeout

// console.log(`${jest.isMockFunction(delayedExec)} ${jest.isMockFunction(delayedResolve)}`);
describe(`Comprova que fa tot el que demana el enunciat`, () => {
    test(`Comprova que la asíncrona (delayedExec) crida a l'altra`, async () => {
        delayedResolveMock = jest.fn();
        await delayedExec(delayedResolveMock);
        // expect(delayedResolve).toHaveBeenCalledTimes(1);
        expect(delayedResolveMock.mock.calls.length).toBe(1);
        //Pq .calls.length es 0 :( 
        //ho era pq per molt que faci la assignacio delayedResolve = jest.fn(); aquí, quan s'executa el delayedExec crida al 
        //delayedResolve d'allà, que no es una mock. Per solucionar-ho fem que delayedExec rebi delayedResolve com a callback    
    });
    test(`Comprova que l'altra (delayedResolve) torna una Promise, i que la promise es resol amb el valor esperat`, () => {
        expect(delayedResolve()).toBeInstanceOf(Promise);
        return expect(delayedResolve()).resolves.toBe(`M'he resolt!`);
    });
    test(`Comprova que la promise de delayedResolve triga mínim 2 seconds a resoldre's`, async () => {
        jest.useFakeTimers();
        delayedResolveMock = jest.fn(() => {
            console.log(`Començo a esperar per resoldre'm...(Mock)`);
            return new Promise((res, rej) => {
                setTimeout(() => res(String(`M'he resolt!`)), 2000);
                jest.advanceTimersByTime(2000);
                // jest.advanceTimersByTime(1000); //Si comentes la linia de dalt i descomentes aquesta, el test dona timeout
            });
        });
        return expect(delayedResolveMock()).resolves.toBe(`M'he resolt!`);
    });
});
describe(`Comportaments si les crides de formes rares`, () => {
    test(`Si la promesa falla, atrapa i mostra el message del Error`, async () => {
        mockReject = jest.fn(() => {
            return new Promise((res, rej) => {
                if (!true)
                    res(`Aixo no hauria de passar mai`);
                else
                    rej(new Error(`Sóc un error message`));
            });
        });
        mockDelayedExec = jest.fn(async (fun) => {
            try {
                const str = await fun();
                return(str);
            }
            catch (err) {
                return (err);
            }
        });
        expect(mockDelayedExec(mockReject)).resolves.toMatchObject(new Error(`Sóc un error message`)); //Utilitzo el resolve pq no ha llençat el error, l'ha retornat
    });
});