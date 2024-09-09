/******************************/
/* GAMEBOARD FUNCTION FACTORY */
/******************************/
function Gameboard() {
    const board = [];

    // Creates the gameboard
    const resetBoard = () => {
        for ( let i=0; i<3 ; i++ ) {
            board[i] = [];
            for ( let j=0 ; j<3 ; j++) {
                board[i].push(0);
            };
        };
    };

    resetBoard();

    // Method to extract board from gameboard
    const getBoard = () => board;

    // Method to generate and extract a board with all win-possibilities 
    const getCheckBoard = () => {
        const rows = board;
        const columns = [
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]]
        ];
        const diagonals = [
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]] 
        ];

        return [...rows, ...columns, ...diagonals];
    };

    // Method to print board on the console
    const printBoard = () => {
        const currentBoardStatus = board.map((row) => row.map((cell) => cell));
        console.log(currentBoardStatus);
    };

    // Method to tag a cell within board
    const tagCell = (row, column, tagID) => {
        board[row].splice(column, 1, tagID)
    };

    return { resetBoard, getBoard, getCheckBoard, printBoard, tagCell }
};

/****************************/
/* PLAYERS FUNCTION FACTORY */
/****************************/
function Players( playerOne, playerTwo ) {
    if (playerOne === null) {
        playerOne = "";
    };
    if (playerTwo === null) {
        playerTwo = ""
    };
    const playerOneDisplay = document.querySelector('.one');
    const playerTwoDisplay = document.querySelector('.two');
    const playersArr = [
        {
            name: playerOne,
            tagID: 1
        },
        {
            name: playerTwo,
            tagID: 2
        }
    ];
    let activePlayer = playersArr[0];

    playerOneDisplay.textContent = playerOne;
    playerTwoDisplay.textContent = playerTwo;

    // Method to extract players array 
    const getPlayers = () => playersArr;

    // Method to extract currently active player
    const getActivePlayer = () => activePlayer;

    // Method to switch currently active player
    const switchActivePlayer = () => {
        activePlayer = activePlayer === playersArr[0] ? playersArr[1] : playersArr[0];
    };

    return { getPlayers, getActivePlayer , switchActivePlayer };
};


/*************************/
/* DOM FUNCTION FACTORY */
/*************************/
function DOM(gameboard) {
    const tContainer = document.querySelector('.game-board');
    const gridTable = document.createElement('table');
    const board = gameboard.getBoard();

    gridTable.classList.add('game-grid');
    tContainer.appendChild(gridTable);

    const fillCells = () => {
        for ( let i=0 ; i<3 ; i++ ) {
            for ( let j=0 ; j<3 ; j++ ) {
                const xo = document.querySelector(`.cImg${i}${j}`);
                
                if ( board[i][j] === 1 ) {
                    xo.setAttribute('src', 'icons/x.svg');
                }; 
   
                if ( board[i][j] === 2 ) {
                    xo.setAttribute('src', 'icons/circle.svg');
                };
            };
        };
    };

    const resetCells = () => {
        for ( let i=0 ; i<3 ; i++ ) {
            for ( let j=0 ; j<3 ; j++ ) {
                const xo = document.querySelector(`.cImg${i}${j}`);
                
                if ( board[i][j] === 1 ) {
                    xo.setAttribute('src', '');
                }; 
   
                if ( board[i][j] === 2 ) {
                    xo.setAttribute('src', '');
                };
            };
        };
    }

    const displayBoard = () => {
        for ( let i=0 ; i<3 ; i++ ) {
        const tRow = document.createElement('tr');
        tRow.classList.add(`row${i}`);
        gridTable.appendChild(tRow);

            for ( let j=0 ; j<3 ; j++ ) {
                const tCell = document.createElement('td');
                const xo = document.createElement('img');
                tCell.classList.add(`cell${i}${j}`);
                xo.classList.add(`cImg${i}${j}`)
                tCell.appendChild(xo);
                tRow.appendChild(tCell);
            };
        };

        fillCells();
    };

    return { displayBoard , fillCells , resetCells }
};

/*************************/
/* GAME FUNCTION FACTORY */
/*************************/
function Game(gameboard, players, dom) {
    
    // Method to check for draw or win.
    const checkWin = () => {
        const rows = gameboard.getBoard();
        const checkBoard = gameboard.getCheckBoard();
        const playerList = players.getPlayers();

        if (rows.flat().every(cell => cell !== 0)) {
            console.log("It's a draw!");
            return true;
        };

        for (const combo of checkBoard) {
            const tagID = combo[0];
            if (combo[0] !== 0 && combo[0] === combo[1] && combo[0] === combo[2]) {
                const winningPlayer = playerList[tagID - 1];
                console.log(`${winningPlayer.name} wins!`);
                return true
            };
        };

        players.switchActivePlayer();
        startNewRound();
    };

    // Method to print current gameboard to console and signal player turn
    const startNewRound = () => {
        gameboard.printBoard();
        console.log(`${players.getActivePlayer().name}'s turn.`);
    };

    //  Method to call tagCell if the cell is not tagged already. Calls checkWin().
    const move = (row, column) => {
        const alph = ['A', 'B', 'C'];
        const board = gameboard.getBoard();
        let targetCell = board[row][column];
        if ( targetCell !== 0) {
            console.log("This cell has already been tagged! Please choose a different cell.");
            alert("This cell has already been tagged! Please choose a different cell.");
            startNewRound();
            return;
        };
        gameboard.tagCell(row, column, players.getActivePlayer().tagID);
        dom.fillCells();
        console.log(`${players.getActivePlayer().name} has tagged cell ${alph[row]}${column + 1}...`);
        checkWin();
    };

    return { move , startNewRound }
};


/***********************/
/* START GAME FUNCTION */
/***********************/
function startNewGame() {
    dom.resetCells();
    gameboard.resetBoard();
    game.startNewRound();
};


/*******************************/
/* INPUT PLAYER NAMES FUNCTION */
/*******************************/
function inputPlayerNames() {
    const playerOneInput = window.prompt('Choose a name for Player 1!');
    const playerTwoInput = window.prompt('Choose a name for Player 2!');
    players = Players(playerOneInput, playerTwoInput);
    game = Game(gameboard, players, dom);
};


/********************/
/* GLOBAL VARIABLES */
/********************/
const gameboard = Gameboard();
const dom = DOM(gameboard);
let players = '';
let game = '';
const boardContainer = document.querySelector('.game-board')


/******************/
/* EVENTLISTENERS */
/******************/
document.addEventListener('DOMContentLoaded', (event) => {
    dom.displayBoard();
    inputPlayerNames();
});

boardContainer.addEventListener('click', (event) => {
    let target = event.target;
    let targetID = target.classList[0];
    let targetRow = targetID.charAt(4);
    let targetColumn = targetID.charAt(5);

    game.move(targetRow, targetColumn);
});