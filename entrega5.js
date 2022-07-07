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


function escriuArxiu(frase, filename) {
    fs.writeFileSync(`${filename}`, frase, function (error) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`Arxiu creat amb exit`);
    });
}

function showArxiu(filename) {
    fs.readFile(`${filename}`, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`${data}`);
    });
}

var zlib = require('zlib');
function compressArxiu(filename) {
    var Gzip = zlib.createGzip();

    var read = fs.createReadStream(filename);
    var write = fs.createWriteStream(`${filename}.gz`);

    read.pipe(Gzip).pipe(write);

    console.log("Zipped Successfully");
}

/*
- Exercici 1
Crea una funció que imprimeixi recursivament un missatge per la consola amb demores d'un segon.
*/

function hola() {
    console.log(`hola!`);
    setTimeout(hola, 1000);
};
//hola(); TODO DESCOMENTAR AIXO ABANS D'ENTREGAR

/*
- Exercici 2
Crea una funció que llisti per la consola el contingut del directori d'usuari/ària de l'ordinador utilizant Node Child Processes.
*/

const platform = require('os').platform();
const homedir = require('os').homedir();
const exec = require('child_process').exec;

if (platform === 'win32') {
    exec(`dir ${homedir}`, (err, stdout, stderr) => {
        if (err || stderr) {
            console.log('Ha habido algun tipo de error');
            return;
        }
        //console.log(stdout);   TODO DESCOMENTAR AIXO ABANS D'ENTREGAR
    });
}
else {
    exec(`cd && ls -la`, function (err, stdout, stderr) {
        if (err || stderr) {
            console.log('Ha habido algun tipo de error');
            return;
        }
        console.log(stdout);
    });
}

//el metode amb exec funciona mentre el stdout del comando no sigui molt gran, pq lo que 
//estas fent es guardar-te tot el output del comando en un buffer i volcar-lo de una a la consola
//si el output fos mes gran hauries de utilitzar el spawn, que crea un child process i conecta pipes
//als outputs. LLavorens t'ho has de muntar per llegir de streams, gestionar signals i codis
//que pugui enviar-te el child process i, en general, fer un munt de coses que no acabo d'entendre

/* fs.readdir(homedir, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`
    
    metode amb fs.readdir:
    
    `);
    console.log(files);
    //files.forEach((file) => { console.log(file); } );
}); */
//aquest metode es molt mes senzill pero no utilitza el modul child_process


/*- Exercici 1
Crea una funció que creï dos fitxers codificats en hexadecimal i en base64
respectivament, a partir del fitxer del nivell 1.

Crea una funció que guardi els fitxers del punt anterior, ara encriptats 
amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.

Crea una altra funció que desencripti i descodifiqui els fitxers de 
l'apartat anterior tornant a generar una còpia de l'inicial.

Inclou un README amb instruccions per a l'execució de cada part.
*/

var rmCommand; //Es una matada pero el primer que haig de fer es aixo
if (platform === 'win32') {
    rmCommand = `del`;
} else {
    rmCommand = `rm`;
}



