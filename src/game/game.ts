import chalk from 'chalk';
import promptSync from 'prompt-sync';
import { stdout } from 'process';

import { GameError } from './error';
import { getWords, Letter, Word } from '../words';

const prompt = promptSync({ sigint: true });

export class Game {
  static readonly NUM_WORDS = 2000;
  static readonly WORD_LENGTH = 5;
  static readonly MAX_ATTEMPTS = 6;
  static readonly EMPTY_LETTER = '■';
  static readonly ALLOWED_WORDS = getWords(Game.NUM_WORDS);
  static readonly EMPTY_GUESS = Game.EMPTY_LETTER.repeat(Game.WORD_LENGTH);

  guesses: Word[] = ['CRANE', 'WHERE', 'BUILD'];
  answer: Word = [...Game.ALLOWED_WORDS][
    Math.floor(Math.random() * Game.ALLOWED_WORDS.size)
  ].toUpperCase();

  get attemptsLeft() {
    return Game.MAX_ATTEMPTS - this.guesses.length;
  }

  get isGameOver() {
    return this.attemptsLeft <= 0;
  }

  get guessesBoard() {
    return this.guesses.concat(
      new Array<Word>(this.attemptsLeft).fill(Game.EMPTY_GUESS),
    );
  }

  static validateGuess(guess: Word) {
    if (guess.length !== 5) throw new GameError('Must be a 5-letter word');
    if (!Game.ALLOWED_WORDS.has(guess))
      throw new GameError('Must be a valid word');
  }

  static showStartScreen() {
    console.log(chalk.bold('WORDLE CLI:'));
    console.log(chalk.dim('A WORDLE clone for your terminal\n'));
  }

  getLetterColor(letter: Letter, idx: number) {
    let color = chalk.grey;
    if (this.answer.includes(letter)) color = chalk.yellow;
    if (this.answer.charAt(idx) === letter) color = chalk.green;
    return color;
  }

  showGuesses() {
    this.guessesBoard.forEach((guess) => {
      const letters = [...guess];
      letters.forEach((letter: Letter, idx: number) => {
        const color = this.getLetterColor(letter, idx);
        stdout.write(color(letter));
      });

      stdout.write('\n');
    });
  }

  win() {
    console.log(chalk.green.bold('\nYou win!'));
  }

  lose() {
    console.log(chalk.red.bold('\nYou lose!'));
    console.log(
      chalk.red(`The correct answer was ${chalk.bold(this.answer)}.`),
    );
  }

  play() {
    Game.showStartScreen();

    while (!this.isGameOver) {
      this.showGuesses();
      const guess = prompt('> ').toUpperCase();
      console.log(`Guess: ${guess}`);

      try {
        Game.validateGuess(guess);
      } catch (err) {
        console.log((err as GameError).message);
        continue;
      } finally {
        this.guesses.push(guess.toUpperCase());
      }

      if (guess === this.answer) {
        this.win();
        return;
      }
    }

    this.lose();
  }
}
