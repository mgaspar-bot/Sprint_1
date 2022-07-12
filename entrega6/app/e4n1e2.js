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
