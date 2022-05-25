function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell-' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>';
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function openModal(isVictory = true) {
  const className= isVictory ? 'win' :'lose'
  let msg = isVictory
    ? 'Congratulations You have Won the Game'
    : 'You Have Lost the Game Better Luck Next Time';
  const modal = document.querySelector('.modal');
  modal.classList.remove('hidden');
  modal.innerHTML = `<h2 class="${className }">${msg}</h2><button class="${className}" onclick="init()">${
    isVictory ? 'Click To Play Again' : 'Play Again?'
  }</button>`;
}

function closeModal() {
  document.querySelector('.modal').classList.add('hidden');
}

function getRandomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function getRandEmptyCell() {
  
  const emptyCells = [];
  for (let i = 0; i < gBoard.length - 1; i++) {
    for (let j = 0; j < gBoard[i].length - 1; j++) {
      if (gBoard[i][j] === EMPTY) emptyCells.push({ i, j });
    }
  }
  const emptyCellIdx = getRandomIntInclusive(0, emptyCells.length - 1);
  return emptyCells[emptyCellIdx];
}
