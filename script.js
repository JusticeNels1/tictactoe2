//Create Module to control flow and logs of the game 
const game = (() => {
    const btns = document.querySelectorAll('button');
    let xWins = 0;
    let oWins = 0;
    let freeze = false; // freezes board

    const isPlayerX = (sign) => sign === 'X';
    const isPlayerO = (sign) => sign === 'O';
   
    
    function gameLog(sign,i) {

        if(isPlayerX(sign) && !freeze) {
            //Adds Player position to later cross reference with the winning set of positions
            player1.setPositions(i);
            if (gameLogic.checkWin(player1)) {
                ++xWins
                changeDom.displayWinner(sign)
            }
        }
        if(isPlayerO(sign) && !freeze) {
            player2.setPositions(i);
            if (gameLogic.checkWin(player2)) {
                ++oWins
                changeDom.displayWinner(sign)
            }
        }

    }

    btns.forEach((btn,i) => {
        btn.addEventListener('click',(e) => {
            let player = changeDom.displaySign(e.target)
            
            gameLog(player,i)

        })
    })

    return {freeze}
})()

const gameLogic = (() => {
    
    const winningPositions = [
        [0,3,6],
        [1,4,7],
        [2,5,7],
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6]
    ];


    function checkWin (player) {
        //Loop through the winningPositions arr and check if the 
        //layerArr contains all of the numbers from the winning set.
        
        return winningPositions.some(winArr => {
            const playerArr = player.getPositions();
            return winArr.every(num => playerArr.includes(num))
        })
    }

    return ({checkWin})
})()
    
function Player (sign,score) {
    const positions = [];

    // close access to variables by getting and setting them with functions
    
    const getSign = () => sign;
    const getScore = () => score; 
    const increaseScore = () => score++;
    const setPositions = (ele) => positions.push(ele);
    const getPositions = () => positions;
    let turn = false;
    

    return{
        getSign,
        getScore,
        increaseScore,
        setPositions,
        getPositions,
        turn,
    }
}

const changeDom = (() => {
    
    // Display the correct players sign on the board then return to be used as a reference to current player in turn
    const displaySign = (ele) =>{
        let sign = null

        if(game.freeze) {return}
        if(!player1.turn && !player2.turn) {
            ele.innerText = 'X';
            player2.turn = true;
            sign = 'X';
        }
        if(player1.turn && ele.innerText == '') {
            ele.innerText = 'X';
            player1.turn = false;
            player2.turn = true;
            sign = 'X';
        } 
        if (player2.turn && ele.innerText == ''){
            ele.innerText = 'O';
            player1.turn = true;
            player2.turn = false;
            sign = 'O';
        }
        return sign;
    }

    const displayWinner = (player) =>{
        const heading = document.querySelector('.heading')
        const win = document.createElement('p')

        win.innerText = `${player} wins`
        heading.appendChild(win)
        game.freeze = true        
    }
    
    
    return {displaySign,displayWinner}
})()

const player1 = Player('X',0)
const player2 = Player('O',0)