function encodeArxiu(filename) {
    let filenameHex = filename + `hex`; let filenamebase64 = filename + `base64`;
    fs.readFile(filename, function (err, data) {  //tota la funcio a dintre d'un readFile, segur que hi ha una forma millor
        if (err) {
            console.log(err);
            return;
        }

        //console.log(`${typeof(data)} ${data.constructor.name}`); //data es un objecte Buffer
        /*console.log(`
        Data en hexa:
        `);
        console.log(data.toString(`hex`));*/

        fs.writeFile(filenameHex, data.toString('hex'), function (err) { //els objectes buffers es poden pasar a toString especificant un encoding i santes pasques
            if (err) {
                console.log(err);
                return;
            }
        });
        fs.writeFile(filenamebase64, data.toString('base64'), function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
}

const crypto = require('crypto');

function readPromise(filename) {
    return new Promise((res, rej) => {
        fs.readFile(filename, (err, data) => { //si el read tira un error mel agafa el catch de la promise?
            if (err) {
                rej(new Error(`Fallo la lectura`));
            }
            res(data);
        });
    });
}
async function getDataOut(container, filename) {
    try {
        let data = await readPromise(filename);
        //console.log(data.constructor.name);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}
//La intencio d'aquestes dos funcions es poder llegir d'una File
//pero no tenir tota la funcio dintre del callback del readFile


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

    //let key = crypto.randomBytes(24); //intento crear una clau automaticament, aes192 en necessita una de 192 bits
    let key = `123456789012345678901234`;
    console.log(`bytelength de la key : ${Buffer.byteLength(key)}`);

    var cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
    let encrypted = cipher.update(data, 'hex'); //crec que l'has d'utilitzar mes cops per afegir dades grosses potser tants cops com blocs de 16 bytes tinguis?
    encrypted += cipher.final('hex');
    /*
    aquest 'hex' es el encoding de sortida, el d'entrada es pot especificar pero
    es opcional, si nomes fiques dos parametres enten que el que li dones es el
    de sortida. Si l'especifiqués en aquest cas com que dataHex es Buffer i no string, 
    comprovara l'encoding de Buffer (?) i ignorara el parametre
    */

    console.log(`encrypted: ${encrypted}
    ${typeof{encrypted}} ${encrypted.constructor.name}`);

    var decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf16le'); //es millor posar utf16 pq es el encoding de js, amb altres tambe funciona pero se li afegeixen coses random al decyphered
    decrypted += decipher.final('utf16le');

    console.log(`decrypted: ${decrypted}
    ${typeof{decrypted}} ${decrypted.constructor.name}`); //sembla afegir un newline al final del string

    fs.writeFile(`decrypted.txt`, decrypted, (err) => {
        if (err) console.log(err);
    });
}


/*
const frase1 = `123`;
const filename1 = `nouArxiu.txt`;

escriuArxiu(frase1, filename1);
compressArxiu(filename1);
//encodeArxiu(filename1);
hashArxiu(filename1);
*/

encryptArxiu('hola.txt'); //cal una key-length de 128 bits (16 bytes), com que js usa UTF-16 aixo son 8 chars

//de vegades si no existeix nouArxiu.txt em llença un error i es para pq el hash prova de llegir-lo
//quan encara no existeix

/* Crea una altra funció que desencripti i descodifiqui els fitxers de 
l'apartat anterior tornant a generar una còpia de l'inicial. */

/*
TODO
Com faig pq escriu, compress i hash s'executin sempre en l'ordre que vull?
Mirar com utilitzar crypto amb el aes-192-cbc. No sabia la diferencia pero sha256 es un hash
 i no es pot desencriptar :(
*/

/*
El youtuber engineer man diu
"Every time node has to reach out to the OS it does
so asynchronousy"
*/



/* 
async function hashArxiu(filename) 
{

    encodeArxiu(filename);
    let filenameHex = filename + `hex`;
    let filenamebase64 = filename + `base64`;
    let data, dataHex, datab64;
    data = await getDataOut(data, filename); //Si no els hi poso els await, el programa se segueix executant abans de resoldre's les
    dataHex = await getDataOut(dataHex, filenameHex); // promises i les variables data encara no son Buffer sino Promise
    datab64 = await getDataOut(datab64, filenamebase64);

    let hash = crypto.createHash('sha256'); //per encriptar haig de crear un objecte Hash
    data = hash.update(data).digest('hex');
    fs.writeFile(filename + "hash", data, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    hash = crypto.createHash('sha256'); //i sembla que l'haig de crear cada cop
    dataHex = hash.update(dataHex).digest('hex');
    fs.writeFile(filenameHex + `hash`, dataHex, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    hash = crypto.createHash('sha256');
    datab64 = hash.update(datab64).digest('hex');
    fs.writeFile(filenamebase64 + `hash`, datab64, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    exec(`${rmCommand} ${filename}; ${rmCommand} ${filenameHex}; ${rmCommand} ${filenamebase64} `);
    //exec funciona encara que 
    //no li posi el callback per manejar els stdout, stderr i tal
}
 */