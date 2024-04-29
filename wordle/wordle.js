let currRow = 0;
let currCol = 0;
let state = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
];

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

function updateBoard() {
    for(let i = 0; i < state.length; i++) {
        for(let j = 0; j < state[i].length; j++) {
            let currCell = document.getElementById(`cell${i}${j}`);
            currCell.textContent = state[i][j];
        }
    }
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(key) {
    if(currCol > 4) {
        return;
    }
    state[currRow][currCol] = key;
    currCol++;
}

function keyEvents() {
    document.body.onkeydown = (k) => {
        let key = k.key;
        if(key == 'Enter') {

        }

        if(key == 'Backspace') {
            deleteLetter(key);
        }

        if(isLetter(key)) {
            addLetter(key);
        }
        updateBoard()
    };

}

initializeBoard();
keyEvents();