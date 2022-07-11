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

function listHomeDir() 
{
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

var rmCommand; //Es una matada pero el primer que haig de fer es aixo pq rm no funciona en command prompt
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
        fs.readFile(filename, (err, data) => {
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
        console.log(`Fallo en el getDataOut: ${err.message}`);
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
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    console.log(`decrypted: ${decrypted}
    ${typeof{decrypted}} ${decrypted.constructor.name}`);

    fs.writeFile(`decrypted.txt`, decrypted, (err) => {
        if (err) console.log(err);
    });
}
/*
README
Si vas descomentant les crides d'aqui sota per ordre tots haurien de fer el que diu l'enunciat, cadascun genera els arxius que el següent
necessita.
El nivell 3 no està ben fet encara, aquesta funcio encripta i desencripta pero no he aconseguit tenir una que encripti i una que desencripti
per separat, i encara em faig un lio amb els encodings. Pero bueno, com s'acostuma a dir en el mon empresarial el que compta es la intenció oi?
*/



const frase1 = `123`;
const filename1 = `nouArxiu.txt`;

//Nivell 1
escriuArxiu(frase1, filename1);
// compressArxiu(filename1);
// showArxiu(filename1);

//Nivell 2:
// hola();
// listHomeDir();

//Nivell 3:
// encodeArxiu(filename1);
// encryptArxiu(filename1);
