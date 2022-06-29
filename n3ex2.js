/*
- Exercici 2
Crea una funció anònima autoinvocable 
igualada a una variable que mostri per consola el nom de l'usuari/ària a rebut com a paràmetre.
*/

const funcioAnonimaAutoinvocable = function (nom){ console.log(nom);}("Ei") ;




/*

//Si la faig anonima:
const funcioAnonima = function (nom) 
{
	console.log(nom);
}; 
//la variable funcio anonima te una referencia (punter?) a la funcio (al bloc d'instruccions), i puc cridar a la 
//funcio anonima si tinc la referencia. Aquesta referencia es el valor contingut en la variable, aixi que el puc 
//reassignar i de tot:
funcioAnonima("Joan");
let unaAltraVariable = funcioAnonima;
unaAltraVariable("Pere");
console.log(`A la linia 20 funcioAnonima es de tipus ${typeof(funcioAnonima)}`);

//Si la faig autoinvocable:
let funcioAutoinvocable = ( function (nom) {
	console.log(nom);
} ) ("Alba");  //La puc cridar just al declararla posantla entre parentesis 
console.log(`A la linia 26 funcioAutoinvocable es de tipus ${typeof(funcioAutoinvocable)}`);

//Pero despres no puc cridar-la altre cop:
//funcioAutoinvocable("foo");  					//s'executa bé fins aqui pero llavors explota, no pot dereferenciar 'undefined'

//El que esta passant es que a la variable funcioAutoinvocable ja no hi ha un punter a la funcio (bloc d'instruccions)
// ara a dins la variable funcioAutoinvocable hi ha el retorn de la crida:
funcioAutoinvocable = ( function (nom) 
{
	console.log(nom);
	return `123`;
} ) ("Maria"); 
console.log(funcioAutoinvocable);
console.log(`A la linia 39 funcioAutoinvocable es de tipus ${typeof(funcioAutoinvocable)}`);

//Si en aquest retorn torno una referencia a la propia funcio, puc cridar-la quan la declaro i a mes tornar-la 
//a cridar despres:
let funcioAraIDespres = function f (nom)
{
	console.log(nom);
	return f;
} ("Martina");																					//Sense posar-ho entre parentesi, només passant-li els arguments que espera just despres de declarar-la també ho enten com una "autoinvocacio"

funcioAraIDespres("Carles"); //funciona ara i funciona després :)
console.log(`A la linia 50 funcioAraIDespres es de tipus ${typeof(funcioAraIDespres)}`);

//Aquesta es com demana l'enunciat, s'autoinvoca, es guarda en una variable i despres li pots passar coses
// per parametre. Pero no es anonima. Funciona si la faig anonima i utilitzo el this pel retorn per exemple?
//No xD

funcioAraIDespres = function r (nom) 
{
	console.log(nom);
	return r;
} ("Joana");

//potser aixi també es "anonima" pq aixo no funciona:

// r("Pepito");


*/
