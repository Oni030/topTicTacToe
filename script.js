function Gameboard() {
    const row = 3;
    const column = 3;
    const board = [];

    for ( i=0; i<row ; i++ ) {
        board[i] = [];
        for ( j=0 ; j<column ; j++) {
            board[i].push(0);
        };
    };

    const printBoard = () => {
        const currentBoardStatus = board.map((row) => row.map((cell) => cell));
        console.log(currentBoardStatus);
    };

    const tagCell = (row, column, tagID) => {
        let targetCell = board[row][column];

        if ( targetCell !== 0) {
            console.log("This cell is already tagged! Please choose a different cell.");
            return;
        };
        // Check Array methods
        board[row].splice(column, 1, tagID)
    };

    return { printBoard, tagCell }
};

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

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    return { getActivePlayer , switchActivePlayer };
};

function Game() {
    const board = Gameboard();
    const players = Players();

    const startNewRound = () => {
        board.printBoard();
        console.log(`${players.getActivePlayer().name}'s turn.`);
    };

    const move = (row, column) => {
        console.log(`${players.getActivePlayer().name} has tagged cell in row: ${row + 1} column: ${column + 1}...`);
        board.tagCell(row, column, players.getActivePlayer().tagID);

        players.switchActivePlayer();
        displayNewRound();
    };

    displayNewRound();

    return { move }

};  


// const gameboard = Gameboard();
// gameboard.printBoard();
// gameboard.tagCell(2, 1, 1);
// gameboard.printBoard();

// gameboard.tagCell(1, 1, 2);
// gameboard.tagCell(0, 1, 1);
// gameboard.tagCell(2, 0, 2);
// gameboard.tagCell(0, 0, 1);
// gameboard.tagCell(1, 1, 2);

// const player = Players();
// console.log(player.getActivePlayer());

// player.switchActivePlayer();
// console.log(player.getActivePlayer());