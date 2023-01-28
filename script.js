/* New Game Scripts */

let player1mark = 'x';
let xSelector = document.getElementById('x_mark');
let oSelector = document.getElementById('o_mark');
let gameType;
let player2type;
let cpuGameBtn = document.querySelector('.new_game-vs_cpu');
let playerGameBtn = document.querySelector('.new_game-vs_player');
let newGameScreen = document.getElementById('ttt-new_game_screen');
let gameBoardScreen = document.getElementById('ttt-game_board_screen');
let gameOverScreen = document.getElementById('ttt-game_over_screen');

function handlePlayer1Mark(mark) {
    if (mark === 'x') {
        xSelector.classList.remove('unselected');
        oSelector.classList.add('unselected');
        player1mark = 'x';
    } else {
        oSelector.classList.remove('unselected');
        xSelector.classList.add('unselected');
        player1mark = 'o';
    }
}

function startGame(type) {
    gameType = type;
    if (type === 'vs_cpu') {
        player2type = 'cpu';
    } else {
        player2type = 'player';
    }
    newGameScreen.style.display = 'none';
    gameBoardScreen.style.display ='flex';
}

xSelector.addEventListener('click', function() {
    handlePlayer1Mark('x')
})

oSelector.addEventListener('click', function() {
    handlePlayer1Mark('o')
})

cpuGameBtn.addEventListener('click', function() {
    startGame('vs_cpu')
})

playerGameBtn.addEventListener('click', function() {
    startGame('vs_player')
})


/* Game Board Scripts */


/* Game Over Scripts */
