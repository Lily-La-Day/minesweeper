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
      // this.sweepRight(target, mapped)
      // this.sweepUp(target)
      // this.sweepDown(target)


    }



    this.sweep = function(target, mapped) {
      console.log(mapped)

      const clearedArray = mapped.filter(el => (el === target) || (el === target - 1) || (el === target - this.width - 1) && (el + 1 % this.width !== 0))

      clearedArray.map(el => document.querySelector(`[data-index="${el}"]`).classList.contains('safe') ? document.querySelector(`[data-index="${el}"]`).classList.add('clear') : el )

      clearedArray.every(cleared => cleared === 0 ? this.nextGo() : this.sweep(cleared, mapped))

      // const cleared = clearedArray.sort()[0]
      // cleared % this.width === 0 ||  (cleared + 1) % this.width === 0 || cleared - 1 % this.width === 0  || cleared % this.width === 0 ? this.nextGo() : this.sweepLeft(cleared, mapped)


    }
    // this.sweepRight = function(target, mapped) {
    //
    //
    //   const clearedArray = mapped.filter(el => el === target || el === target + 1 || el === target + this.width + 1)
    //
    //
    //   clearedArray.map(el => document.querySelector(`[data-index="${el}"]`).classList.contains('safe') ? document.querySelector(`[data-index="${el}"]`).classList.add('clear') : el )
    //
    //
    //   clearedArray.map(cleared =>
    //     cleared % this.width === 0 || cleared + 1 % this.width === 0 || cleared % this.width === 0 ? this.nextGo() : this.sweepRight(cleared, mapped))
    //
    //
    // }

    this.makeGrid = function() {
      console.log(this.width)
      for(let i = 0; i < (this.width + 2) * (this.width + 2); i ++ ) {
        this.grid = document.querySelector('.grid')
        const square = document.createElement('div')

        this.grid.append(square)
        if(i > 11 && i < 109 && (i % 11 !== 0) && ((i + 1) % 11 !== 0)){
          square.classList.add('grid-item')
          square.classList.add('safe')

          this.squares.push(this.square)
        } else {
          square.classList.add('grid-wall')
          square.dataset.index = 0
        }
      }

      const safe = [...document.querySelectorAll('.safe')]
      for(let i = 0; i < safe.length; i ++ ) {
        safe[i].dataset.index = i
      }




    }

  }

  nextGo() {
    console.log('nex go')
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
      indexArray.map(el => document.querySelector(`[data-index="${el}"]`).classList.remove('safe'))
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
    Object.keys(flagOb).map(el => document.querySelector(`[data-index="${el}"]`).innerText = `${flagOb[el]}`)
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

//
// const sweep = (target) => {
//
//   cleared = mapped.filter(el => (el === (target) || el === (target +1 ) || el === (target - 1) || el === (target + this.width) || el === (target - this.width) || el === (target + (this.width + 1)) || el === (target - (this.width + 1)) || el === (target + (this.width - 1)) || el === (target - (this.width - 1))))
//
//   cleared.map(el => document.querySelector(`[data-index="${el}"]`).classList.add('clear'))
//   cleared.map(el => sweep(el))
//
// }
//
// sweep(target)
//
// this.sweepLeft = function(target, mapped) {
//   console.log(mapped)
//
//   const clearedArray = mapped.filter(el => (el === target) || (el === target - 1) || (el === target - this.width - 1))
//
//   clearedArray.map(el => document.querySelector(`[data-index="${el}"]`).classList.contains('safe') ? document.querySelector(`[data-index="${el}"]`).classList.add('clear') : el )
//
//   clearedArray.every(cleared =>
//     cleared % this.width === 0 ||  cleared + 1 % this.width === 0 || cleared - 1 % this.width === 0  || cleared % this.width === 0 ? this.nextGo() : this.sweepLeft(cleared, mapped))

// const cleared = clearedArray.sort()[0]
// cleared % this.width === 0 ||  (cleared + 1) % this.width === 0 || cleared - 1 % this.width === 0  || cleared % this.width === 0 ? this.nextGo() : this.sweepLeft(cleared, mapped)


// }
// this.sweepRight = function(target, mapped) {
//
//
//   const clearedArray = mapped.filter(el => el === target || el === target + 1 || el === target + this.width + 1)
//
//
//   clearedArray.map(el => document.querySelector(`[data-index="${el}"]`).classList.contains('safe') ? document.querySelector(`[data-index="${el}"]`).classList.add('clear') : el )
//
//
//   clearedArray.map(cleared =>
//     cleared % this.width === 0 || cleared + 1 % this.width === 0 || cleared % this.width === 0 ? this.nextGo() : this.sweepRight(cleared, mapped))
//
//
// }
