const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    function placeMark(index, mark) {
        if (board[index] !== "") {
            return false;
        }

        board[index] = mark;
        return true;
    }

    function getBoard() {
        return board;
    }

    return {
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
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    function checkWinner() {
        const board = Gameboard.getBoard();

        // Step 5
        return false;
    }

    function checkTie() {
        const board = Gameboard.getBoard();

        return board.every(cell => cell !== "");
    }

    function playRound(index) {

        if (!Gameboard.placeMark(index, currentPlayer.mark)) {
            console.log("Cell already occupied!");
            return;
        }

        displayController.render();

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

    const boardContainer = document.getElementById("gameboard");

    function render() {

        boardContainer.innerHTML = "";

        const board = Gameboard.getBoard();

        board.forEach((cell, index) => {

            const square = document.createElement("div");

            square.classList.add("cell");

            square.textContent = cell;

            square.dataset.index = index;

            square.addEventListener("click", () => {
                gameController.playRound(index);
            });

            boardContainer.appendChild(square);

        });

    }

    return {
        render,
    };

})();

displayController.render();