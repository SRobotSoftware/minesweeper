(function () {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl)

	function homeCtrl() {

		// Vars
		var vm = this;
		vm.startGame = startGame
		vm.game = {
			isRunning: false,
			hasWon: false,
			hasLost: false,
			difficulty: false,
			started: Date.now(),
			finished: Date.now(),
			grid: []
		}

		// Functions
		function createGrid(size) {
			var out = []
			var cell = {
				x: 0,
				y: 0,
				hasMine: false,
				hasFlag: false,
				isRevealed: false,
				touching: 0
			}
			// This is cool but doesn't work for my needs
			// out = Array(size).fill(Array(size).fill(cell))
			for (var i = 0; i < size; i++) {
				out.push([])
				for (var j = 0; j < size; j++) {
					out[i].push(Object.assign({}, cell))
					var current = out[i][j]
					current.x = j
					current.y = i
				}
			}
			console.log(out)
			return out
		}

		function randomCell(max) {
			var out = { x: null, y: null }
			out.x = chance.integer({ min: 0, max: max })
			out.y = chance.integer({ min: 0, max: max })
			return out;
		}

		function placeMines(grid, difficulty) {
			var mines = []
			var flag = 1
			while (mines.length < difficulty) {
				flag = 1
				var mine = randomCell(grid.length - 1)
				mines.forEach((x) => {
					if (x === mine) flag = 0
				})
				if (flag) mines.push(mine)
			}
			console.log(mines)
			mines.forEach((x) => {
				grid[x.y][x.x].hasMine = true
			})
			return grid
		}

		function findTouching(grid, cell) {
			var out = 0
			var x = cell.x
			var y = cell.y
			var search = [
				[x-1, y-1], // top left
				[x, y-1], // top middle
				[x+1, y-1], // top right
				[x-1, y], // left
				[x+1, y], // right
				[x-1, y+1], // bottom left
				[x, y+1], // bottom middle
				[x+1, y+1] // bottom right
			]
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

		function render(grid) {
			vm.game.grid = grid
		}

		function startGame(difficulty) {
			console.log("starting game")
			if (difficulty > 2 || difficulty < 0) difficulty = 0
			difficulty += 1
			var grid = createGrid(difficulty * 10)
			placeMines(grid, difficulty * 9)
			calcMines(grid)
			render(grid)
		}

	}

})()