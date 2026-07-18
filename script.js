const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    function placeMark(index, mark) {
        board[index] = mark;
    }

    function getBoard() {
        return board;
    }

    return {
        board,
        placeMark,
        getBoard,
    };

})();

function Player(name, mark) {
    return {
        name,
        mark,
    };
}

const gameController = (() => {

    const playerOne = Player("Player 1", "X");
    const playerTwo = Player("Player 2", "O");

    let currentPlayer = playerOne;

    function switchPlayer() {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }

    function checkWinner() {
        const board = Gameboard.getBoard();

        return false;
    }

    function checkTie() {
        const board = Gameboard.getBoard();

        return board.every(cell => cell !== "");
    }

    function playRound(index) {
        Gameboard.placeMark(index, currentPlayer.mark);

        if (checkWinner()) {
            console.log(currentPlayer.name + " wins!");
            return;
        }

        if (checkTie()) {
            console.log("It's a tie!");
            return;
        }

        switchPlayer();
    }

    return {
        playRound,
    };

})();

const displayController = (() => {

    return {

    };

})();

gameController.playRound(0);
gameController.playRound(4);
gameController.playRound(1);
gameController.playRound(5);
gameController.playRound(2);