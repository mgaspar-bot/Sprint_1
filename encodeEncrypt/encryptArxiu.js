const fsp = require('fs').promises;
const { exec } = require('child_process');
const crypto = require('crypto');

var filename = process.argv[2];
var rmCommand;
if (require('os').platform() === 'win32') {
    rmCommand = 'del';
} else {
    rmCommand = 'rm'
}

(async function encryptArxiu(filename) {
    try {
        const data = await fsp.readFile(filename);
        //do i need to know the encoding??
        let iv = "1234567890123456"; 
        let password = "123456789012345678901234"; let key = crypto.scryptSync(password, 'salt', 24);
        
        var cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
        let encrypted = cipher.update(data); //if you dont specify the inputEncoding arg, data needs to be a Buffer or any other object qhich contains info on it
        encrypted += cipher.final('hex');
        await fsp.writeFile(filename+'ENCRYPTED',encrypted);
        exec(`${rmCommand} ${filename}`);
    } catch (error) {
        console.log(error);
    }
})(filename);