const fsp = require('fs').promises;
var filename = process.argv[2];

(async function encodeArxiu(filename) {
    try {
        const data = await fsp.readFile(filename);
        fsp.writeFile(filename+'b64',data.toString('base64'));
        fsp.writeFile(filename+'hex', data.toString('hex'));
    } catch (error) {
        console.log(error);
    }
})(filename);