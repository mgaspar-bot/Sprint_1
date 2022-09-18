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
        // console.log(Object.getOwnPropertyNames(decipher));
        /*
        However, each use of update returns a chunk of 
        the encoded/decoded data instead of requiring 
        one to call digest to get the result. Moreover,
         after encoding (or decoding) your data, you 
         will likely have to call the final method to 
         get the last chunk of encoded information.

         Potser el que esta passant es que haig de cridar
         update mes d'un cop. Per tant canviare aixo:
            decrypted = decipher.update(data, 'hex', 'base64');
        per un while:
        */
        let chunk = decipher.update(data);
        let i = 0;
        console.log(`${chunk.toString('hex')}`);
        while (!(chunk === null)) {
            decrypted += chunk.toString('hex');
            chunk = decipher.update(data);
            console.log(`${chunk.toString('hex')}`);
            i++;
            if (i > 10000) {
                console.log(`I'm getting out cause too much cycles`);
                // process.exit(0);
                break;
            }
        }
        /*
        Nope, tampoc funciona. Chunk conte tota l'estona
        el mateix i no sembla que la lectura avançi de cap 
        manera. Per moltes vegades que cridi a update, quan 
        surt diu bad decrypt! no m'agrada que cridis a final!

        En el altre arxiu creen un stream amb decipher.write i
        posen un listener al event 'readable'.
        */
        decrypted += decipher.final();
        console.log('Im writing now');
        fs.writeFileSync('lastDecryption', decrypted);
    } catch (error) {
        console.log(error);
    }
})(filename);