'use strict';
const PACMAN = '😷';
var gPacmanImg = `<img src="img/pacman.png" style="width:30px; height:30px;">`;
var gEatenGhosts = [];
var gPacman;

function createPacman(board) {
  // TODO
  gPacman = {
    location: { i: 5, j: 7 },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function movePacman(ev) {
  if (!gGame.isOn) return;
  // TODO: use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);

  // TODO: return if cannot move
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === WALL) return;

  // TODO: hitting a ghost? call gameOver if isSuper false else eat ghost
  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      eatGhost(nextLocation);
      if (isOver()) gameOver();
    } else gameOver();
    return;
  }

  if (nextCell === CHERRY) updateScore(10);
  // TODO: moving from corrent position:
  // TODO: update the model
  if (nextCell === FOOD) {
    gGame.food--;
    isOver() ? gameOver(true) : '';

    updateScore(1);
  }
  if (nextCell === SUPER_FOOD) {
    // If already super adds property on cell superfood
    if (gPacman.isSuper) {
      gPacman.superFoodLoc = nextLocation;
    } else {
      gPacman.isSuper = true;
      for (let i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
      }
      setTimeout(restoreGhosts, 5000);
    }
  }

  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY);

  // TODO: Move the pacman to new location
  // TODO: update the model
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  //   Check is pacman on superfood cell as super if true dont eat
  if (gPacman.superFoodLoc) {
    if (!CheckIfPacmanMoved(gPacman)) {
      renderCell(gPacman.location, gPacmanImg);
      return;
    }
    gBoard[gPacman.superFoodLoc.i][gPacman.superFoodLoc.j] = SUPER_FOOD;
    renderCell(gPacman.superFoodLoc, SUPER_FOOD);

    gPacman.superFoodLoc = null;
  }
  //   TODO: update the DOM
  renderCell(gPacman.location, gPacmanImg);
}

function getNextLocation(ev) {
  var nextLocation = { i: gPacman.location.i, j: gPacman.location.j };
  // Rendering pacman curr location so when we move even if we stumble wall
  // represent it on our screen
  var prevLocation = { i: gPacman.location.i, j: gPacman.location.j };
  // TODO: figure out nextLocation
  switch (ev.code) {
    case 'ArrowUp':
      nextLocation.i--;
      gPacmanImg = `<img src="img/pacman.png" style="width:30px; height:30px; transform:rotate(270deg);">`;
      break;
    case 'ArrowDown':
      console.log('hi');
      gPacmanImg = `<img src="img/pacman.png" style="width:30px; height:30px; transform:rotate(90deg);">`;
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      gPacmanImg = `<img src="img/pacman.png" style="width:30px; height:30px; transform:rotate(180deg);">`;
      nextLocation.j--;
      break;
    case 'ArrowRight':
      console.log('hi');
      gPacmanImg = `<img src="img/pacman.png" style="width:30px; height:30px; transform:unset;">`;
      nextLocation.j++;
      break;
  }
  renderCell(prevLocation, gPacmanImg);
  return nextLocation;
}

function eatGhost(location) {
  // Find ghost and erase from gGhosts array and push it to a new
  // eaten ghosts array
  for (let i = 0; i < gGhosts.length; i++) {
    if (
      gGhosts[i].location.i === location.i &&
      gGhosts[i].location.j === location.j
    ) {
      // Check ghost cell content
      const ghost = gGhosts.splice(i, 1)[0];
      if (ghost.currCellContents === FOOD) {
        ghost.currCellContents = EMPTY;
        gGame.food--;
      }

      // Erase from gGhosts array
      gEatenGhosts.push(ghost);
      break;
    }
  }
  // Updating pacman cell values before change
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // DOM
  renderCell(gPacman.location, EMPTY);
  // Updating pacman cell values after change
  gPacman.location = location;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // DOM
  renderCell(gPacman.location, gPacmanImg);
}

function CheckIfPacmanMoved(pacman) {
  return (
    pacman.location.i !== pacman.superFoodLoc.i ||
    pacman.location.j !== pacman.superFoodLoc.j
  );
}

function restoreGhosts() {
  gPacman.isSuper = false;
  if (gGhosts.length < 3) gGhosts = gGhosts.concat(gEatenGhosts);
  for (let i = 0; i < gEatenGhosts.length; i++) {
    renderCell(gEatenGhosts[i].location, getGhostHTML(gEatenGhosts[i]));
  }

  gEatenGhosts = [];
}
