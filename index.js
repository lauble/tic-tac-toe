const cells = document.querySelectorAll('.cell');
const playerStatus = document.querySelector('#player-status');
const restartBtn = document.querySelector('#restart-btn');

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ['', '', '', '', '', '', '', '', ''];
let currPlayer = 'X';
let running = false;

startGame();

function startGame() {
  cells.forEach((cell) => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  playerStatus.textContent = `${currPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute('cellIndex');

  if (options[cellIndex] !== '' || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currPlayer;
  cell.textContent = currPlayer;
  //   changePlayer();
}

function changePlayer() {
  currPlayer = currPlayer === 'X' ? 'O' : 'X';
  playerStatus.textContent = `${currPlayer}'s turn`;
}

function checkWinner() {
  let gameWon = false;

  for (let i = 0; i < winPatterns.length; i++) {
    const condition = winPatterns[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === '' || cellB === '' || cellC === '') {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      gameWon = true;
      break;
    }
  }

  if (gameWon) {
    playerStatus.textContent = `${currPlayer} wins!`;
    running = false;
  } else if (!options.includes('')) {
    playerStatus.textContent = 'Draw!';
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  options = ['', '', '', '', '', '', '', '', ''];
  currPlayer = 'X';
  cells.forEach((cell) => (cell.textContent = ''));
  playerStatus.textContent = `${currPlayer}'s turn`;
  running = true;
}
