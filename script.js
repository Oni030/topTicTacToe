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

    return { printBoard }
};

function Players() {
    const players = [
        {
            name: "Player One",
            tagID: 1
        },
        {
            name: "Player Two",
            tagID: 2
        }
    ];
};