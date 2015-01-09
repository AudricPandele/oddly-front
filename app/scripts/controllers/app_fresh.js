'use strict';

angular
	.module('oddlyFrontApp')

	//General app controller
	.controller('FreshTypeCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams) {
		$scope.type = $routeParams.type.charAt(0).toUpperCase() + $routeParams.type.slice(1);
		$scope.SERVER = SERVER;
		$scope.types = {
			"books" : 0,
			"comics" : 1,
			"magazines" : 2,
			"newspapers" : 3
		};


		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/items/fresh/"+$scope.types[$routeParams.type],
			checkator: true
		})
		.success(function(data){
			$scope.items = data.items;
		})
		.error(function(e){
			console.log(e);
		})
	})
