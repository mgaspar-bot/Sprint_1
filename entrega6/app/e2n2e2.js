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