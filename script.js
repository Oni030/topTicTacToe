function Gameboard() {
    const row = 3;
    const column = 3;
    const board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i].push(Cell());
        };
    };

    const getBoard = () => board;

    const addMark = (row, column, player) => {
        const currentCell = board[row][column];

        if (currentCell.getCellValue() !== 0) {
            alert("This cell is already marked! Please choose a different cell.");
            return;
        };

        currentCell.markCell(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getCellValue()))
        console.log(boardWithCellValues);
      };

    return { getBoard, addMark, printBoard };
};

function Cell() {
    let value = 0;

    const markCell = (player) => {
        value = player;
    };
    
    const getCellValue = () => value;

    return { markCell, getCellValue };
};

function Players(playerOne = "Player One", playerTwo = "Player Two") {
    const players = [
        {
            name: playerOne,
            token: 1
        }, 
        {
            name: playerTwo,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    return { switchPlayerTurn, getActivePlayer };
};