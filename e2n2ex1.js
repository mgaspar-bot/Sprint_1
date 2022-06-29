/*
- Exercici 1
Crea una arrow function que, rebent un paràmetre,
 retorni un objecte amb un atribut que tingui com a valor el paràmetre rebut.
*/

class obj 
{
    constructor(param)
    {
        this.param = param;
    }
}

console.log( ((param) => new obj(param)) ("Hola") );
