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
let cardClicked1 = null;
let cardClicked2 = null;
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
    cell.addEventListener('click', handleCardClick);
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

function checkMatch() {
    if(cardClicked1.src != cardClicked2.src) {
        cardClicked1.src = 'pokeball.webp';
        cardClicked2.src = 'pokeball.webp';
    }
    cardClicked1 = null;
    cardClicked2 = null;
}

function handleCardClick() {
    if(!this.src.includes('pokeball')) {
        return;
    }

    if(cardClicked1 === null) {
        cardClicked1 = this;
        let row = parseInt(this.id.slice(-2,-1));
        let col = parseInt(this.id.slice(-1));
        cardClicked1.src = boardState[row][col];
    }else if(cardClicked2 === null && cardClicked1 != null) {
        cardClicked2 = this;
        let row = parseInt(this.id.slice(-2,-1));
        let col = parseInt(this.id.slice(-1));
        cardClicked2.src = boardState[row][col];

        setTimeout(checkMatch, 1000);
    }
}

function startGame() {
    shuffleCards();
    initializeBoard();
    setTimeout(hideCards, 1500);
}

startGame();