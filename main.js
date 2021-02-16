const gameBoard = (() => {
  const board = Array(9)
  const markTheSpot = (index, mark) => {
    if (board[index] === undefined) {
      board[index] = mark
    }
  }
  return { board, markTheSpot }
})()

const displayController = ((doc) => {
  const display = (array) => {
    array.forEach((element, index) => {
      doc.querySelectorAll('.square')[index].textContent = element
    })
  }
  return { display }
})(document)

const players = (mark) => {
  return { mark }
}

const game = ((doc) => {
  let turn = 1
  const play = (e) => {
    if (turn === 1) {
      gameBoard.markTheSpot(e.target.dataset.index, player1.mark)
      turn = 2
    } else {
      turn = 1
      gameBoard.markTheSpot(e.target.dataset.index, player2.mark)
    }
    displayController.display(gameBoard.board)
  }
  doc.querySelectorAll('.square').forEach((square) => {
    square.addEventListener('click', play)
  })
})(document)

/* displayController.display(gameBoard.board) */
const player1 = players('x')
const player2 = players('o')
