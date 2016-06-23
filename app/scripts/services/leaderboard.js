(function () {
	angular
		.module('myApp')
		.service('Leaderboard', Leaderboard)

	function Leaderboard() {

		// vars
		let vm = this
		let scores = [{time: 0, difficulty: 'insane'},{time: 100, difficulty: 'easy'},{time: 50, difficulty: 'whatever'}]
		vm.getScores = getScores
		vm.addScore = addScore

		// functions
		function getScores() {
			return scores.sort((a,b)=>a.time-b.time)
		}

		function addScore(score) {
			scores.push(score)
		}

	}

})()