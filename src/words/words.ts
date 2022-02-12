import { resolve } from 'path';
import { readFileSync } from 'fs';

export type Word = string;

export function getWords(amount: number) {
  return new Set<Word>(
    readFileSync(resolve(__dirname, 'words.txt'))
      .toString('utf-8')
      .split('\n')
      .slice(0, amount),
  );
}
