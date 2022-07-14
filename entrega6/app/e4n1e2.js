/*
- Exercici 2
Crea una nova funció asíncrona que cridi a una altra que retorni una
 Promise que efectuï la seva funció resolve() després de 2 segons de 
 la seva invocació.
*/
module.exports = {delayedResolve, delayedExec};
// export {delayedResolve as default, delayedExec};

function delayedResolve()
{
    console.log(`Començo a esperar per resoldre'm...`);
	return new Promise ((res, rej) => {
		setTimeout( () =>  res(`M'he resolt!`) , 2000 );
    	});
}
async function delayedExec (fun) 
{
	try
	{   
		const str = await fun();
		console.log(str);
	}
	catch (err)
	{
		console.log(err);
	}
}
// delayedExec(delayedResolve);

/*
Per fer el testing cal fer que delayedExec rebi delayedResolve com a callback per poder-li passar la mock function
*/