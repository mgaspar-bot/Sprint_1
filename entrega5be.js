/*
- Exercici 1
Crea una funció que, en executar-la, escrigui una frase en un fitxer.
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

/*
- Exercici 2
Crea una altra funció que mostri per consola el contingut del fitxer de
 l'exercici anterior.
*/

function showArxiu(filename) {
    fs.readFile(`${filename}`, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`${data}`);
    });
}

/*
- Exercici 3
Crea una funció que comprimeixi el fitxer del nivell 1.
*/
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
Crea una funció que imprimeixi recursivament un missatge per la consola amb 
demores d'un segon.
*/

function hola() {
    console.log(`hola!`);
    setTimeout(hola, 1000);
};

/*- Exercici 2
Crea una funció que llisti per la consola el contingut del directori d'usuari/ària de 
l'ordinador utilizant Node Child Processes.
*/

const platform = require('os').platform();
const homedir = require('os').homedir();
const exec = require('child_process').exec;

function listHomeDir() {
    if (platform === 'win32') {
        exec(`dir ${homedir}`, (err, stdout, stderr) => {
            if (err || stderr) {
                console.log('Ha habido algun tipo de error');
                return;
            }
            console.log(stdout);
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
}

/*- Exercici 1
Crea una funció que creï dos fitxers codificats en hexadecimal i en base64
respectivament, a partir del fitxer del nivell 1.
*/

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

/*-Crea una funció que guardi els fitxers del punt anterior, ara encriptats 
amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.
*/

var rmCommand; //Es una matada pero 'rm' no funciona a comand prompt
if (platform === 'win32') {
    rmCommand = `del`;
} else {
    rmCommand = `rm`;
}
function readPromise(filename) {
    return new Promise((res, rej) => {
        fs.readFile(filename, (err, data) => { 
            if (err) {
                rej(new Error(`Fallo la lectura`));
            }
            res(data);
        });
    }); //TODO comprovar si es capturen be els errors de lectura
}
async function getDataOut(filename) {
    try {
        let data = await readPromise(filename);
        //console.log(data.constructor.name);
        return data;
    }
    catch (err) {
        console.log(err.message);
    }
}
//Aquestes dos funcions es per poder tenir les
//dades del read sense fotre tota la funcio dins el
//callback del readFile
//Despres he vist que existeix una cosa que es diu fs.promises
//que basicament fa aixo pero be

var crypto = require('crypto');

async function encryptEncodedArxiu(filename, key, iv)
{
    if (Buffer.byteLength(key) != 24) {console.log(`La key ha de tenir 24 bytes`); return; }
    let filenamehex = filename + `hex`; let filenamebase64 = filename + `base64`;

    let dataHex, dataB64;
    try{
        dataHex = await getDataOut(filenamehex); //aixo son Buffers amb encodings diferents
        dataB64 = await getDataOut(filenamebase64);
    } catch (err) {
        console.log(err.message); //millor ficar massa catch que massa pocs xD
        return;
    }
   // let iv = crypto.randomBytes(16); //16 bytes pq es lo que li cal al aes-192

    let cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
    let encrypted = cipher.update(dataHex,'hex'); 
    encrypted += cipher.final('hex');
    fs.writeFile(`${filenamehex}crypt`, encrypted, (err) =>{
        if (err)
            console.log(err)
    });

    cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
    encrypted = cipher.update(dataB64,'hex'); 
    encrypted += cipher.final('hex');
    fs.writeFile(`${filenamebase64}crypt`, encrypted, (err) =>{
        if (err)
            console.log(err)
    });

    exec(`${rmCommand} ${filename}; ${rmCommand} ${filenamehex}; ${rmCommand} ${filenamebase64};`);

}


/* Crea una altra funció que desencripti i descodifiqui els fitxers de 
l'apartat anterior tornant a generar una còpia de l'inicial. */

async function decryptEncryptedArxiu(filename, key, iv) {
    if (Buffer.byteLength(key) != 24) {console.log(`La key ha de tenir 24 bytes`); return; }
    let filenamehex = filename + `hexcrypt`; let filenamebase64 = filename + `base64crypt`;

    let dataHex, dataB64;
    try{                                                                //tis data is important we need to wait for it sir
        dataHex = await getDataOut(filenamehex);
        dataB64 = await getDataOut(filenamebase64);
    } catch (err) {
        console.log(err.message);
        return;
    }
    //let iv = crypto.randomBytes(16)
    console.log(`${dataHex}`);

    var decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
    let decrypted = decipher.update(dataHex,'hex'); //es millor posar utf16 pq es el encoding de js, amb altres tambe funciona pero se li afegeixen coses random al decyphered
    console.log(`${decrypted.constructor.name} ${decrypted}`);
    decrypted += decipher.final('hex');

    fs.writeFile(filename, decrypted, (err) => {
        if (err) console.log(err.message);
    });
}



/*
Inclou un README amb instruccions per a l'execució de cada part.
*/

/*
README
IF YOU DON'T READ THIS YOU WILL HAVE BAD LUCK AND MAYBE YOUR COCK WILL FALL OUT I DONT KNOW
BECAUSE I HAVE READ IT SO I'M NOT IN DANGER BUT MAYBE YOU ARE RISKING THAT IF YOU DON'T READ I'M JUST 
LOOKING OUT FOR YOU

Si vas descomentant els exercicis en ordre tots haurien de fer el que diu el enunciat, cadascun crea els arxius que 
el següent necessita :)

THANK YOU FOR READING THIS MY FREND YOU HAD ME WORRIED THERE YOU ARE NOW BLESSED BY THE GREAT
GOD OF STRING ENCODING HE IS NOT GREAT GOD BUT LESS GIVES A ROCK 
*/
var frase = `123`;
var filename = `arxiu.txt`;

//Nivell 1:
//escriuArxiu(frase, filename);
//showArxiu(filename);
//compressArxiu(filename);

//Nivell 2:
//hola();
//listHomeDir();

var key = `123456789012345678901234`
var iv = crypto.randomBytes(16);

//Nivell 3:
//encodeArxiu(filename);
//encryptEncodedArxiu(filename, key, iv);
decryptEncryptedArxiu(filename, key, iv);

/* (
   async () => {
        let a = await escriuArxiu(frase, filename);
        a = await encodeArxiu(filename);
        a = await encryptEncodedArxiu(filename, key, iv);
        a = await decryptEncryptedArxiu(filename, key, iv);
    }
)(); */


    
