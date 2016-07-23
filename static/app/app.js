console.log('Starting Harb');
var socket = io(window.location.origin);
var app = angular.module('app', []);
app.controller('ViewportController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	console.log('ViewportController');
	$scope.user = {
		username: localStorage.getItem('username') && localStorage.getItem('username') !== 'undefined' ? localStorage.getItem('username') : '',
		id: localStorage.getItem('id') && localStorage.getItem('id') !== 'undefined' ? localStorage.getItem('id') : '',
		wait: false,
		game: null
	};
	$scope.quick = function () {
		console.log('Quick Play');
		socket.emit('quick', {username: $scope.user.username});
	};
	socket.on('wait', function (data) {
		console.log('Waiting for more players', data);
		$scope.user.wait = true;
		$scope.user.id = data.id;
		localStorage.setItem('username', data.username);
		localStorage.setItem('id', data.id);
		$scope.$apply();
	});
	socket.on('start', function (data) {
		console.log('Starting the game', data);
		$scope.user.wait = false;
		$scope.user.id = data.user.id;
		$scope.user.game = data.game;
		localStorage.setItem('username', data.user.username);
		localStorage.setItem('id', data.user.id);
		$scope.$apply();
	});
	console.log('scope', $scope);
}]);
