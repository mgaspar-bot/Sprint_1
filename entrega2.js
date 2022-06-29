/*
- Exercici 1
Mostra per la consola el resultat d'una arrow function autoinvocable que sumi dos nombres.
*/

console.log( ((nom) => nom) ("Marc"));


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
let creaObjIPosaParam = (param) => new objClass(param);
let obj1 = creaObjIPosaParam("Ei!");
console.log(`${obj1}`);

/*
- Exercici 2
Crea una classe "Persona" que rebi un paràmetre 'nom' en ser instanciada. La classe inclourà un mètode 
dirNom que imprimeixi per consola el paràmetre 'nom'. Invoca el mètode dirNom des de fora de la classe.
*/

class Persona 
{
    constructor(nom)
    {
        this.nom = nom;
    }
    dirNom()
    {
        console.log(`Hola el meu nom es ${this.nom}`);
    }
}

let persona1 = new Persona("Joan");
persona1.dirNom();

/*
- Exercici 1
Escriu una function creadora d'objectes que faci instàncies
 d'una classe abstracta. Invoca-la amb diferents definicions.
*/
