angular.module('app').controller('LoginCtrl', function ($scope, $http, $auth, API_URL) {
	$scope.login = function() {
		$auth.authenticate('twitter');
	};

	$scope.logout = function() {
		$auth.logout();
	};

	$scope.isAuthenticated = $auth.isAuthenticated;
})
