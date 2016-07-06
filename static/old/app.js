console.log('Starting Miha Application');

var socket = io(window.location.origin);
var app = angular.module('Miha', []);

app.controller('BodyController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	console.log('BodyController', $scope, $rootScope);
	$rootScope.user = null;
	socket.on('Initialize', function (data) {
		if (data.user) {
			$rootScope.user = data.user;
		} else {
			$rootScope.user = null;
		}
		$scope.$apply();
		$('#loading').remove();
	});
}]);

app.controller('AuthenticationController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	console.log('AuthenticationController', $scope, $rootScope);
	$scope.emailMaxLength = 100;
	$scope.passwordMaxLength = 100;
	$scope.emailMinLength = 5;
	$scope.passwordMinLength = 8;
	$scope.attemptLogIn = function  () {
		console.log('attemptLogIn', $scope, $scope.email, $scope.password, $scope.logInForm);
		if ($scope.logInForm.$invalid || !$scope.email || !$scope.password) {
			alert('Invalid Credentials');
			return;
		} else {
			socket.emit('AttemptLogIn', {email: $scope.email, password: $scope.password});
		}
	};
	socket.on('LogInResults', function (data) {
		console.log('LogInResults', data);
		if (data.user) {
			$rootScope.user = data.user;
		} else {
			$rootScope.user = null;
			alert(data.error);
		}
		$scope.$apply();
	});
}]);

app.controller('UserController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	console.log('UserController', $scope, $rootScope);
	$scope.attemptLogOut = function () {
		socket.emit('AttemptLogOut', {});
	};
	socket.on('LogOutResults', function (data) {
		console.log('LogOutResults', data);
		if (data.error) {
			alert(data.error);
		} else {
			$rootScope.user = null;
		}
		$scope.$apply();
	});
}]);