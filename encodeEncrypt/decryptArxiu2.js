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
        decrypted = await decipher.update(data, 'hex', 'base64');
        decrypted += decipher.final(); //bad decrypt, no hi ha manera
        fs.writeFileSync('lastDecryption', decrypted);
    } catch (error) {
        console.log(error);
    }
})(filename);