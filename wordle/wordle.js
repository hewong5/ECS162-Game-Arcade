let currRow = 0;
let currCol = 0;

function drawCell(container, row, col) {
    let cell = document.createElement('div')
    cell.className = 'cell';
    cell.id = `cell${row}${col}`;
    cell.textContent = '';
    container.appendChild(cell);
}

function drawBoard(container) {
    let board = document.createElement('div');
    board.className = 'board';
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawCell(board, i, j);
        }
    }
    container.appendChild(board);
}

function initializeBoard() {
    let game = document.getElementById('game-container');
    drawBoard(game);
}

initializeBoard();