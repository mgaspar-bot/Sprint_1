/*
- Exercici 1
Crea una funció que retorni el doble del número que li passa com
 a paràmetre després de 2 segons.
Crea una altra funció que rebi tres números i calculi la suma dels 
seus dobles fent servir la funció anterior.
*/

let  doubleDelayed = (num) => new Promise( (res, rej) => {
    setTimeout( function () { return ( res(2*num) ); } , 2000);
});


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
