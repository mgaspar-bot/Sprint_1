/*
- Exercici 1
Crea una funció que, en executar-la, escrigui una frase en un fitxer.

- Exercici 2
Crea una altra funció que mostri per consola el contingut del fitxer de
 l'exercici anterior.

- Exercici 3
Crea una funció que comprimeixi el fitxer del nivell 1.
*/

const fs = require('fs');

const frase = `La frase que vulguis aquí`;
fs.writeFile('./nouArxiu.txt', frase, function (error) {
    if (error)
    {
        console.log(error);
        return;
    }
    console.log(`Arxiu creat amb exit`);
} );

fs.readFile('./nouArxiu.txt', function (err, data) {
    if (err)
    {
        console.log(err);
        return;
    }
    console.log(`${data}`);
} );

var zlib = require('zlib');

var zip = zlib.createGzip();

var read = fs.createReadStream('./nouArxiu.txt');
var write = fs.createWriteStream('./nouArxiu.txt.gz');
read.pipe(zip).pipe(write);	
console.log("Zipped Successfully");

/*
- Exercici 1
Crea una funció que imprimeixi recursivament un missatge per la consola amb demores d'un segon.

- Exercici 2
Crea una funció que llisti per la consola el contingut del directori d'usuari/ària de l'ordinador utilizant Node Child Processes.
*/

function hola() 
{
    console.log(`hola!`);
    setTimeout(hola, 2000);
};
hola();

const { spawn } = require('node:child_process');

/*
per treure els paths a userfolders:
powershell: echo $env:USERPROFILE
command prompt: echo %USERPROFILE%
*/
/*
let userFolderPath;
const getUserFolder = spawn('echo $env:USERPROFILE', ); //$env:USERPROFILE nomes funcionara en powershell
getUserFolder.stdout.on('data', function(data) {
    userFolderPath = `${data}`;
});
console.log( `${userFolderPath}` );*/


const homedir = require('os').homedir();

fs.readdir(homedir, (err, files) => {
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(files);
    //files.forEach((file) => { console.log(file); } );
} );

/*
- Exercici 1
Crea una funció que creï dos fitxers codificats en hexadecimal i en base64 respectivament, a partir del fitxer del nivell 1.
Crea una funció que guardi els fitxers del punt anterior, ara encriptats amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.
Crea una altra funció que desencripti i descodifiqui els fitxers de l'apartat anterior tornant a generar una còpia de l'inicial.
Inclou un README amb instruccions per a l'execució de cada part.
*/

