/*
- Exercici 2
Crea una arrow function que rebi un paràmetre i una funció callback 
i li passi a la funció un missatge o un altre 
(que s'imprimirà per consola) en funció del paràmetre rebut.
*/

let arrowFunction = (param, cb) => {
	if (param === "good")
		cb(`allz goood my fren`);
	else if (param === "bad")
		cb(`what is even happening OMG`); 
	else
		cb(`I hadn't planned for this...`);
}

arrowFunction("bad", (param1) => { console.log(param1); } );

module.exports = arrowFunction;
