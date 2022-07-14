const {employees, salaries, searchInArray, getEmployee, getSalary} = require('../app/e3n2');
/*
- Exercici 1
Donats els objectes employees i salaries, crea una arrow function 
getEmployee() que retorni una Promise efectuant
 la cerca en l'objecte pel seu id.
*/
describe(`Tests del getEmployee`, () => {
    test(`Espera simplement que torni una promise`, () => {
        expect(getEmployee(2)).toBeInstanceOf(Promise);
    });
    test(`Espera que la promise es resolgui i comprova que torna el employee adequat`, async () => {
        let employee = await getEmployee(2);
        expect(employee).toBeInstanceOf(Object);
        expect(employee).toMatchObject(employees[1]);
    });
    test(`Si el id no es dins de employees, llença el error 'No hi ha cap empleat amb aquest id'`, () => {
        // return getEmployee(6).catch((err) => {expect(...)}
        return expect(getEmployee(6)).rejects.toThrow('No hi ha cap empleat amb aquest id');
    });
    test(`Si el id no es un number, llença el error 'No hi ha..'`, () => {
        return expect(getEmployee('soc una string')).rejects.toThrow('No hi ha cap empleat amb aquest id');
        /* Si no troba la substring en el error.message (.toThrow('coses que no hi son al message' );)
        no es que no passi el test, es que
        deixa d'executar-se pq un modul de jest llença un error. Perque??
        
        era pq no havia posat el return!! no acabo d'entendre aixo de que de vegades
        s'hagi de retornar les Promises
         */
    });
    test(`Si rep mes d'un parametre nomes busca el primer`, async () => {
        let employee = await getEmployee(2,7);
        expect(employee).toMatchObject(employees[1]);
        employee = await getEmployee(1,7,89,'hola');
        expect(employee).toMatchObject(employees[0]);
        getEmployee(new Object(), 2).catch( (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('No hi ha cap empleat amb aquest id')
        });
        return expect(getEmployee(6,2,3)).rejects.toThrow('No hi ha cap empleat amb aquest id');
        //De moment el .rejects o .resolves sempre amb un return com si fos una formula magica
    });
    test(`Si no rep cap parametre, llença un error de no trobat`, async () => {
        return expect(getEmployee()).rejects.toThrow('No hi ha cap empleat amb aquest id');
    });
});
/*
- Exercici 2
Crea una altra arrow function getSalary() 
similar a l'anterior que rebi com a paràmetre un objecte employee i 
retorni el seu salari.
*/
describe(`Tests del getSalary`, () => {
    test(`Espera que torni una Promise`, () => {
        expect(getSalary(employees[1])).toBeInstanceOf(Promise);
    });
    test(`Espera que es resolgui la promise i comprova que es el salari adequat`, async () => {
        let salari = await getSalary(employees[1]);
        expect(typeof salari).toBe('object');   //typeof != toBeInstanceOf . Menys null i undefined, casi tot es una instancia de object
        expect(salari).toMatchObject(salaries[1]);
    });
    test(`Si el employee no te salari, llença el error de no trobat`, () => {  //He afegit el empleat Marc Gaspar. No té salari xD
        return expect(getSalary(employees[3])).rejects.toThrowError('Aquest empleat no te salari pobre');
    });
    test(`Si el que li passes una variable simple (que tambe es un Object), llença el error de no trobat`, () => {
        getSalary(4).catch( (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Aquest empleat no te salari pobre');
        });
        getSalary('tambe soc variable normal').catch( (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Aquest empleat no te salari pobre');
        });
        getSalary(true).catch( (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Aquest empleat no te salari pobre');
        });
        getSalary(false).catch( (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Aquest empleat no te salari pobre');
        });
        getSalary('').catch( (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Aquest empleat no te salari pobre');
        });
        getSalary(0).catch( (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Aquest empleat no te salari pobre');
        }); //Per ficar varios expects en un .catch nomes se m'acut escriure-ho aixi
        //La putada es que nomes que falli un test para tota l'execució
    });
    test(`Si li passes objecte qualsevol sense propietat id, llença el error de no trobat`, () => {
        const voidObject = {};
        return expect(getSalary(voidObject)).rejects.toThrowError('Aquest empleat no te salari pobre');
    });//Perque em llença un error de no trobat i no un Cannot read properties of...

    test(`Si no rep cap parametre llença un Cannot read properties...`, () => {
        return expect(getSalary()).rejects.toThrow('Cannot read properties of undefined');
        /* getSalary().catch( (error) => {
            expect(error).toBeInstanceOf(TypeError);
            expect(error.message).toBe(`Cannot read properties of undefined (reading 'id')`);
        }); */
    }); //Undefined i null no son un Object, potser es que el Cannot read properties... es un 'aixo hauria de ser un punter pero no puc dereferenciar-lo'
    test(`Si el que rep es un null, llença un Cannot read properties...`, () => {
        return expect(getSalary(null)).rejects.toThrow('Cannot read properties of null');
    });
    test(`Si rep mes d'un parametre, es comporta com si només hagués rebut el primer`, () => {
        return expect(getSalary(employees[1], null)).resolves.toMatchObject(salaries[1]);
    });
    test('Si rep mes d\'un parametre, es comporta com si només hagués rebut el primer', () => {
        return expect(getSalary(4,employees[1], 56)).rejects.toThrow(`Aquest empleat no te salari pobre`);
    });
    test('Si rep mes d\'un parametre, es comporta com si només hagués rebut el primer', () => {
        return expect(getSalary(undefined,employees[1], 56)).rejects.toThrow(`Cannot read properties`);
    });
});

/*  
Versio anterior dels test de Error al getEmployees i pq estaven malament:

test(`Si el id no es dins de employees, llença un error`, () => {
        // expect( async () => {await getEmployee(6)} ).toThrow('No hi cap empleat amb aquest id'); //Poso una funcio dins d'expect pq es el cridar-la el que throw error. Ha de ser async await pq fins que no es resol no tira error
        // expect(hola).toThrowError('No hi cap empleat amb');
    });
    async function hola() {
            // let emp = await getEmployee(6);
            try{
        let emp = await getEmployee(6);
        }catch(error){
        console.log(error.message);
    }
    } */ 
    //Tot aquest test escrit aixi no funciona perque, juraria, quan poses el await ell espera 
    //que la promise es resolgui, es com un .then
    //quan escrius expect(async () => {await getEmployee(6)} ) aquesta funcio asincrona
    //dins el expect és el parametre resolve del callback de la Promise
    //per aixo llença un Error que no es capturat, el callback reject esta sent usat
    //pero no l'estic definint enlloc
    //
    //Tot i aixi si ho escrius com
    //expect(async () => await getEmployee(new Object()) ).toThrowError;
    //Si que atrapa el Error, no se perque. Tampoc pots comprovar res del Error nose
    //qui l'ha llençat, quin .message te?