const game = (() => {
    const btns = document.querySelectorAll('button');
    
    btns.forEach(btn => {
        btn.addEventListener('click',e => {
            changeDom.makeX(e.target)
        })
    })
})()

function Player (sign,score) {
    const getSign = () => sign;
    const getScore = () => score; //put score into a getScore fucntion to avoid score being changed from outside the factory
    const increaseScore = () => score++;

    return{getSign,getScore,increaseScore}
}

const changeDom = (() => {
    function makeX (ele) {
        ele.innerText = 'X'
    }

    return {makeX}
})()

const player1 = Player('x',0)

console.log(player1.increaseScore())

console.log(player1.getScore())
console.log(player1.getScore())