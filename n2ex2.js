/*
- Exercici 2
Invoca una funció que retorni un valor des de dins d'una template literal.
*/

/*
class foo {
    #property;

    constructor(){};

    toString(){
        return `Hola! Sóc el toString()`;
    }
}*/

function hello(str)
{
    return (`${str}`);
    //return (`${str} ${typeof(str)} ${typeof(`${str}`)}`);
}
//El ${} es una crida a una funció que converteix el que li enviis a string sembla ser
//Si li poso un objecte a dins utilitzara el toString? Sembla que sí :)

console.log(hello(true));


/*
let obj = new foo();

console.log(hello(obj));
console.log(obj.toString());*/