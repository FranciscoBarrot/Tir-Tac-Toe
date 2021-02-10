const gameBoard = (() => {
  const board = Array(9)
  return { board }
})()

const displayController = ((doc) => {
  const display = (array) => {
    array.forEach((element, index) => {
      doc.querySelectorAll('.square')[index].textContent = element
    })
  }
  return { display }
})(document)

displayController.display(gameBoard.board)

const players = () => {
  const score
}

const game = (() => {})()
