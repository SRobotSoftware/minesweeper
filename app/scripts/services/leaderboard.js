(function () {
	angular
		.module('myApp')
		.service('Leaderboard', Leaderboard)

	function Leaderboard() {

		// vars
		let vm = this
		let scores = [{player: 'Computer', time: 180, difficulty: 'Hard'},{player: 'Computer', time: 60, difficulty: 'Easy'},{player: 'Computer', time: 120, difficulty: 'Medium'}]
		vm.getScores = getScores
		vm.addScore = addScore

		// functions
		function getScores() {
			sortScores()
			return scores
		}

		function sortScores() {
			scores.sort((a,b)=>a.time-b.time)
		}

		function addScore(score) {
			scores.push(score)
			sortScores()
		}

	}

})()