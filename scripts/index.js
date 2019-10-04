class Game {
  constructor(level, squares, grid, bombNumber, width) {
    // this.bombs = bombs,
    // this.player = player,
    this.level = level,
    this.squares = squares,
    this.grid = grid,
    this.bombNumber = bombNumber,
    this.width = width,
    
    this.makeGrid = function() {
      console.log(width)
      for(let i = 0; i < this.width * this.width ; i ++ ) {
        this.grid =   document.querySelector('.grid')
        const square = document.createElement('div')
        this.grid.append(square)
        square.classList.add('grid-item')
        square.dataset.index = i
        this.squares.push(this.square)
      }

    }

  }

  bombs() {
    switch(this.level) {
      case 1:
        this.width = 9
        this.bombNumber = 10
        break
      case 2:
        this.width = 18
        this.bombNumber = 30
        break
      case 3:
        this.width = 36
        this.bombNumber = 90

    }

  }



}











const mineSweeper = new Game(1, [])


const init = () =>{
  mineSweeper.bombs()

  mineSweeper.makeGrid()

}




window.addEventListener('DOMContentLoaded', init)
