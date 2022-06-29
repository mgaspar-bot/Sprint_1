/*
- Exercici 1
Mostra per la consola el resultat d'una arrow function autoinvocable que sumi dos nombres.
*/

console.log( ((nom) => nom) ("Marc"));

/*Amb les arrow function estic definint una funcio anonima que rep lo que posis entre parentesi i torna el que
hi hagi despres de la fletxa

(nom) => nom 
és el mateix que:
function (nom) {return nom;}

si la poso entre parentesi l'estic cridant al moment
aqui sí que es necessari que defineixi la funcio entre parentesi pq, suposo, si no no distingeix lo que ha de 
tornar i el argument de la crida

*/