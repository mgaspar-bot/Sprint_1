/*
- Exercici 1
Crea una funció que retorni una Promise que invoqui la funció 
resolve() o reject() que rep. Invoca-la passant-li les dues funcions de 
manera que imprimeixin un missatge diferent depenent de si la Promise
 es resol o no.
*/

let numRandom = Math.random() *10;

function tornaPromise() 
{
	return new Promise( function (resolve, reject) { 
		if (numRandom >= 5)
			resolve(`5 o mes, has guanyat!`);
		else
			reject(`menys de 5, has perdut!`);
	} ) ;
} 
let promesa1 = tornaPromise();
promesa1
	.then( (unNomQualsevol) => {console.log(unNomQualsevol); } )
	.catch( (err) => {console.log(err);} );

/*
- Exercici 2
Crea una arrow function que rebi un paràmetre i una funció callback 
i li passi a la funció un missatge o un altre 
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

/*
- Exercici 1
Donats els objectes employees i salaries, crea una arrow function 
getEmployee() que retorni una Promise efectuant
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

function searchInArray(id, array)
{
	for (let actual of array)
	{
		if (actual.id === id)
		{
			return (actual);
		}
	}
	return (false);
}

let getEmployee = (id) => new Promise ( (res, rej) => {
	let searchResult = searchInArray(id, employees)
	if (searchResult === false) //puc escriure-ho com !searchResult ??
	{
		rej( new Error( `No hi ha cap empleat amb aquest id`) );
	}
	else
	{
		res(searchResult);
	}
} );

/*getEmployee(2)
			.then((trobat) => {console.log(`${trobat.name}`);} )
			.catch( (err) => {console.log(err.message);});*/

/*
- Exercici 2
Crea una altra arrow function getSalary() 
similar a l'anterior que rebi com a paràmetre un objecte employee i retorni el seu salari.
*/

let getSalary = (empTrobat) => new Promise ( (res, rej) => { 
	let searchResult = searchInArray(empTrobat.id, salaries);
	if (searchResult === false)
		rej(new Error(`Aquest empleat no te cap salari xD`));
	else
		res(searchResult);
} );




