angular.module('app')
.controller('PostCtrl', function ($scope, $http, $location, $state, toastr, API_URL) {

	// get the id of current post if exists
	var id = $location.search().id;

	// Time config
	$scope.time = new Date();

	$scope.hstep = 1;
	$scope.mstep = 15;

	$scope.options = {
		hstep: [1, 2, 3],
		mstep: [1, 5, 10, 15, 25, 30]
	};

	// Calendar config
	$scope.opened = false;

	$scope.datepickerOptions = {
		minDate: new Date()
	};

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = !$scope.opened;
	};

	if (isEditingPost()) {
		$scope.isEditing = true;
		getPost(id);
		$scope.save = editPost;
	}else {
		$scope.save = newPost;
	}

	$scope.delete = deletePost;

	// get the post on the URL query
	function getPost(id) {

		$http({
			method: 'GET',
			url: API_URL + '/post/' + id
		})
		.then(function (res) {
			toastr.info('Loading data');
			$scope.message = res.data.message;
			$scope.date = new Date(res.data.scheduledFor);
			$scope.time = new Date(res.data.scheduledFor);
		})
		.catch(function (res) {
			toastr.error('Something went wrong');
		});
	}

	function newPost() {
		var scheduledFor = new Date(
			$scope.date.getFullYear(),
			$scope.date.getMonth(),
			$scope.date.getDate(),
			$scope.time.getHours(),
			$scope.time.getMinutes()
		);

		$http({
			method: 'POST',
			url: API_URL + '/post/tweet',
			data: {
				message: $scope.message,
				scheduledFor: scheduledFor
			}
		})
		.then(function () {
			toastr.success('New post created');
		})
		.catch(function () {
			toastr.error('Something went wrong');
		});
	}

	function editPost() {
		var scheduledFor = new Date(
			$scope.date.getFullYear(),
			$scope.date.getMonth(),
			$scope.date.getDate(),
			$scope.time.getHours(),
			$scope.time.getMinutes()
		);

		$http({
			method: 'POST',
			url: API_URL + '/post/update/' + id,
			data: {
				message: $scope.message,
				scheduledFor: scheduledFor
			}
		})
		.then(function (res) {
			toastr.success('Post edited');
			$scope.message = res.data.message;
			$scope.date = new Date(res.data.scheduledFor);
			$scope.time = new Date(res.data.scheduledFor);
		})
		.catch(function (res) {
			toastr.error('Something went wrong');
		});
	}

	function deletePost() {
		$http({
			method: 'POST',
			url: API_URL + '/post/destroy/' + id
		})
		.then(function () {
			// $state.go('post');
			$location.search('id', null);
			toastr.warning('Post deleted');
			$scope.message = null;
		})
		.catch(function (res) {

			toastr.error('Something went wrong');
		});
	}

	function isEditingPost() {
		return id;
	}
})
