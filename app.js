// Select elements
const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Game state
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
function handleCellClick(e) {
  const cell = e.target;

  // If cell is already filled or game is over, return
  if (cell.textContent !== '' || !gameActive) return;

  // Update board
  cell.textContent = currentPlayer;

  // Check for win or draw
  if (checkWin()) {
    messageElement.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (checkDraw()) {
    messageElement.textContent = 'Draw';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Check for win
function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every(
      (index) => cells[index].textContent === currentPlayer
    );
  });
}

// Check for draw
function checkDraw() {
  return Array.from(cells).every((cell) => cell.textContent !== '');
}

// Reset the game
function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
  messageElement.textContent = '';
}

// Event listeners
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', handleCellClick);
}
resetButton.addEventListener('click', resetGame);
