class Game {
  constructor(level, squares, grid, bombNumber, width) {
    this.bombs = document.querySelectorAll('.bomb'),
    this.level = level,
    this.squares = squares,
    this.grid = grid,
    this.bombNumber = bombNumber,
    this.width = width,
    this.playing = true,
    this.gameOver = function() {
      console.log('game over')
    },
    this.clear = function(e) {

      const target = parseInt(e.target.dataset.index)
      this.gridSquares = [...document.querySelectorAll('.grid-item')]
      const mapped = this.gridSquares.map(el => parseInt(el.dataset.index))
      this.sweep(target, mapped)
    }



    this.sweep = function(target, mapped) {


      const clearedArray = mapped.filter(el => (el === target) || (el === target - 1) || (el === target - 11 - 1) || (el === target + 1) || (el === target + 11 + 1) || (el === target + 11) || (el === target - 11))

      clearedArray.map(el => document.querySelector(`[data-index="${el}"]`).classList.contains('safe') && !document.querySelector(`[data-index="${el}"]`).classList.contains('number')   ? document.querySelector(`[data-index="${el}"]`).classList.add('clear') : el )
      console.log(clearedArray)

      // for(let i = 0; i <= clearedArray.length; i ++ ) {
      //   document.querySelector(`[data-index="${clearedArray[i]}"]`).classList.contains('grid-wall') ? this.nextGo() : this.sweep(clearedArray[i ],mapped )
      // }
      const nextArray = mapped.filter(el => (el === target) || (el === target - 1) || (el === target - 11 - 1) || (el === target + 1) || (el === target + 11 + 1) || (el === target + 11) || (el === target - 11) || (el === target + 11 - 1))

      nextArray.every(cleared =>

        document.querySelector(`[data-index="${cleared}"]`).classList.contains('grid-wall') || document.querySelector(`[data-index="${cleared}"]`).classList.contains('cleared') || document.querySelector(`[data-index="${cleared}"]`).classList.contains('number') ? console.log('working') : this.sweep(cleared,mapped ))



    }



    this.makeGrid = function() {
      console.log(this.width)
      for(let i = 0; i < (this.width + 2) * (this.width + 2); i ++ ) {
        this.grid = document.querySelector('.grid')
        const square = document.createElement('div')

        this.grid.append(square)
        square.classList.add('grid-item')
        if(i > 11 && i < 109 && (i % 11 !== 0) && ((i + 1) % 11 !== 0)){

          square.classList.add('safe')
          square.dataset.index = i

          this.squares.push(this.square)
        } else {
          square.classList.add('grid-wall')
          square.dataset.index = i

        }
      }

      const safe = [...document.querySelectorAll('.safe')]
      for(let i = 0; i < safe.length; i ++ ) {
        safe[i].dataset.i = i
      }




    }

  }

  nextGo() {
    console.log('next go')
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
      indexArray.map(el => document.querySelector(`[data-i="${el}"]`).classList.remove('safe'))
    }

    this.placeNumbers(indexArray)

  }

  nextGo() {
    console.log('this go')
  }

  placeNumbers(indexArray){
    console.log(indexArray)
    const flagArray = indexArray.reduce((acc, el) => acc = acc.concat(el +1).concat(el - 1).concat(el + this.width).concat(el - this.width).concat(el +(this.width + 1)).concat(el - (this.width + 1)).concat(el + (this.width - 1)).concat(el - (this.width - 1)), []).filter(el => el > -1 && el < (this.width * this.width))

    const flagOb = flagArray.reduce((acc, el) => {
      if(el in acc) {
        acc[el] ++
      } else {
        acc[el] = 1
      }
      return acc
    }, {})
    Object.keys(flagOb).map(el => document.querySelector(`[data-i="${el}"]`).innerText = `${flagOb[el]}`)
    Object.keys(flagOb).map(el => document.querySelector(`[data-i="${el}"]`).classList.add('number'))
  }


  loseFunc(e) {
    !e.target.classList.contains('safe') ? mineSweeper.gameOver() : mineSweeper.clear(e)

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
