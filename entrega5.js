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
*/

function hola() 
{
    console.log(`hola!`);
    setTimeout(hola, 2000);
};
hola();

/*
- Exercici 2
Crea una funció que llisti per la consola el contingut del directori d'usuari/ària de l'ordinador utilizant Node Child Processes.
*/

const { exec } = require('child_process'); //exec obre un nou shell i executa el comando que li diguis
//lo bo es que sé quina shell obrira en cada sistema operatiu (espero, porfa)

const os = require('os').platform();

if(os === 'win32')
{
    /*    per treure els paths a userfolders: a windows
    powershell: echo $env:USERPROFILE
    command prompt: echo %USERPROFILE%  */
    exec('echo %USERPROFILE%' , function (error, stdout, stderr)  { //la shell que obre exec per defecte es el comand prompt
        if (error)
        {
            console.log(error);
            return;
        }
        if (stderr)
        {
            console.log(stderr);
            return;
        }
        console.log(stdout); 
        //la idea es que aqui (a la string stdout) tinc el path al
        //directori que vull, pero nose com treurel del scope d'aquest callback
        //aixi que anido un altre exec com un psicopata per executar el 
        //comando dir en el path que acabo de trobar
        exec(`dir ${stdout}`, function (err, stdout2, stderr2) {  //els hi fico un 2 per no liarme i saber que son diferents als d'abans
            if (err)
            {
                console.log(error);
                return;
            }
            if (stderr2)
            {
                console.log(stderr2);
                return;
            }
            console.log(stdout2);
        })
    });
}
else
{
    exec('cd && ls -la' , function (error, stdout, stderr)  {  //en un sistema no windows, faig cd per anar al home directory, i console.log de un ls i a cascar-la
        if (error)
        {
            console.log(error);
            return;
        }
        if (stderr)
        {
            console.log(stderr);
            return;
        }
        console.log(stdout);
    });
}

//el metode amb exec funciona mentre el stdout del comando no sigui molt gran, pq lo que 
//estas fent es guardar-te tot el output del comando en un buffer i volcar-lo de una a la consola
//si el output fos mes gran hauries de utilitzar el spawn, que crea un child process i conecta pipes
//als outputs. LLavorens t'ho has de muntar per llegir de streams, handle les signals i els codis d'error
//que pugui enviar-te el child process i, en general, fer un munt de coses que no entenc


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

//aquest metode es molt mes senzill pero no utilitza el modul child_process


/*
- Exercici 1
Crea una funció que creï dos fitxers codificats en hexadecimal i en base64 respectivament, a partir del fitxer del nivell 1.
Crea una funció que guardi els fitxers del punt anterior, ara encriptats amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.
Crea una altra funció que desencripti i descodifiqui els fitxers de l'apartat anterior tornant a generar una còpia de l'inicial.
Inclou un README amb instruccions per a l'execució de cada part.
*/



