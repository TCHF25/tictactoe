const red_class = 'red'
const yellow_class = 'yellow'
const cellElements = document.querySelectorAll('[data-cell]')
const grid = document.getElementById('grid')
const wonMessageElement = document.getElementById('wonMessage')
const restartButton = document.getElementById('restartBtn')
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
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
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
  const currentClass = circleTurn ? yellow_class : red_class
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
    winningMessageTextElement.innerText = `${circleTurn ? "Yellow" : "Red"} Wins!`
  }
  wonMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(red_class) || cell.classList.contains(yellow_class)
  })
}

function appear(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  grid.classList.remove(red_class)
  grid.classList.remove(yellow_class)
  if (circleTurn) {
    board.classList.add(yellow_class)
  } else {
    board.classList.add(red_class)
  }
}

function checkWin(currentClass) {
  return winning_combinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}