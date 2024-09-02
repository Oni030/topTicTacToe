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

    return { getBoard, getCheckBoard, printBoard, tagCell }
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

    const getPlayers = () => players;

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
    const checkBoard = gameboard.getCheckBoard();

    const checkWin = () => {

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
        const alph = ['A', 'B', 'C'];

        console.log(`${players.getActivePlayer().name} has tagged cell ${alph[row]}${column + 1}...`);
        gameboard.tagCell(row, column, players.getActivePlayer().tagID);

        checkWin();

        players.switchActivePlayer();
        startNewRound();
    };

    startNewRound();

    return { move }

};

const gameboard = Gameboard();
const players = Players();
const game = Game();