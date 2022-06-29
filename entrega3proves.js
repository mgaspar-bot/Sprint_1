/*
- Exercici 1
Crea una funció que retorni una Promise que invoqui la funció resolve() o reject() que rep. Invoca-la passant-li les
dues funcions de manera que imprimeixin un missatge diferent depenent de si la Promise es resol o no.
*/
let numRandom = Math.random() * 10;

function resolveThis (message){
	console.log(`Sóc la resolve definida per tu`);
	return message;
}
function rejectThis (message){
	console.log(`Sóc la reject definida per tu`); //Aquests missatges no es mostren mai, és impossible definir reject i resolve?
	return message;                                     //Tot i aixi tornaPromise funciona bé.      
}
function tornaPromise(resolve, reject)
{
	return new Promise( function (resolve, reject) { 
		if (numRandom >= 5)
			resolve(`5 o mes, has guanyat! promesa1`);
		else
			reject(`menys de 5, has perdut! promesa1`);
	} ) ;
}

let promesa1 = tornaPromise(resolveThis, rejectThis);
promesa1
	.then( (unValorDeRetornAmbUnNomQualsevol) => {console.log(unValorDeRetornAmbUnNomQualsevol); } )
	.catch( (err) => {console.log(err);} );

/*Comença antiex1*/

function tornaPromise2()
{
	return new Promise( function (reject, resolve) { 
		if (numRandom >= 5)
			resolve(`5 o mes, has guanyat! promesa2`);
		else
			reject(`menys de 5, has perdut! promesa2`);
	} ) ;
}

let promesa22 = tornaPromise2(resolveThis, rejectThis);
promesa22
	.then( (unValorDeRetornAmbUnNomQualsevol) => {console.log(unValorDeRetornAmbUnNomQualsevol); } )
	.catch( (err) => {console.log(err);} );

/*Acaba antiex1*/


let promesa2 = new Promise( function (resolve, reject) {
		if (numRandom >= 5)
		{
			resolve(`5 o mes, guanyes`);
		}
		else
		{
			//reject(numRandom);
			reject(new Error(`menys de 5, perds`));
		}
} );
//Imagino que el que està passant es que les funcions resolve i reject TORNEN un valor que llavors
//els callbacks de .then i .catch usen com a parametres respectivament
promesa2
	.then( (r) => {console.log(r);})
	.catch( (err) => {console.log( `${err} ${typeof(err)}` )} );
//igual que els objects i el toString, si faig `${err}` (err es un objecte Error s'enten) em printa Error : "el missatge"


/*
Preguntes sobre promises (resoltes crec)
	no es poden definir resolve i reject?
	son funcions que LO UNIC que fan es tornar els valors que els hi posis pq siguin usats pels callbacks de then i catch?
*/

/*
- Exercici 2
Crea una arrow function que rebi un paràmetre i una funció callback i li passi a la funció un missatge o un altre 
(que s'imprimirà per consola) en funció del paràmetre rebut.
*/

let arrowFunction = (param, cb) => {  //Aqui cb ("callback") es simplement un parametre, ni tan sols te un tipus de dades concret
	if (param === "good")
		cb(`allz goood my fren`);
	else if (param === "bad")
		cb(`what is even happening OMG`); //són aquestes frases de gracioset el que és param1 en realitat
	else
		cb(`I hadn't planned for this...`);
}

arrowFunction("bad", (param1) => { console.log(param1); } );  //Juraria que és aqui on estic definint que fa callback

/*Ojo!
param1 != param
El meu millor guess de lo que esta passant quan faig arrowFunction("bad", (param1) => { console.log(param1); } );
	primer va la crida de arrowFunction
	arrowFunction checkeja els if segons el PARAM que li he passat, en aquest cas "bad"
	segons el valor de param crida a cb
	cb es cridada amb un o altre PARAM1 ("allz is goood" "what is even happening OMG" etc)
	cb fa el que hagi de fer amb param1 segons com hagi DEFINIT CB EN LA CRIDA A arrowFunction
*/

/*
Si la classe Promise funciona igual que això de dalt:
es per aixo que no pots "definir " resolve i reject, pq quan crides al constructor de la Promise els resolve i reject
nomes son parametres, no tenen ni tan sols un tipus definit de dades. 

let prom = new Promise( (cb1, cb2) => {
		if (condicio)
			cb1( param1 );
		else
			cb2( param2 );
}

prom
		.then( (nomDeVariableQualsevolQuePrendraElValorDeparam1) => { fer coses amb el valor del param1} )
		.catch( ... );

Amb aquesta logica si ara reescric el exercici 1 però girant el ordre de reject i resolve en el constructor, la promise es resoldra 
quan la promise del exercici 1 falli i viceversa
pq el constructor de Promise nomes espera dos parametres, i utilitza el primer param per then i el segon param per catch
*/

/*
- Exercici 1
Donats els objectes employees i salaries, crea una arrow function getEmployee() que retorni una Promise efectuant
 la cerca en l'objecte pel seu id.
*/

let employees = [{
    id: 1,
    name: 'Linux Torvalds'
}, {
    id: 2,
    name: 'Bill Gates'
},{
    id: 3,
    name: 'Jeff Bezos'
}];
 
let salaries = [{
    id: 1,
    salary: 4000
}, {
    id: 2,
    salary: 1000
}, {
    id: 3,
    salary: 2000
}];

let getEmployee = (obj, id) => new Promise( (cb1,cb2) => {
    for (let actual of obj)
    {
        if (actual.id === id)
        {
            console.log(`trobat!`);
            cb1(actual);
            return; //puc utilitzar return sin mas per acabar?
        }
        console.log(`I'm in object: ${actual.id}`);
    }
    cb2(new Error(`No hi ha cap objecte amb aquest id`));

} ) ;
let salariBuscat = getEmployee(salaries, 2);
salariBuscat
        .then((objTrobat) => {console.log(`Salari amb id: ${objTrobat.id} i valor ${objTrobat.salary}`) ;} ) //aixo super be pero ara com recupero una referencia al objecte trobat?
        .catch( (err) => {console.log(err.message); } );
console.log(`${salariBuscat}`);




