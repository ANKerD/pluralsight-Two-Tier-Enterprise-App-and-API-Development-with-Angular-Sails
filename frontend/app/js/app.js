angular.module('app', ['satellizer', 'ui.bootstrap', 'ui.router', 'toastr', 'ngAnimate'])
.config(function ($authProvider, $stateProvider, $urlRouterProvider, toastrConfig, API_URL) {
	$authProvider.twitter({
		url: API_URL + '/user/login'
	});

	$stateProvider
	.state('posts', {
		url: '/',
		templateUrl: 'myposts.html',
		controller: 'MyPostsCtrl'
	})
	.state('post', {
		url: '/post?id',
		templateUrl: 'post.html',
		controller: 'PostCtrl'
	})

	$urlRouterProvider.otherwise('/');

	toastrConfig.positionClass = 'toast-bottom-right'
})
.constant('API_URL', 'http://localhost:1337');
