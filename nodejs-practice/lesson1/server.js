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