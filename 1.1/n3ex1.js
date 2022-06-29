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

