const exec = require('child_process').exec;
//Els comandos son els mateixos en bash i en cmd prompt

exec('echo hola 123 > arxiu.txt && node encodeArxiu.js arxiu.txt', (err,stdout, stderr) => {
    if(err) throw err;
    console.log(stdout);
    exec('node encryptArxiu.js arxiu.txthex', (err,stdout, stderr) => {
        if(err) throw err;
        console.log(stdout);
        exec('node decryptArxiu.js arxiu.txthexENCRYPTED', (err,stdout, stderr) => {
            if(err) throw err;
            console.log(stdout);
        });
    });
});
