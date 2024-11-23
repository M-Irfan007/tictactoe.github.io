const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.querySelector('.winner-message');
const winnerSpan = document.querySelector('.winner');
const restartButton = document.getElementById('restartButton');

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('x');
    cell.classList.remove('circle');
    cell.classList.remove('taken');
    cell.addEventListener('click', handleClick, { once: true });
  });
  setWinnerMessage(false);
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'circle' : 'x';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.classList.add('taken');
}

function swapTurns() {
  isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('circle');
  });
}

function endGame(draw) {
  if (draw) {
    winnerSpan.textContent = 'No one';
  } else {
    winnerSpan.textContent = isCircleTurn ? 'O' : 'X';
  }
  setWinnerMessage(true);
}

function setWinnerMessage(show) {
  winnerMessage.classList.toggle('show', show);
}

restartButton.addEventListener('click', startGame);

startGame();
