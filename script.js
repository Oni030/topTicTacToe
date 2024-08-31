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

    const getBoard = () => board;

    const getBoardColumns = () => {
        const columns = [];

        for ( i=0; i<row ; i++ ) {
            columns[i] = [];
            for ( j=0 ; j<column ; j++) {
                columns[i].push(board[j][i]);
            };
        };
        
        return columns;
    };

    const getBoardDiagonals = () => {
        const diagonals = [];
        const reverseStart = column - 1;

        for ( i=0; i<row-1 ; i++ ) {
            diagonals[i] = [];

            if ( i === 0 ) {
                for ( j=0 ; j<column ; j++ ) {
                    diagonals[i].push(board[j][j]);
                };
            } else {
                for ( k=0 ; k<column ; k++ ) {
                    diagonals[i].push(board[k][reverseStart - k]);
                };
            };
        };

        return diagonals;
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
        
        board[row].splice(column, 1, tagID)
    };

    return { getBoard, getBoardColumns, getBoardDiagonals, printBoard, tagCell }
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
    const gameboard = Gameboard();
    const players = Players();
    

    const startNewRound = () => {
        gameboard.printBoard();
        console.log(`${players.getActivePlayer().name}'s turn.`);
    };

    const move = (row, column) => {
        console.log(`${players.getActivePlayer().name} has tagged cell in row: ${row + 1} column: ${column + 1}...`);
        gameboard.tagCell(row, column, players.getActivePlayer().tagID);

        players.switchActivePlayer();
        startNewRound();
    };

    startNewRound();

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