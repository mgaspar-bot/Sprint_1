const crypto = require('crypto');
const fsp = require('fs').promises;
const fs = require('fs');

var filename = process.argv[2];

(async function decryptArxiu (filename) {
    try {
        var decrypted = "";
        const data = await fsp.readFile(filename);
        let iv = "1234567890123456"; 
        let password = "123456789012345678901234"; let key = crypto.scryptSync(password, 'salt', 24);

        var decipher = crypto.createDecipheriv('aes-192-cbc',key,iv);
        decipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = decipher.read())) {
              decrypted += chunk.toString('utf-8');
            }
        });
        decipher.on('end', () => {
            fs.writeFileSync('lastDecryption', decrypted)
        });
        decipher.write(data.toString(), 'hex'); //el que estava fallant es que data NO PODIA ser Buffer, i ho era
        decipher.end();
    } catch (error) {
        console.log(error);
    }
})(filename);

