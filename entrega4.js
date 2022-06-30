/*
- Exercici 1
Crea una funció asíncrona que rebi un id d'empleat/da
 i imprimeixi per pantalla el nom de l'empleat/da i el seu salari, 
 usant les funcions getEmployee()
 i getSalary() que has definit a la tasca anterior.
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
},{
	id: 4,
	name: "Marc Gaspar"
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
		rej( new Error(`No hi ha cap empleat amb aquest id`) );
	}
	else
	{
		res(searchResult);
	}
} );
let getSalary = (empTrobat) => new Promise ( (res, rej) => {
	let searchResult = searchInArray(empTrobat.id, salaries);
	if (searchResult === false)
	{
		rej(new Error(`Aquest empleat no te salari pobre`));
	}
	else
	{
		res(searchResult);
	}
} );

async function printEmployee( id )
{
	try
	{
		const empTrobat = await getEmployee(id); //El valor de la "fullfilled promise" es searchResult (al codi de getEmployee)
		const salariTrobat = await getSalary(empTrobat); //Osigui, el valor de la fullfilled promise és el parametre que es pasa a la funcio resolve?
		console.log(`He trobat el empleat ${empTrobat.name} i cobra ${salariTrobat.salary} al mes`);
	}
	catch (err)
	{
		console.log(err.message);
	}
} 
printEmployee(3);
printEmployee(4);

/*
- Exercici 2
Crea una nova funció asíncrona que cridi a una altra que retorni una
 Promise que efectuï la seva funció resolve() després de 2 segons de 
 la seva invocació.
*/

async function delayedResolve( ) 
{
	return new Promise ((res, rej) => {
		setTimeout( res(`M'he resolt!`) , 10000000 );
	} );
}

async function delayedExec ( ) 
{
	try
	{
		const str = await delayedResolve();
		console.log(str);
	}
	catch (err)
	{
		console.log(err);
	}
	
}

delayedExec();
