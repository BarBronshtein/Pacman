'use strict';
const WALL = '#';
const WALL_IMG = `<img src="img/wall.png" style="width:20x; height:50px;">`;
const FOOD = '⭒';
const EMPTY = ' ';
const CHERRY = '🍒';
const SUPER_FOOD = '📀';
var gIntervalCherry;
var gBoard;
var gGame = {
  score: 0,
  isOn: false,
  food: 0,
};
function init() {
  gEatenGhosts = [];
  gGhosts = [];
  closeModal();
  gBoard = buildBoard();
  createPacman(gBoard);
  printMat(gBoard, '.board-container');
  renderWall(gBoard);
  gIntervalCherry = setInterval(placeCherry, 15000);
  createGhosts(gBoard);
  gGame.food = CheckAmountOfFood(gBoard);
  gGame.isOn = true;
  gGame.score = 0;
}

function buildBoard() {
  const SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = SUPER_FOOD;
  board[1][SIZE - 2] = SUPER_FOOD;
  board[SIZE - 2][1] = SUPER_FOOD;
  board[SIZE - 2][SIZE - 2] = SUPER_FOOD;
  return board;
}

function updateScore(diff) {
  // TODO: update model and dom

  //  Model
  gGame.score += diff;

  //  DOM
  var elScore = document.querySelector('h2 span');
  elScore.textContent = gGame.score;
}

function gameOver(isVictory = false) {
  console.log('Game Over');
  // TODO
  gGame.isOn = false;
  openModal(isVictory);
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
}

function isOver() {
  return gGame.food === 0;
}

function CheckAmountOfFood(board) {
  let food = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] === FOOD ? food++ : '';
    }
  }
  // Adding one beacuse when board is created a spirit hides one FOOD
  return food + 1;
}

function placeCherry() {
  const cell = getRandEmptyCell();
  if (!cell) return;
  gBoard[cell.i][cell.j] = CHERRY;
  renderCell(cell, CHERRY);
}

function renderWall(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === WALL) renderCell({ i, j }, WALL_IMG);
      if (board[i][j] === PACMAN) renderCell({ i, j }, gPacmanImg);
    }
  }
}
