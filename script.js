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
        return [
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]]
        ]
    };

    const getBoardDiagonals = () => {
        return [
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]] 
        ];
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

    const getPlayers = () => players;

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    return { getPlayers, getActivePlayer , switchActivePlayer };
};

function Game() {
    const gameboard = Gameboard();
    const players = Players();
    const playerList = players.getPlayers();
    const rows = gameboard.getBoard();
    const columns = gameboard.getBoardColumns();
    const diagonals = gameboard.getBoardDiagonals();

    const makeCheckBoard = () => {
        return [...rows, ...columns, ...diagonals];
    };

    const checkWin = () => {
        let checkBoard = makeCheckBoard();

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
    };

    const startNewRound = () => {
        gameboard.printBoard();
        console.log(`${players.getActivePlayer().name}'s turn.`);
    };

    const move = (row, column) => {
        console.log(`${players.getActivePlayer().name} has tagged cell in row: ${row + 1} column: ${column + 1}...`);
        gameboard.tagCell(row, column, players.getActivePlayer().tagID);

        checkWin();

        players.switchActivePlayer();
        startNewRound();
    };

    startNewRound();

    return { move }

};