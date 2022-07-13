 var crypto = require('crypto');
/*
let key = crypto.randomBytes(24);

console.log(`${key.constructor.name} ${key.toString('utf16le')} ${key.byteLength}`);

let str = `123`;

console.log(`${str.length} ${Buffer.byteLength(str)}`);

console.log( );


str = str.toString('utfle16');

console.log(`${str.length} ${Buffer.byteLength(str)}`);
console.log((new TextEncoder().encode(str)).length);
 */

// console.log(crypto.randomBytes(16).toString('ascii'));

let iv = crypto.randomBytes(16);
let key = `123456789012345678901234`
let shouldBe40 = Buffer.byteLength(`${iv}${key}`)
console.log(`should be 40: ${shouldBe40}`);