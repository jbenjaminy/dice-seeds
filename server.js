// const express = require('express');
// const app = express();
//
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
//
// app.use(express.static('./build'));

const sha512 = require('js-sha512');

const unhashed = '7a59621abc8a6e3a8f8b71f54694d5064bd4e55a06f52f5173822708b76ef42a094d99689085e0d16f4d40a13b8880777ed5b942df32ade7182d39bb9a04dd71';

const hashed = sha512(unhashed);

const clientSeed = '04c22e9f2823a54238a792ae25dcdc349d3a91d1';

const nonce = '55314';

const combinedHash = sha512(`${unhashed},${clientSeed},${nonce}`);

console.log('hashed server seed: ', hashed);
console.log('unhashed server seed: ', unhashed);
console.log('combined hash: ', combinedHash);

let decSub;

for (let i = 0; i < (combinedHash.length - 6); i+=5) {
    console.log('i: ', i);
    let hexSub = combinedHash.substring(i, (i + 5));
    console.log('hexSub: ', hexSub);
    decSub = parseInt(hexSub, 16)
    console.log('decSub: ', decSub);
    if ((decSub > 0) && (decSub < 999999)) {
        break;
    }
}

console.log('decSub final: ', decSub);

const result = (decSub % 10000) / 100;

console.log('result: ', result);
