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

    function resetBoard() {

        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }

    }

    return {
        placeMark,
        getBoard,
        resetBoard,
    };

})();

function Player(name, mark) {

    return {
        name,
        mark,
    };

}

const gameController = (() => {

    let playerOne = Player("Player 1", "X");
    let playerTwo = Player("Player 2", "O");

    let currentPlayer = playerOne;

    let gameOver = false;

    const winningCombinations = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];

    function switchPlayer() {

        currentPlayer =
            currentPlayer === playerOne
                ? playerTwo
                : playerOne;

    }

    function checkWinner() {

        const board = Gameboard.getBoard();

        for (let combination of winningCombinations) {

            const [a, b, c] = combination;

            if (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[b] === board[c]
            ) {

                return true;

            }

        }

        return false;

    }

    function checkTie() {

        const board = Gameboard.getBoard();

        return board.every(cell => cell !== "");

    }

    function playRound(index) {

        if (gameOver) return;

        if (!Gameboard.placeMark(index, currentPlayer.mark)) {
            return;
        }

        if (checkWinner()) {

            gameOver = true;

            displayController.render();

            displayController.updateMessage(
                currentPlayer.name + " Wins!"
            );

            return;

        }

        if (checkTie()) {

            gameOver = true;

            displayController.render();

            displayController.updateMessage(
                "It's a Tie!"
            );

            return;

        }

        switchPlayer();

        displayController.render();

        displayController.updateMessage(
            currentPlayer.name + "'s Turn"
        );

    }

    function startGame(player1Name, player2Name) {

        playerOne = Player(
            player1Name || "Player 1",
            "X"
        );

        playerTwo = Player(
            player2Name || "Player 2",
            "O"
        );

        currentPlayer = playerOne;

        gameOver = false;

        Gameboard.resetBoard();

        displayController.render();

        displayController.updateMessage(
            currentPlayer.name + "'s Turn"
        );

    }

    return {
        playRound,
        startGame,
    };

})();

const displayController = (() => {

    const boardContainer = document.getElementById("gameboard");
    const message = document.getElementById("message");
    const startBtn = document.getElementById("startBtn");

    function render() {

        boardContainer.innerHTML = "";

        const board = Gameboard.getBoard();

        board.forEach((cell, index) => {

            const square = document.createElement("div");

            square.classList.add("cell");

            square.textContent = cell;

            square.addEventListener("click", () => {

                gameController.playRound(index);

            });

            boardContainer.appendChild(square);

        });

    }

    function updateMessage(text) {

        message.textContent = text;

    }

    startBtn.addEventListener("click", () => {

        const player1Name = document.getElementById("player1").value;

        const player2Name = document.getElementById("player2").value;

        gameController.startGame(player1Name, player2Name);

        startBtn.textContent = "Restart Game";

    });

    return {

        render,
        updateMessage,

    };

})();

displayController.render();

displayController.updateMessage("Click Start Game");