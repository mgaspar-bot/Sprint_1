/*
- Exercici 2
Crea una nova funció asíncrona que cridi a una altra que retorni una
 Promise que efectuï la seva funció resolve() després de 2 segons de 
 la seva invocació.
*/
module.exports = {delayedResolve, delayedExec};

function delayedResolve( ) 
{
    console.log(`Començo a esperar per resoldre'm...`);
	return new Promise ((res, rej) => {
		setTimeout( () =>  res(`M'he resolt!`) , 2000 );
    	});
}
async function delayedExec ( ) 
{
	try
	{   
		const str = await delayedResolve('h');
		console.log(str);
	}
	catch (err)
	{
		console.log(err);
	}
}
// delayedExec();
