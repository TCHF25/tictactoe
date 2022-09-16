const red_class = 'red'
const yellow_class = 'yellow'
const boxElements = document.querySelectorAll('[data-box]')
const grid = document.getElementById('grid')
const wonMessageElement = document.getElementById('wonMessage')
const restartBtn = document.getElementById('restartBtn')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
let Turn

startGame()

restartBtn.addEventListener('click', startGame)

function startGame() {
  Turn = false
  boxElements.forEach(cell => {
    cell.classList.remove(red_class)
    cell.classList.remove(yellow_class)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  wonMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = Turn ? yellow_class : red_class
  appear(cell, currentClass)
  if (checkWin(currentClass)) {
    end(false)
  } else if (isDraw()) {
    end(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}


function end(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${Turn ? "Yellow" : "Red"} Wins!`
  }
  wonMessageElement.classList.add('show')
}

function isDraw() {
  return [...boxElements].every(cell => {
    return cell.classList.contains(red_class) || cell.classList.contains(yellow_class)
  })
}

function appear(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  Turn = !Turn
}

function setBoardHoverClass() {
  grid.classList.remove(red_class)
  grid.classList.remove(yellow_class)
  if (Turn) {
    grid.classList.add(yellow_class)
  } else {
    grid.classList.add(red_class)
  }
}

function checkWin(currentClass) {
  return winning_combinations.some(combination => {
    return combination.every(index => {
      return boxElements[index].classList.contains(currentClass)
    })
  })
}