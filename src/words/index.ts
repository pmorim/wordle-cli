import { resolve } from 'path';
import { readFileSync } from 'fs';

export function getWords(amount = 2000) {
  return readFileSync(resolve(__dirname, 'words.txt'))
    .toString('utf-8')
    .split('\n')
    .slice(0, amount);
}
