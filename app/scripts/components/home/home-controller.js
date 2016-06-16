(function () {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl)

	function homeCtrl(GameService) {

		// vars
		let vm = this
		vm.newGame = newGame
		vm.game = GameService.getGame(0)

		// Functions

		function newGame(difficulty) {
			vm.game = GameService.getGame(difficulty)
		}



	}

})()