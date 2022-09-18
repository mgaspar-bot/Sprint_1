/*- Exercici 1
Crea una funció que creï dos fitxers codificats en hexadecimal i en base64
respectivament, a partir del fitxer del nivell 1.

Crea una funció que guardi els fitxers del punt anterior, ara encriptats 
amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.

Crea una altra funció que desencripti i descodifiqui els fitxers de 
l'apartat anterior tornant a generar una còpia de l'inicial.

Inclou un README amb instruccions per a l'execució de cada part.
*/



const crypto = require('crypto');
const platform = require('os').platform();
// const homedir = require('os').homedir();
const exec = require('child_process').exec;
const fs = require('fs');
const fsp = require('fs/promises');


var rmCommand; //Es una matada pero el primer que haig de fer es aixo pq rm no funciona en command prompt
if (platform === 'win32') {
    rmCommand = `del`;
} else {
    rmCommand = `rm`;
}
const filenames = fs.readdirSync('.').filter((value) => value.match(/.txt?/)); //targets tots els txt
var filename, filenameb64, filenamehex; //els filenames els fai "globals" pq totes les funcions hi puguin accedir

for (aFilename of filenames) { //s'executa aquest bucle, a cada volta posa el nom del arxiu que toqui a la global "filename" i crida al encode, al encrypt i al decrypt
    filename = aFilename;
    filenameb64 = filename+'b64';
    filenamehex = filename+'hex';

    encodeArxiu(filename);
    

}

async function encodeArxiu(filename) {
    try {
        const data = await fsp.readFile(filename);
        fsp.writeFile(filenameb64,data,'base64');
        fsp.writeFile(filenamehex, data, 'hex');
    } catch (error) {
        console.log(error);
    }

}
/*
Crea una funció que guardi els fitxers del punt anterior, ara encriptats 
amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.
*/
async function encryptArxiu(filename)
{
    encodeArxiu(filename);
    let filenameHex = filename + `hex`;
    let filenamebase64 = filename + `base64`;
    let data;
    data = await getDataOut(data, filename);

    let dataHex, datab64;
    dataHex = await getDataOut(dataHex, filenameHex);
    datab64 = await getDataOut(datab64, filenamebase64);

    //Ara tinc tres Buffer amb les dades en diferents encodings
    //sabem quins cypher te el module pq podem fer:
    //crypto.getCiphers().forEach((i) => {console.log(`${i}`);})

    let iv = crypto.randomBytes(16);//aes192 necessita un iv de 16 bytes
                                                //aixi es síncron, si el crides amb un callback (err, buf) es asíncron
    console.log(`iv:  ${iv.toString('hex')}`);

    let key = `123456789012345678901234`;
    // console.log(`bytelength de la key : ${Buffer.byteLength(key)}`);

    var cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
    let encrypted = cipher.update(data, 'hex');
    encrypted += cipher.final('hex');
    /*
    aquest 'hex' es el encoding de sortida, el d'entrada es pot especificar pero
    es opcional, si nomes fiques dos parametres enten que el que li dones es el
    de sortida. Si l'especifiqués en aquest cas com que data es Buffer i no string, 
    comprovara l'encoding de Buffer (com ho fas?) i ignorara el parametre
    */

    console.log(`encrypted: ${encrypted}
    ${typeof(encrypted)} ${encrypted.constructor.name}`);
    fs.writeFile(`encrypted`, encrypted, (err) => {if(err) console.log(err.message);} );

    var decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8'); //aqui encrypted es 
    decrypted += decipher.final('utf8');

    console.log(`decrypted: ${decrypted}
    ${typeof{decrypted}} ${decrypted.constructor.name}`);

    fs.writeFile(`decrypted.txt`, decrypted, (err) => {
        if (err) console.log(err);
    });
}
/*
README
Si vas descomentant les crides d'aqui sota per ordre 
tots haurien de fer el que diu l'enunciat, cadascun 
genera els arxius que el següent
necessita.
El nivell 3 no està ben fet encara, aquesta funcio 
encripta i desencripta pero no he aconseguit tenir una
que encripti i una que desencripti
per separat, i encara em faig un lio amb els encodings.
*/
