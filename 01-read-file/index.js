const {stdout} = process;
const path = require('path')
const fs = require('fs');
const pathFile = path.join(__dirname, 'text.txt')
const stream = fs.createReadStream(pathFile, 'utf-8');
let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => stdout.write(data));
stream.on('error', error => stdout.write('Error', error.message));