/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */

/**
 * This was my attempt at automagically drawing the logo with ASCII Art. It failed pretty bad, and I really couldn't
 * understand it. I commented it out for linting reasons.
 */

/*
require('babel/polyfill');
const chalk = require('chalk');
const hasUnicode = require('has-unicode')();

/**
 * Settings
 * /
const STROKE_WIDTH = 3; // 2 = 2, 1.5 = 1, 3 = 4, 4 = 6, 5 = 8
const LETTER_WIDTH = 40; // 2x
const EXTRA = 6;
const BOTTOM_MARGIN = 3; // Must be less than EXTRA;

// (At least in my terminal), characters are twice as tall as they are wide.

/**
 * Computed
 * /
//const FILL_CHAR = '#'; // For debugging, sometimes a hash is helpful.
// Two strokes, with 1 char of actual line on each side + LETTER_WIDTH + Padding on both sides
const WIDTH = (STROKE_WIDTH * 2) + LETTER_WIDTH + EXTRA;
const HEIGHT = WIDTH / 2 + 1;

console.log(`Size: ${HEIGHT}x${WIDTH}`);

let logo = new Array(HEIGHT);

const PADDING = (WIDTH - STROKE_WIDTH * 2 - LETTER_WIDTH) / 2;
console.log('Padding:', PADDING);

/**
 * Generate the grid.
 * /
logo = logo.fill('').map(() => (new Array(WIDTH)).fill(chalk.blue.bgBlue(FILL_CHAR)));

/**
 * Corners
 * /

logo[0][0]= chalk.bold.blue('/'); // Top Left
logo[0][WIDTH - 1] = chalk.bold.blue('\\'); // Top Right
logo[HEIGHT - 1][0] = chalk.bold.blue('\\'); // Bottom Left
logo[HEIGHT - 1][WIDTH - 1] = chalk.bold.blue('/'); // Bottom Right

/**
 * Letter
 * /

/**
 * The cross
 * /

const letterHeight = LETTER_WIDTH / 2; // It's actually one more than this, but that leads to decimals.
const letterBase = HEIGHT - 1 - (BOTTOM_MARGIN + LETTER_WIDTH / 2 + 1);
const crossRow = HEIGHT - (letterHeight / 2) - 2;
// For every row you go up, the paddingOffset increases by 2.
const crossPaddingOffset = ((HEIGHT - crossRow - 1) / 2) * 2; // I know it's redundant, but it's clearer

for (let i = crossPaddingOffset + 3; i < LETTER_WIDTH - (letterBase - crossRow) * 2; i++) {
  logo[crossRow - 1][i] = letterColor('#');
}

function generateDemensions(strokeWidth, letterWidth, padding, margin) {
  const width = (strokeWidth * 2) + letterWidth + padding;
  const height = width / 2 + 1;
  return { width, height };
}

function generateArray(height, width) {
  let logo = new Array(height);
  logo = logo.fill('');
  logo = logo.map(nil => new Array(width));
  logo = logo.map(empty => empty.fill(''));
  return logo;
}

function getFillChar() {
// This is a no-break-space vs. a normal space
  return FILL_CHAR = hasUnicode ? '' : ' ';
}

function fillWithBackground(logo) {
  const fill = getFillChar();
  return logo.map(empty => empty.fill(fill));
}

function drawCorners(logo, height, width) {
  logo[0][0]= chalk.bold.blue('/'); // Top Left
  logo[0][width - 1] = chalk.bold.blue('\\'); // Top Right
  logo[height - 1][0] = chalk.bold.blue('\\'); // Bottom Left
  logo[height - 1][width - 1] = chalk.bold.blue('/'); // Bottom Right
}

function getLetterColor() {
  return chalk.bold.white.bgBlue;
}

function drawSectionOfLetter(logo, strokeWidth, row, start, char, fill) {
  const endChar = start + strokeWidth;
  for (let i = start; i < endChar; i++) {
    console.log(`Drawing at ${row}:${i} (${start})`);
    logo[row][i] = i === start ? char: fill;
  }
  logo[row][endChar - 1] = char;
}

function drawLetter(logo, height, strokeWidth, letterWidth, margin, padding) {
  const letterColor = getLetterColor();
  const $fill = letterColor('#');
  const $leftSlash = letterColor('/');
  const $rightSlash = letterColor('\\');

// Height -1 b/c [][0], margin -1 b/c a proper top takes 2 lines, and 1 comes from each side.
  const firstRow = (height - 1) - (margin - 1);
  let row = firstRow;
  let paddingOffset = 0;
  while (paddingOffset * 2 <= letterWidth + 2 && row >= 0) {
    // I think I like having a # instead of a / or just bg for letter fill.
    drawSectionOfLetter(logo, strokeWidth, row, padding + paddingOffset, $leftSlash, $fill);
    drawSectionOfLetter(logo, strokeWidth, row, padding + strokeWidth + letterWidth - paddingOffset, $rightSlash, $fill);
    paddingOffset++;
    row--;
  }

// Fix the top
  logo[row + 1][padding + paddingOffset] = logo[row + 1][padding + paddingOffset + 1] = $fill;

// The - 1 here is b/c for the last row: /##\, each 'side' of the letter is loosing one column.
  for(let i = 0; i < strokeWidth - 1; i++) {
    logo[row][padding + paddingOffset + i] = letterColor('_');
  }

//// This isn't a great way to special-case these, but it was the best I could think of.
  drawSectionOfLetter(logo, strokeWidth, firstRow, padding, $leftSlash, chalk.underline($fill));
  logo[firstRow][padding] = chalk.underline(logo[firstRow][padding]);

  drawSectionOfLetter(logo, strokeWidth, firstRow, padding + strokeWidth + letterWidth, $rightSlash, chalk.underline($fill));
// The * 2 - 1 is to put the underline on the outer slash
  logo[firstRow][padding + strokeWidth * 2 - 1 + letterWidth] = chalk.underline(logo[firstRow][padding + strokeWidth + letterWidth]);
}

module.exports = function makeLogo(strokeWidth = 3, letterWidth = 40, padding = 6, margin = padding / 2) {
  const { width, height } = generateDemensions(strokeWidth, letterWidth, padding, margin);
  const logo = generateArray(height, width);
  fillWithBackground(logo);
  drawCorners(logo);
  drawLetter(logo, height, strokeWidth, letterWidth, margin, padding);
};

console.log(logo.map(line => line.join('')).join('\n'));
*/
