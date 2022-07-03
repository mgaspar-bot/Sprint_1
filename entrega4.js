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

 function delayedResolve( )  //pots usar timers fora de async functions sembla ser
{
    console.log(`Començo a esperar per resoldre'm...`);
	return new Promise ((res, rej) => {
		setTimeout( () =>  res(`M'he resolt!`) , 2000 ); //el parametre callback de setTimeout ha de retornar la crida perque s'activi el timer (?)
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

/*
- Exercici 1
Crea una funció que retorni el doble del número que li passa com
 a paràmetre després de 2 segons.
Crea una altra funció que rebi tres números i calculi la suma dels 
seus dobles fent servir la funció anterior.
*/

/*
function doubleDelayed (num)  //El timeout escrit aixi no funciona ni que el matin
                                        //crec que si abans havia de "retornar la call" dintre la promesa és pq
                                        //la unica manera que el programa pari la seva execucio per esperar
                                        //que algo es resolgui és amb el await, que funciona amb promises
{
    console.log(`He començat`);
    let doble
    setTimeout( () => {doble = 2*num} , 2000);
    return doble;
}*/

let  doubleDelayed = (num) => new Promise( (res, rej) => {
    setTimeout( function () { return ( res(2*num) ); } , 10000);
} ); 


async function tresDobles(n1, n2, n3)
{
    try
    {
        console.log(`Començo` );
        let total = await doubleDelayed(n1);
        console.log(`Espero...`);
        total += await doubleDelayed(n2);
        console.log(`Espero...`);
        total += await doubleDelayed(n3);

        console.log(total);
    }
    catch (err)
    {
        console.log(`Something went inexplicably wrong`);
    }
}
tresDobles(1,2,3);

//S'executa tot en un ordre raro pero sembla que les async les comença
//lo primer i mentre s'espera (await) va fent altres coses

