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

    return {getBoard}
};

function Cell() {
    let value = 0;

    const markCell = (player) => {
        value = player;
    };
    
    const getCellValue = () => value;

    return {
        markCell,
        getCellValue
    };
};

const gameboard = Gameboard();
const board = gameboard.getBoard();

board[0][0].markCell(1);
console.log('Cell Value: ' + board[0][0].getCellValue());

board[0][0].markCell(2);
console.log('Cell Value: ' + board[0][0].getCellValue());

board[0][0].markCell(0);
console.log('Cell Value: ' + board[0][0].getCellValue());

