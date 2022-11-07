const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout} = require('process');
const pathFile = path.join(__dirname, 'text.txt');
const textFile = fs.createWriteStream(pathFile);

const writeText = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write(`Введите информацию\n`);

stdin.on('data', data => {
  if (data.toString().slice(0, 4) === 'exit') {
    process.exit();
  }
  writeText.write(data);
})

process.on('exit', () => {
  stdout.write('До свидания!');
});

process.on('SIGINT', () => {
  process.exit();
});