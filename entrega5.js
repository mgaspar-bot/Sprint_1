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
    if (error) {
        console.log(error);
        return;
    }
    console.log(`Arxiu creat amb exit`);
});

fs.readFile('./nouArxiu.txt', function (err, data) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`${data}`);
});

var zlib = require('zlib');

var Gzip = zlib.createGzip();

var read = fs.createReadStream('./nouArxiu.txt');
var write = fs.createWriteStream('./nouArxiu.txt.gz');
read.pipe(Gzip).pipe(write);
console.log("Zipped Successfully");

/*
- Exercici 1
Crea una funció que imprimeixi recursivament un missatge per la consola amb demores d'un segon.
*/

function hola() {
    console.log(`hola!`);
    setTimeout(hola, 2000);
};
//hola();

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

//el metode amb exec funciona mentre el stdout del comando no sigui molt gran, pq lo que 
//estas fent es guardar-te tot el output del comando en un buffer i volcar-lo de una a la consola
//si el output fos mes gran hauries de utilitzar el spawn, que crea un child process i conecta pipes
//als outputs. LLavorens t'ho has de muntar per llegir de streams, handle les signals i els codis d'error
//que pugui enviar-te el child process i, en general, fer un munt de coses que no entenc


fs.readdir(homedir, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`
    
    metode amb fs.readdir:
    
    `);
    console.log(files);
    //files.forEach((file) => { console.log(file); } );
});

//aquest metode es molt mes senzill pero no utilitza el modul child_process


/*
- Exercici 1
Crea una funció que creï dos fitxers codificats en hexadecimal i en base64
 respectivament, a partir del fitxer del nivell 1.

 Crea una funció que guardi els fitxers del punt anterior, ara encriptats 
 amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.

 Crea una altra funció que desencripti i descodifiqui els fitxers de 
 l'apartat anterior tornant a generar una còpia de l'inicial.

Inclou un README amb instruccions per a l'execució de cada part.
*/
function encodeArxiu(filename) {
    let filenameHex = filename + `hex`;   let filenamebase64 = filename + `base64`;
    exec(`rm ${filenameHex}; rm ${filenamebase64}`); 
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
encodeArxiu(`./nouArxiu.txt`);
/*
 Crea una funció que guardi els fitxers del punt anterior, ara encriptats 
 amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.
*/
const crypto = require('crypto');

function readPromise(filename) {
    return new Promise((res, rej) => {
        fs.readFile(filename, (err, data) => { //si el read tira un error mel agafa el catch de la promise?
            if (err) {
                console.log(err.message);
                rej(new Error(`Fallo la lectura`));
            }
            res(data);
        });
    });
}
async function getDataOut(container, filename) {
    try {
        let data = await readPromise(filename);
        console.log(data.constructor.name);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function encryptArxiu(filename) {
    
    encodeArxiu(filename);
    let filenameHex = filename + `hex`;
    let filenamebase64 = filename + `base64`; 
    let data, dataHex, datab64;
    data = await getDataOut(data, filename);
    dataHex = await getDataOut(dataHex, filenameHex);
    datab64 = await getDataOut(datab64, filenamebase64); 

    let hash = crypto.createHash('sha256'); //per encriptar haig de crear un objecte Hash
    data = hash.update(data).digest();
    fs.writeFile(filename + "hash", data, function (err) {
        if (err)
        {
            console.log(err);
            return;
        }
    });
    hash = crypto.createHash('sha256'); //i sembla que l'haig de crear cada cop
    dataHex = hash.update(dataHex).digest('hex');
    fs.writeFile(filenameHex + `hash`, dataHex , function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    hash = crypto.createHash('sha256');
    datab64 = hash.update(datab64).digest('base64');    
    fs.writeFile(filenamebase64 + `hash`, datab64 , function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    exec(`rm ${filename}; rm ${filenameHex}; rm ${filenamebase64}` ); //exec funciona encara que 
    //no li posi el callback per manejar els stdout, stderr i tal?

}
encryptArxiu('./nouArxiu.txt');

