let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restart');
let boxes = Array.from(document.getElementsByClassName('box'));

// console.log(boxes);

const o = "O";
const x = "X";
let currentPlayer = x;
let count_plays = 0;

let spaces = Array(9).fill(null);

console.log(spaces);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked (e) {
    const id = e.target.id;

    if(!spaces[id] && count_plays < 9) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false ) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winner_blocks = playerHasWon();

            //console.log(winner_blocks)
            
            winner_blocks.map ( box => boxes[box].style.backgroundColor = "#1d1d1d")
            return
        }
        count_plays++;
        currentPlayer = currentPlayer == x ? o : x;
    }

    if(count_plays === 9) {
        playerText.innerHTML = 'Game over';
        playerText.style.color = "red"
        boxes.forEach(box => box.style.color = "red")
    }
}

const winner = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function playerHasWon () {
   for(const condition of winner) {
    let [a, b, c] = condition;

    if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
        return [a, b, c]
    }
   }
   return false;
}

restartBtn.addEventListener('click', restart)

function restart () {
    spaces.fill(null);
    count_plays = 0;

    boxes.forEach( box => {
        box.innerText = '';
        box.style.backgroundColor = '';
        box.style.color = ''
    })

    playerText.innerHTML= 'Tic Tac Toe'
    playerText.style.color = ""
    currentPlayer = x;
}

startGame()

