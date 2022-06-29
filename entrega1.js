/*
- Exercici 1
Crea una funció que mostri per consola el nom d'usuari/ària en invocar-la passant-li el nom com a paràmetre.
*/

function hello(name)
{
    console.log(name);
}

hello("Marc");

/*
- Exercici 1
Mostra per consola el nom 
i cognoms de l'usuari/ària mitjançant template literals, guardant-los en variables i referenciant-les en la impressió del
 missatge.
*/

function hello1(nom, cognom)
{
    console.log(`${nom} ${cognom}`);
}

hello1("Omar", "Olmedo");

/*
- Exercici 2
Invoca una funció que retorni un valor des de dins d'una template literal.
*/

function hello(str)
{
    return (`${str}`);
    //return (`${str} ${typeof(str)} ${typeof(`${str}`)}`);
}
//El ${} es una crida a una funció que converteix el que li enviis a string sembla ser
//Si li poso un objecte a dins utilitzara el toString? Sembla que sí :)

console.log(hello(true));

/*
- Exercici 1
Crea una matriu de deu funcions i emplena-la mitjançant un bucle de manera que cada funció compti del 0 al 9 
per la consola. Invoca cada funció de l'array iterativament. Haurà de mostrar-se per consola el compte del 0 al 9 deu vegades.
*/

const matriuFuncions = [];

for (let i = 0; i < 10; i++)
{
    matriuFuncions.push(function () {
        for (let i = 0; i < 10; i++)
        {
            console.log(i);
        }
    }); //Aixo posa una funcio anònima que compta del 0 al 9 per consola a dins de la matriu.
}

let i = 1;
for (let funcio of matriuFuncions)
{
    funcio();
    console.log(`He acabat una funcio!! Han corregut ${i} funcions`);
    i++;
}

/*
- Exercici 2
Crea una funció anònima autoinvocable 
igualada a una variable que mostri per consola el nom de l'usuari/ària a rebut com a paràmetre.
*/

const funcioAnonimaAutoinvocable = function (nom){ console.log(nom);}("Ei") ;


