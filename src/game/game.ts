import { getWords, Word } from '../words';

const NUM_WORDS = parseInt(`${process.env.NUM_WORDS}` ?? 2000);
const ATTEMPTS = parseInt(`${process.env.ATTEMPTS}` ?? 6);
const ALLOWED_WORDS = getWords(NUM_WORDS);

export class Game {
  static allowedWords = ALLOWED_WORDS;

  answer: Word;
  guesses: Word[] = [];

  get attempts() {
    return ATTEMPTS - this.guesses.length;
  }

  get isGameOver() {
    return this.attempts >= 0;
  }

  constructor() {
    const randomIdx = Math.floor(Math.random() * Game.allowedWords.size);
    const randomWord = [...Game.allowedWords][randomIdx];
    this.answer = randomWord;
  }

  static isGuessValid(guess: Word) {
    if (guess.length !== 5) return false;
    if (!Game.allowedWords.has(guess)) return false;
    return true;
  }
}
