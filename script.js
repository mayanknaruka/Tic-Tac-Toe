const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    return {
        board,
    };

})();

function Player(name, marks){

    return{
        name,
        mark,
    }
}

const gameController = ( ()=>{
    const Playerone = Player("player 1", "X")
    const playertwo = Player("Player 2", "O")

    let currentPlayer = Playerone

    return{
        Playerone,
        playertwo,
        currentPlayer
    }

})

const displayController = ( ()=>{

    return {
        
    }
} )