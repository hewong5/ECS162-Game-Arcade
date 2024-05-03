import { wordsList } from "./wordleList.js";

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
let targetWord = "";

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
    if(currCol === 5) {
        return; 
    }
    state[currRow][currCol] = key;
    currCol++;
}

function deleteLetter() {
    if(currCol === 0) {
        return;
    }
    state[currRow][currCol-1] = '';
    currCol--;
}

function removeChar(string, index) {
    return string.substr(0, index) + string.substr(index+1, string.length);
}

function checkCorrect() {
    let numCorrectChars = 0;
    let copyTargetWord = targetWord;
    let correctIndices = [];
    //mark green cells and obvious gray cells(letters not in the word)
    for(let i = 0; i < targetWord.length; i++) {
        if(targetWord[i] === state[currRow][i]) {
            correctIndices.push(i);
            let cell = document.getElementById(`cell${currRow}${i}`);
            cell.classList.add('right');
            numCorrectChars++;
        }
        if(!targetWord.includes(state[currRow][i])) {
            let cell = document.getElementById(`cell${currRow}${i}`);
            cell.classList.add('wrong');
        }
    }
    
    //remove correctly guessed letters from copyTargetWord
    for(let i = 0; i < correctIndices.length; i++) {
        copyTargetWord = removeChar(copyTargetWord, correctIndices[i])
        for(let j = i+1; j < correctIndices.length; j++) {
            correctIndices[j] = correctIndices[j] - 1;
        }
    }
    
    //mark yellow cells and remove marked letters from copyTargetWord
    //mark other cells gray
    for(let i = 0; i < state[currRow].length; i++) {
        let cell = document.getElementById(`cell${currRow}${i}`);
        if(cell.classList.contains('wrong') || cell.classList.contains('right')) {
            continue;
        }
        if(copyTargetWord.includes(state[currRow][i])) {
            cell.classList.add('almost-right');
            copyTargetWord = removeChar(copyTargetWord, copyTargetWord.indexOf(state[currRow][i]));
        }else {
            cell.classList.add('wrong');
        }
    }
    
    currRow++;
    currCol = 0;

    return numCorrectChars;
}

function isRealWord(word) {
    return wordsList.includes(word);
}

function handleKeyEvents() {
    document.body.addEventListener('keydown', function handleKeyDown(k) {
        let key = k.key;
        if(key === 'Enter') {
            if(currCol != 5 || state[currRow][currCol] === '') {
                return;
            }

            let inputWord = state[currRow].join("");
            if(!isRealWord(inputWord)) {
                document.getElementById('heading-text').innerHTML = 'Not a Valid Word';
                return;
            }

            let numCorrectChars = checkCorrect();
            if(numCorrectChars === 5) {
                document.body.removeEventListener('keydown', handleKeyDown);
                document.getElementById('heading-text').innerHTML = 'You Win!';
            }else if(currRow === 6) {
                document.body.removeEventListener('keydown', handleKeyDown);
                document.getElementById('heading-text').innerHTML = `You Lose. The word was \'${targetWord}\'.`;
            }
        }

        if(key === 'Backspace') {
            if(currCol === 5) {
                let heading = document.getElementById('heading-text');
                if(heading.innerHTML === 'Not a Valid Word') {
                    heading.innerHTML = 'Guess the Word';
                }
            }

            deleteLetter();
        }

        if(isLetter(key)) {
            addLetter(key.toLowerCase());
        }
        updateBoard()
    });

}

function startGame() {
    let num = Math.floor(Math.random() * wordsList.length);
    targetWord = wordsList[num];
    
    initializeBoard();
    handleKeyEvents();
}

startGame();