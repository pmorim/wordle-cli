import { resolve } from 'path';
import { readFileSync } from 'fs';

const pathToWords = resolve(__dirname, 'assets/words.txt');
const words = readFileSync(pathToWords).toString('utf-8').split('\n');
console.log(words);
