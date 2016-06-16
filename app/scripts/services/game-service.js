(function () {
	angular
		.module('myApp')
		.service('GameService', GameService)

	function GameService() {

		let vm = this
		let game = {
			isRunning: false,
			hasWon: false,
			hasLost: false,
			difficulty: false,
			started: Date.now(),
			finished: Date.now(),
			grid: []
		}
		vm.createGrid = createGrid
		vm.getGame = getGame

		function getGame(difficulty) {
			if (difficulty > 2 || difficulty < 0) difficulty = 0
			difficulty += 1
			game.grid = createGrid(difficulty * 10)
			placeMines(game.grid, difficulty * 9)
			calcMines(game.grid)
			return game
		}

		function createGrid(size) {
			let out = []
			let cell = {
				x: 0,
				y: 0,
				hasMine: false,
				hasFlag: false,
				isRevealed: false,
				touching: 0
			}
			for (let i = 0; i < size; i++) {
				out.push([])
				for (let j = 0; j < size; j++) {
					out[i].push(Object.assign({}, cell))
					let current = out[i][j]
					current.x = j
					current.y = i
				}
			}
			console.log('Grid created: ', out)
			return out
		}

		function randomCell(max) {
			let out = { x: null, y: null }
			out.x = chance.integer({ min: 0, max: max })
			out.y = chance.integer({ min: 0, max: max })
			return out;
		}

		function placeMines(grid, difficulty) {
			let mines = []
			let flag = 1
			while (mines.length < difficulty) {
				flag = 1
				let mine = randomCell(grid.length - 1)
				mines.forEach((x) => {
					if (x === mine) flag = 0
				})
				if (flag) mines.push(mine)
			}
			console.log('Mines are located at: ', mines)
			mines.forEach((x) => {
				grid[x.y][x.x].hasMine = true
			})
			return grid
		}

		function findTouching(grid, cell) {
			let out = 0
			let x = cell.x
			let y = cell.y
			let search = [
				[x - 1, y - 1], // top left
				[x, y - 1], // top middle
				[x + 1, y - 1], // top right
				[x - 1, y], // left
				[x + 1, y], // right
				[x - 1, y + 1], // bottom left
				[x, y + 1], // bottom middle
				[x + 1, y + 1] // bottom right
			]
			search.forEach((coords, index) => {
				let flag = true
				coords.forEach((coord) => {
					if (coord > grid.length - 1 || coord < 0) flag = false
				})
				if (flag) {
					if (grid[search[index][1]][search[index][0]].hasMine) out++
				}
			})
			return out
		}

		function calcMines(grid) {
			grid.forEach((row) => {
				row.forEach((cell) => {
					cell.touching = findTouching(grid, cell)
				})
			})
			return grid
		}


	}

})()