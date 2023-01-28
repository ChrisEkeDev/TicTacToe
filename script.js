/* New Game Scripts */
let xColor = '#2CC6BE';
let oColor = '#F5B337';
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
let currentTurn = 'x';
let turnIndicator = document.querySelector('.info_turn-icon');
let xWins = 0;
let oWins = 0;
let ties = 0;
let gameSquares = document.querySelectorAll('.ttt-game_square');
let gameWinner;
let winnerIcon = document.querySelector('.winner_icon');
let winnerText = document.querySelector('.winner_text');
let gameOverStatus = document.querySelector('.game_over-status');
let xStatsLabel = document.querySelector('.stats-x_label');
let oStatsLabel = document.querySelector('.stats-o_label');
let xStatsScore = document.querySelector('.stats-x_score');
let oStatsScore = document.querySelector('.stats-o_score');
let statsTies = document.querySelector('.stats-ties');
let moveTally = 0;

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
        if (player1mark === 'x') {
            xStatsLabel.innerHTML = 'X (You)';
            oStatsLabel.innerHTML = 'O (CPU)';
        } else {
            xStatsLabel.innerHTML = 'X (CPU)';
            oStatsLabel.innerHTML = 'O (You)';
        }

    } else {
        player2type = 'player';
        if (player1mark === 'x') {
            xStatsLabel.innerHTML = 'X (P1)';
            oStatsLabel.innerHTML = 'O (P2)';
        } else {
            xStatsLabel.innerHTML = 'X (P2)';
            oStatsLabel.innerHTML = 'O (P1)';
        }
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



function setWinner(plyr) {
    gameOverScreen.style.display = 'flex';
    gameWinner = plyr;
    if (plyr === 'x') {
        xWins += 1;
        xStatsScore.innerHTML = xWins;
        winnerIcon.setAttribute('src', 'assets/ttt-x.svg');
        winnerText.style.color = xColor;
        winnerText.innerHTML = 'Takes the Round';
        if (gameType === 'vs_cpu' && player1mark === 'x') {
            gameOverStatus.innerHTML = 'You Win!';
        } else if (gameType === 'vs_cpu' && player1mark === 'o') {
            gameOverStatus.innerHTML = 'You Lost!';
        } else if (player1mark === 'x' && gameType !== 'vs_cpu') {
            gameOverStatus.innerHTML = 'Player 1 Wins';
        } else {
            gameOverStatus.innerHTML = 'Player 2 Wins';
        }
    } else if (plyr === 'o') {
        oWins += 1;
        oStatsScore.innerHTML = oWins;
        winnerIcon.setAttribute('src', 'assets/ttt-o.svg');
        winnerText.style.color = oColor;
        winnerText.innerHTML = 'Takes the Round';
        if (gameType === 'vs_cpu' && player1mark === 'x') {
            gameOverStatus.innerHTML = 'You Lost!';
        } else if (gameType === 'vs_cpu' && player1mark === 'o') {
            gameOverStatus.innerHTML = 'You Win!';
        } else if (player1mark === 'o' && gameType !== 'vs_cpu') {
            gameOverStatus.innerHTML = 'Player 1 Wins';
        } else {
            gameOverStatus.innerHTML = 'Player 2 Wins';
        }
    } else {
        ties += 1;
        gameOverStatus.innerHTML = 'Its a Tie!';
        statsTies.innerHTML = ties;
        winnerIcon.removeAttribute('src');
        winnerText.style.color = '#A8BEC9';
        winnerText.innerHTML = 'No one takes this round';
    }
}

let gameObject = {
    "square_1": '',
    "square_2": '',
    "square_3": '',
    "square_4": '',
    "square_5": '',
    "square_6": '',
    "square_7": '',
    "square_8": '',
    "square_9": ''
}

let winningCombos = [
    ["square_1","square_2","square_3"],
    ["square_4","square_5","square_6"],
    ["square_7","square_8","square_9"],
    ["square_1","square_4","square_7"],
    ["square_2","square_5","square_8"],
    ["square_3","square_6","square_9"],
    ["square_1","square_5","square_9"],
    ["square_3","square_5","square_7"]
]

function checkForWinner(player) {
    let scoreTally = 0;
    for (let i = 0; i < winningCombos.length; i++) {
        for (let j = 0; j < winningCombos[i].length; j++) {
            let sqValue = winningCombos[i][j];
            if (gameObject[sqValue] === player) {
                scoreTally += 1;
            }
            if (scoreTally === 3) {
                setWinner(player)
                return
            }
        }
        scoreTally = 0;
    }
    if (moveTally >= 9) {
        setWinner('tie')
    }

}

function markX(sq) {
    let newX = document.createElement("img");
    newX.setAttribute("src","assets/ttt-x.svg");
    sq.appendChild(newX);
    sq.classList.add("square_disabled");
    gameObject[sq.id] = 'x';
    moveTally += 1;
    checkForWinner('x')
    currentTurn = "o";
    turnIndicator.setAttribute("src","assets/ttt-o.svg");
}

function markO(sq) {
    let newO = document.createElement("img");
    newO.setAttribute("src","assets/ttt-o.svg");
    sq.appendChild(newO);
    sq.classList.add("square_disabled");
    gameObject[sq.id] = 'o';
    moveTally += 1;
    checkForWinner('o')
    currentTurn = "x";
    turnIndicator.setAttribute("src","assets/ttt-x.svg");
}

gameSquares.forEach( function(gameSquare) {
    gameSquare.addEventListener('click', function(e) {
        if (gameSquare.classList.contains('square_disabled')) {
            return
        } else {
            if (currentTurn === 'x') {
                markX(e.target);
            } else {
                markO(e.target);
            }
        }
    })
})



/* Game Over Scripts */

let quitBtn = document.querySelector('.game_over-quit');
let infoQuit = document.querySelector('.info-quit');
let nextRoundBtn = document.querySelector('.game_over-next_round');

function resetBoard() {
    gameSquares.forEach(function(gameSquare) {
        gameSquare.classList.remove("square_disabled");
        gameSquare.replaceChildren()
    });
    gameObject = {
        "square_1": '',
        "square_2": '',
        "square_3": '',
        "square_4": '',
        "square_5": '',
        "square_6": '',
        "square_7": '',
        "square_8": '',
        "square_9": ''
    }
    gameOverScreen.style.display = 'none';
    gameWinner = undefined;
    currentTurn = 'x';
    turnIndicator.setAttribute("src","assets/ttt-x.svg");
    moveTally = 0;
}

function quitGame() {
    xWins = 0;
    oWins = 0;
    ties = 0;
    player1mark = 'x';
    gameType = undefined;
    player2type = undefined;
    gameBoardScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    newGameScreen.style.display = 'flex';
    xStatsScore.innerHTML = 0;
    oStatsScore.innerHTML = 0;
    statsTies.innerHTML = 0;
}

infoQuit.addEventListener('click', function() {
    resetBoard();
    quitGame();
})

quitBtn.addEventListener('click', function() {
    resetBoard();
    quitGame();
})

nextRoundBtn.addEventListener('click', function() {
    resetBoard();
})
