angular.module('app')
.controller('MyPostsCtrl', function ($scope, $http, toastr, API_URL) {

	$http({
		method: 'GET',
		url: API_URL + '/post/myPosts'
	})
	.then(function (res) {
		$scope.posts = res.data;
		toastr.success('Loading data');
	})
	.catch(function () {
		toastr.error('Something went wrong');
	});
})
