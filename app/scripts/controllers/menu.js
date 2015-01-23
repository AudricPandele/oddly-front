'use strict';

angular
	.module('oddlyFrontApp')

	.controller('MenuCtrl', function($scope, $routeParams, SERVER, $http) {
		$scope.routeParams = $routeParams;
		$scope.SERVER = SERVER;

		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/bookshelf/last",
			checkator: true
		})
		.success(function(data){
			$scope.item = data.item;
		})

	})
