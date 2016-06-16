(function () {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl)

	function homeCtrl(GameService) {

		// vars
		let vm = this
		vm.newGame = newGame
		vm.game = GameService.getGame(0)
		vm.sweep = GameService.sweep
		vm.handleClick = handleClick
		vm.difficulty = null

		// Functions

		function newGame(difficulty) {
			vm.game = GameService.getGame(difficulty)
			vm.difficulty = difficulty
		}

		function handleClick(e, cell) {
			switch (e.which) {
			case 1:
				GameService.sweep(cell)
				break
			case 3:
				GameService.flag(cell)
				break
			default:
				GameService.sweep(cell)
				break
			}
		}


	}

})()