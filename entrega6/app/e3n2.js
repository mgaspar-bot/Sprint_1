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
},{
    id:4,
    name:'Marc Gaspar'
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

function getEmployee(id){
    return new Promise ( (res, rej) => {
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
}

async function hola() {
    try{
        let emp = await getEmployee(6);
    }catch(error){
        console.log(error.message);
    }
    // let emp = await getEmployee(6);
}
hola();



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
    {
		rej(new Error(`Aquest empleat no te salari pobre`));
    }
	else
    {
		res(searchResult);
    }
} );

module.exports = {employees, salaries, searchInArray, getEmployee, getSalary };
