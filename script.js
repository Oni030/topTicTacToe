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
    
    const getCellValue = () => {
        value;
    };

    return {
        markCell,
        getCellValue
    };
}