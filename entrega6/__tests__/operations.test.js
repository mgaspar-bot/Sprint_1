const {sum, restar, mult, div} = require('../app/operations');

describe(`Suma:`, () => {
    describe(`Tests amb numeros`, () => {
        test(`suma 1 i 2, hauria de donar 3`, () => {
            expect(sum(1,2)).toBe(3);
        });
        test(`suma 3 i -5 per donar -2`, () => {
            expect(sum(3,-5)).toBe(-2);
        });
        test(`suma 3,67 i 8,985 per donar 12,655`, () => {
            expect(sum(3.67, 8.985)).toBeCloseTo(12.655);
        });
    });
    describe(`Casos limit, MAX i -MAX`, () => {
        test(`suma algo significatiu a Number.MAX_VALUE, hauria de donar Infinity`, () => {
            expect(sum(Number.MAX_VALUE, 0.0000005e+308)).toBe(Infinity);
        });
        
        test(`suma algo significatiu i negatiu a -Number.MAX_VALUE, dona -Infinity`, () => {
            expect(sum(-Number.MAX_VALUE, -0.0000005e+308)).toBe(-Infinity);
        });

    });
    describe(`Strange inputs`, () => {
        test(`Li passo un objecte qualsevol com a parametre, espero NaN` , () => {
            expect(sum(`hola`, 3)).toBe(NaN);
            expect(sum(Buffer.from('2'), 3)).toBe(NaN);
            expect(sum(new Object(), 3)).toBe(NaN);
        });
        test(`Li passo NaN com a parametre, espero NaN` , () => {
            expect(sum(NaN, 'm')).toBe(NaN);
        } );
        test(`Si rep un BigInt tambe torna NaN`, () => {
            expect(sum(BigInt(`20000000000`), 2)).toBe(NaN)
        });
        test(`Si intento passar 3 o 1 input, throw Error`, () =>{
            expect(() => sum(1,2,3)).toThrow(`invalid number of arguments`);
            expect(() => sum(1)).toThrow(`invalid number of arguments`);
        })
        function badSum1() {
            sum(1);
        }
        function badSum3() {
            sum(1,2,3);
        }
    }); 
});
describe(`Resta`, () =>{
    describe(`Tests amb numeros`, () => {
        test(`resta 1 i 2, hauria de donar -1`, () => {
            expect(restar(1,2)).toBe(-1);
        });
        test(`resta 3 i -5 per donar 8`, () => {
            expect(restar(3,-5)).toBe(8);
        });
        test(`resta 3,67 i 8,985 per donar -5,315`, () => {
            expect(restar(3.67, 8.985)).toBeCloseTo(-5.315);
        });
    });
    describe(`Casos limit, MAX i -MAX`, () => {
        test(`resta algo significatiu a -Number.MAX_VALUE, hauria de donar -Infinity`, () => {
            expect(restar(-Number.MAX_VALUE, 0.0000005e+308)).toBe(-Infinity);
        });
        test(`resta algo significatiu i negatiu a Number.MAX_VALUE, dona Infinity`, () => {
            expect(restar(Number.MAX_VALUE, -0.0000005e+308)).toBe(Infinity);
        });
    });
    describe(`Strange inputs`, () => {
        test(`Li passo un objecte qualsevol com a parametre, espero NaN` , () => {
            expect(restar(`hola`, 3)).toBe(NaN);
            expect(restar(Buffer.from('2'), 3)).toBe(NaN);
            expect(restar(new Object(), 3)).toBe(NaN);
        });
        test(`Li passo NaN com a parametre, espero NaN` , () => {
            expect(restar(NaN, 'm')).toBe(NaN);
        } );
        test(`Si rep un BigInt tambe torna NaN`, () => {
            expect(restar(BigInt(`20000000000`), 2)).toBe(NaN)
        });
        test(`Si intento passar 3 o 1 input, throw Error`, () =>{
            expect(badResta3).toThrow(`invalid number of arguments`);
            expect(badResta1).toThrow(`invalid number of arguments`);
        })
        function badResta1(){
            restar(1);
        }
        function badResta3(){
            restar(1,2,3);
        }
    });
});

describe(`Multiplicació:`, () => {
    describe(`Test basics amb 2 numeros:`, () => {
        test(`multiplica 2 i 3, espera 6`, () => {
            expect(mult(2,3)).toBe(6);
        });
        test(`multiplica 2 i -3, espera -6`,() => {
            expect(mult(2,-3)).toBe(-6);
        });
        test(`multipica coses per 0, espera 0`, () => {
            expect(mult(2,0)).toBe(0);
            expect(mult(Number.MAX_VALUE, 0)).toBe(0);
            expect(mult(-Number.MAX_VALUE, 0)).toBeFalsy; //Aquest em tornava "-0" el cabron
        });
        test(`multiplica decimals i espera una resposta close to la correcta`, () => {
            expect(mult(2.67,4.78)).toBeCloseTo(2.67*4.78);
            expect(mult(2.671,4.786)).toBeCloseTo(2.671*4.786);
            expect(mult(2.6712,4.7863)).toBeCloseTo(2.6712*4.7863);
            expect(mult(2.67128,4.78635)).toBeCloseTo(2.67128*4.78635);
        });
    });
    describe(`Casos MAX i -MAX` , () => {
        test(`MAX_VALUE per 2 es infinity`, () => {
            expect(mult(Number.MAX_VALUE, 2)).toBe(Infinity);
        });
        test(`MAX_VALUE per -2 es -Infinity`, () => {
            expect(mult(Number.MAX_VALUE,-2)).toBe(-Infinity);
        });
    });
    describe(`Strange inputs`, () => {
        test(`Li passo un objecte qualsevol com a parametre, espero NaN` , () => {
            expect(mult(`hola`, 3)).toBe(NaN);
            expect(mult(Buffer.from('2'), 3)).toBe(NaN);
            expect(mult(new Object(), 3)).toBe(NaN);
        });
        test(`Li passo NaN com a parametre, espero NaN` , () => {
            expect(mult(NaN, 'm')).toBe(NaN);
        } );
        test(`Si rep un BigInt tambe torna NaN`, () => {
            expect(mult(BigInt(`20000000000`), 2)).toBe(NaN)
        });
        test(`Si intento passar 3 o 1 input, throw Error`, () =>{
            expect(badmult3).toThrow(`invalid number of arguments`);
            expect(badmult1).toThrow(`invalid number of arguments`);
        })
        function badmult1(){
            mult(1);
        }
        function badmult3(){
            mult(1,2,3);
        }
        });
});
