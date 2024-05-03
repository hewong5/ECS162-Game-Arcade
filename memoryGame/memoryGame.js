let boardState = [];
let cardsList = [
    'blastoise.png',
    'bulbasaur.png',
    'charizard.png',
    'charmander.png',
    'eevee.png',
    'meowth.png',
    'pikachu.png',
    'squirtle.png',
    'venusaur.png',
    'vulpix.png'
];

let cardsShuffled;
let numRows = 5;
let numCols = 4;

function shuffleCards() {
    cardsShuffled = cardsList.concat(cardsList);
    for(let i = 0; i < cardsShuffled.length; i++) {
        let randomIndex = Math.floor(Math.random() * cardsShuffled.length);
        let temp = cardsShuffled[i];
        cardsShuffled[i] = cardsShuffled[randomIndex];
        cardsShuffled[randomIndex] = temp;
    }
}

function drawCell(board, row, col) {
    let cell = document.createElement('img');
    cell.className = 'cell';
    cell.id = `cell${row}${col}`;
    cell.src = cardsShuffled.pop();
    board.appendChild(cell);
    return cell.src;
}

function drawBoard(game) {
    let board = document.createElement('div');
    board.classList.add('board');
    for(let i = 0; i < numRows; i++) {
        boardState.push([]);
        for(let j = 0; j < numCols; j++) {
            let img = drawCell(board, i, j);
            boardState[i].push(img);
        }
    }
    game.appendChild(board);
}

function initializeBoard() {
    let game = document.getElementById('game-container');
    drawBoard(game);
}

function hideCards() {
    for(let i = 0; i < numRows; i++) {
        for(let j = 0; j < numCols; j++) {
            let card = document.getElementById(`cell${i}${j}`);
            card.src = 'pokeball.webp';
        }
    }
}

function startGame() {
    shuffleCards();
    initializeBoard();
    setTimeout(hideCards, 1500);
}

startGame();