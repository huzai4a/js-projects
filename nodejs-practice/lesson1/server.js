// node runs on a server instead of in browser
// console is in terminal window
// global obj instead of window from js
// console.log(global);


// common core modules are new 
// import those modules from commonjs modules instead of regular js
// same thing as import os from ''; in js
const os = require('os');
const path = require('path');
// dont need to say js extension
const math = require('./math');
// file handling
const fs = require('fs');


/*
console.log(os.type());
console.log(os.version());
console.log(os.homedir());

// always have access to these
console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));
*/

fs.readFile(path.join(__dirname,'files','sample.txt'),'utf8', (err, data)=>{
    if (err) throw err;
    console.log(data);
})

// utf8 auto
fs.writeFile(path.join(__dirname,'files','reply.txt'), 'This is my write to the file content', (err)=>{
    if (err) throw err;
    console.log('completed write');
})

fs.appendFile(path.join(__dirname,'files','reply.txt'), 'This is my append to the file content', (err)=>{
    if (err) throw err;
    console.log('completed write');
})

// note: process is built into node
process.on('uncaughtException', err =>{
    console.error(`Uncaught error: ${err}`)
    process.exit(1);
})