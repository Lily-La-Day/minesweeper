
class Game {
  constructor(level, squares, grid) {
    // this.bombs = bombs,
    // this.player = player,
    this.level = level,
    this.squares = squares,
    this.grid = grid


  }



  makeGrid(){
    for(let i = 0; i < this.level * this.level ; i ++ ) {
      this.grid =   document.querySelector('.grid')
      const square = document.createElement('div')
      console.log(this.level)
      this.grid.append(square)
      square.classList.add('grid-item')
      square.dataset.index = i
      this.squares.push(this.square)
    }

  }



}

const mineSweeper = new Game(9, [])


const init = () => {
  mineSweeper.makeGrid()
}




window.addEventListener('DOMContentLoaded', init)
