const gameboard = {
    board: ['top-l', 'top-m', 'top-r', 'mid-l', 'mid-m', 'mid-r', 'btm-l', 'btm-m', 'btm-r'],
    player1: [],
    player2: [],
    movesMade: [],
    winningCombos: [
        ['top-l', 'top-m', 'top-r'],
        ['mid-l', 'mid-m', 'mid-r'],
        ['btm-l', 'btm-m', 'btm-r'],

        ['top-l', 'mid-l', 'btm-l'],
        ['top-m', 'mid-m', 'btm-m'],
        ['top-r', 'mid-r', 'btm-r'],

        ['top-l', 'mid-m', 'btm-r'],
        ['btm-l', 'mid-m', 'top-r']
    ]
}

// const btn = document.querySelector('button');

function initGame() {
    document.querySelector('.winner').textContent = '';
    document.querySelector(`.top-l`).textContent = '';
    document.querySelector(`.top-l`).style.color = '';
    document.querySelector(`.top-m`).textContent = '';
    document.querySelector(`.top-m`).style.color = '';
    document.querySelector(`.top-r`).textContent = '';
    document.querySelector(`.top-r`).style.color = '';
    document.querySelector(`.mid-l`).textContent = '';
    document.querySelector(`.mid-l`).style.color = '';
    document.querySelector(`.mid-m`).textContent = '';
    document.querySelector(`.mid-m`).style.color = '';
    document.querySelector(`.mid-r`).textContent = '';
    document.querySelector(`.mid-r`).style.color = '';
    document.querySelector(`.btm-l`).textContent = '';
    document.querySelector(`.btm-l`).style.color = '';
    document.querySelector(`.btm-m`).textContent = '';
    document.querySelector(`.btm-m`).style.color = '';
    document.querySelector(`.btm-r`).textContent = '';
    document.querySelector(`.btm-r`).style.color = '';
    gameboard.player1 = [];
    gameboard.player2 = [];
}

function game() {
    initGame();
    let currentPlayer = 1;
    let gameWon = false;
    let player1 = prompt(`Who's going to be player 1?`);
    let player2 = prompt(`Who's going to be player 2?`);
    document.addEventListener('click', makeMark);
    function makeMark(event) {
        const element = event.target;
        // console.log(element.classList[0]);
        if (element.tagName === 'BUTTON' && !(element.classList[0] === 'start') && !(element.classList[0] === 'restart')) {
            if (!gameWon) {
                function addMove() {
                    if (currentPlayer === 1 && !(element.classList[0] in gameboard.movesMade)) {
                        console.log(element.classList[0]);
                        let moveName = '';
                        moveName = element.classList[0];
                        gameboard.player1.push(moveName);
                        gameboard.movesMade.push(moveName);
                        console.log(gameboard.player1);
                        document.querySelector(`.${element.classList[0]}`).textContent = 'X';
                        document.querySelector(`.${element.classList[0]}`).style.color = 'red';
                    }
                    if (currentPlayer === 2 && !(element.classList[0] in gameboard.movesMade)) {
                        let moveName = '';
                        moveName = element.classList[0];
                        gameboard.player2.push(moveName);
                        gameboard.movesMade.push(moveName);
                        console.log(gameboard.player2);
                        document.querySelector(`.${element.classList[0]}`).textContent = 'O';
                        document.querySelector(`.${element.classList[0]}`).style.color = 'blue';
                    }
                }
                addMove();

                // Victory:
                for (let combo of gameboard.winningCombos) {
                    if (combo.every(r => gameboard.player1.includes(r))) {
                        console.log(`Player 1 wins!`);
                        gameWon = true;
                        document.querySelector('.winner').textContent = `${player1} wins the game!`;
                    }
                    if (combo.every(r => gameboard.player2.includes(r))) {
                        console.log(`Player 2 wins!`);
                        gameWon = true;
                        document.querySelector('.winner').textContent = `${player2} wins the game!`;
                    }
                }

                // Changing player turns:
                currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1;
            }
        }
        // Checks for a tie (all the buttons have been taken and no winner)
        let allButtons = 0;
        for (btn of document.querySelectorAll('button')) {
            if (btn.style.color) {
                allButtons++;
            }
        }
        if (allButtons === 9 && gameWon === false) {
            document.querySelector('.winner').textContent = `The game between ${player1} and ${player2} was a tie!`;
        }
    }
}

const start = document.querySelector('.start');
start.addEventListener('click', startGame);


const restart = document.querySelector('.restart');
restart.addEventListener('click', restartGame);


let gameStatus = false;


function startGame() {
    if (gameStatus === false) {
        game();
        gameStatus = true;
    }
};

function restartGame() {
    if (gameStatus === true) {
        game();
        gameStatus = true;
    }
}
=


// `${event.target.className}`

// element.classList.contains('btn')