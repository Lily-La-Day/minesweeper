class Game {
  constructor(level, squares, grid, bombNumber, width) {
    this.bombs = document.querySelectorAll('.bomb'),
    this.level = level,
    this.squares = squares,
    this.grid = grid,
    this.bombNumber = bombNumber,
    this.width = width,
    this.playing = true


    this.makeGrid = function() {
      console.log(this.width)
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

  setLevel() {
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

  placeBombs(){
    let indexArray = []
    while(indexArray.length < this.bombNumber){
      const random = Math.floor(Math.random() * (this.width * this.width))
      console.log(random)
      indexArray.includes(random) ? indexArray : indexArray = indexArray.concat(random)
      indexArray.map(el => document.querySelector(`[data-index="${el}"]`).classList.add('bomb'))
    }

    this.placeNumbers(indexArray)
    console.log(this.gridSquares)



  }

  placeNumbers(indexArray){
    console.log(indexArray)
    const flagArray = indexArray.reduce((acc, el) => acc = acc.concat(el +1).concat(el - 1).concat(el + 9).concat(el - 9), []).filter(el => el > -1 && el < 81)

    const flagOb = flagArray.reduce((acc, el) => {
      if(el in acc) {
        acc[el] ++
      } else {
        acc[el] = 1
      }
      return acc
    }, {})
    Object.keys(flagOb).map(el => document.querySelector(`[data-index="${el}"]`).innerText = `${flagOb[el]}`)
  }


  loseFunc(e) {
    console.log('you lose')
    return e.target.classList.contains('bomb') ? this.playing = false : this.playing

  }

  addListener(){
    this.gridSquares = document.querySelectorAll('.grid-item')
    this.gridSquares.forEach(el => el.addEventListener('click', this.loseFunc))
  }

}

















const mineSweeper = new Game(1, [])


const init = () =>{
  mineSweeper.setLevel()
  mineSweeper.makeGrid()
  mineSweeper.placeBombs()
  mineSweeper.addListener()



}




window.addEventListener('DOMContentLoaded', init)
