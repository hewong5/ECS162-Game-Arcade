document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('roll-button').addEventListener('click', handleButtonClick);
});

function getDiceRoll() {
    return Math.floor(Math.random() * 6) + 1
}

function displayResult(num) {
    let result = 'You rolled a ' + num + '!';
    document.querySelector('#display-text').innerHTML = result;

    let diceFace = 'dice' + num + '.png';
    document.getElementById('dice-img').src = diceFace;
}

function handleButtonClick() {
    let num = getDiceRoll();
    displayResult(num);
}