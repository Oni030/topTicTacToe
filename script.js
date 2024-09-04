// GAMEBOARD FUNCTION FACTORY
function Gameboard() {
    const board = [];

    // Creates the gameboard
    for ( let i=0; i<3 ; i++ ) {
        board[i] = [];
        for ( let j=0 ; j<3 ; j++) {
            board[i].push(0);
        };
    };

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

    return { getBoard, getCheckBoard, printBoard, tagCell }
};

// PLAYERS FUNCTION FACTORY
function Players( playerOne = "Player 1", playerTwo = "Player 2" ) {
    const players = [
        {
            name: playerOne,
            tagID: 1
        },
        {
            name: playerTwo,
            tagID: 2
        }
    ];
    let activePlayer = players[0];

    // Method to extract players array 
    const getPlayers = () => players;

    // Method to extract currently active player
    const getActivePlayer = () => activePlayer;

    // Method to switch currently active player
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    return { getPlayers, getActivePlayer , switchActivePlayer };
};


function Game() {
    const gameboard = Gameboard();
    const players = Players();
    
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

        console.log(`${players.getActivePlayer().name} has tagged cell ${alph[row]}${column + 1}...`);

        if ( targetCell !== 0) {
            console.log("This cell has already been tagged! Please choose a different cell.");
            startNewRound();
            return;
        };

        gameboard.tagCell(row, column, players.getActivePlayer().tagID);

        checkWin();

    };

    startNewRound();

    return { move }

};


const gameboard = Gameboard();
const players = Players();
const game = Game();