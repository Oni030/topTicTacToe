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
        console.log(board);
    };

    const tagCell = (row, column, tagID) => {
        const targetCell = board[row][column];

        if ( targetCell !== 0) {
            console.log("This cell is already tagged! Please choose a different cell.");
            return;
        };

        targetCell = tagID;
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

    const activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    return { getActivePlayer };
};