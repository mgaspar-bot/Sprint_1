/*
- Exercici 1
Mostra per la consola el resultat d'una arrow function autoinvocable que sumi dos nombres.
*/
console.log( ((a,b) => a+b) (2,4));


/*
- Exercici 1
Crea una arrow function que, rebent un paràmetre,
 retorni un objecte amb un atribut que tingui com a valor el paràmetre rebut.
*/

class objClass 
{
    constructor(param)
    {
        this.param = param;
    }
    toString()
    {
        return `Soc un objClass i tinc el valor ${this.param} al atribut param`;
    }
}
let pasaParamAlConstructor = (param) => new objClass(param);
let obj1 = pasaParamAlConstructor("Ei!");
console.log(`${obj1}`);

/*
- Exercici 2
Crea una classe "Persona" que rebi un paràmetre 'nom' en ser 
instanciada. La classe inclourà un mètode 
dirNom que imprimeixi per consola el paràmetre 'nom'.
 Invoca el mètode dirNom des de fora de la classe.
*/

const Persona =  function (nom) {
    const p = {
        nom : nom,
        // dirNom : () => { console.log(`${this.nom}`); } // in a function, 'this' refers to the global object
        dirNom : () => { console.log(`${nom}`); }
    };
    return p;
};
persona1 = Persona("Joan");
persona1.dirNom();
//console.log(persona1.nom);

/*
- Exercici 1
Escriu una function creadora d'objectes que faci instàncies
 d'una classe abstracta. Invoca-la amb diferents definicions.
*/

class AbsClass //Creo una classe amb un constructor inutilitzable
{
    constructor ( )
    {
        throw new Error(`No es pot construir una objecte amb aquest constructor :(`);
    }
}

function createInstance (name) //Encara que AbsClass no tingui constructor, AbsClass te un prototype
{
    let inst = Object.create(AbsClass.prototype); //Obect.create crea un nou objecte amb el prototype que li diguis
    inst.name = name;
    return inst;
}

let unaCosa = createInstance(`Aixo`);
let altraCosa = createInstance(`Allo`);

console.log(unaCosa instanceof AbsClass); //Encara que no hi hagi constructor, unaCosa te el prototip que ha definit AbsClass, i per tant n'es una instancia
console.log(altraCosa instanceof AbsClass);



