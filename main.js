const gameBoard = (() => {
  const board = Array(9)
  const cleanUpBoard = () => {
    for (i = 0; i < 9; i++) {
      board[i] = undefined
    }
  }
  return { board, cleanUpBoard }
})()

const displayController = ((doc) => {
  const display = (array) => {
    array.forEach((element, index) => {
      doc.querySelectorAll('.square')[index].textContent = element
    })
  }
  const displayWinner = (player) => {
    doc.querySelector('.winner-display').textContent =
      'Player ' + player.mark.toUpperCase() + ' Wins'
  }
  const cleanWinnerDisplay = () => {
    doc.querySelector('.winner-display').textContent = ''
  }
  return { display, displayWinner, cleanWinnerDisplay }
})(document)

const players = (mark) => {
  let _winner = false
  let _name
  const markTheSpot = (index, array) => {
    array[index] = mark
  }
  const setWinner = (boolean) => {
    _winner = boolean
  }
  const getWinner = () => {
    return _winner
  }
  const setName = (name) => {
    _name = name
  }
  const getName = () => {
    return _name
  }
  return { mark, markTheSpot, setWinner, getWinner, getName, setName }
}

const game = ((doc) => {
  let _turn = 1

  const _checkColumn = (array, player) => {
    for (i = 0; i < 3; i++) {
      if (
        (array[i] !== undefined) &
        ((array[i] === array[i + 3]) & (array[i] === array[i + 6]))
      ) {
        player.setWinner(true)
        break
      }
    }
  }
  const _checkRow = (array, player) => {
    for (i = 0; i < 3; i++) {
      j = i * 3
      if (
        (array[j] !== undefined) &
        ((array[j] === array[j + 1]) & (array[j] === array[j + 2]))
      ) {
        player.setWinner(true)
        break
      }
    }
  }
  const _checkDiagonal = (array, player) => {
    if (
      (array[4] !== undefined) &
      ((array[4] === array[0]) & (array[4] === array[8]) ||
        (array[4] === array[2]) & (array[4] === array[6]))
    ) {
      player.setWinner(true)
    }
  }
  const _checkTie = (array) => {
    let fullBoard = true
    array.forEach((square) => {
      if (square === undefined) {
        fullBoard = false
      }
    })
    if (fullBoard) {
    }
  }
  const _checkWinnner = (player, board) => {
    _checkColumn(board, player)
    _checkRow(board, player)
    _checkDiagonal(board, player)
    _checkTie(board)
  }

  const addClickHander = (array, player1, player2) => {
    doc.querySelectorAll('.square').forEach((square) => {
      square.addEventListener('click', function (e) {
        if (
          (array[e.target.dataset.index] === undefined) &
          (player1.getWinner() === false) &
          (player2.getWinner() === false)
        ) {
          if (_turn === 1) {
            player1.markTheSpot(e.target.dataset.index, array)
            _checkWinnner(player1, gameBoard.board)
            _turn = 2
          } else {
            player2.markTheSpot(e.target.dataset.index, array)
            _checkWinnner(player2, gameBoard.board)
            _turn = 1
          }
          displayController.display(array)
          if (player1.getWinner()) {
            displayController.displayWinner(player1)
          } else if (player2.getWinner()) {
            displayController.displayWinner(player2)
          }
        }
      })
    })
  }

  const restart = () => {
    gameBoard.cleanUpBoard()
    displayController.display(gameBoard.board)
    player1.setWinner(false)
    player2.setWinner(false)
    displayController.cleanWinnerDisplay()
  }
  return { addClickHander, restart }
})(document)

const player1 = players('x')
const player2 = players('o')

game.addClickHander(gameBoard.board, player1, player2)

const popupBtn = document
  .querySelector('.restart-btn')
  .addEventListener('click', game.restart)
