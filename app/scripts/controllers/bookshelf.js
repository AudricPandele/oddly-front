'use strict';

angular
	.module('oddlyFrontApp')

	.controller("BookshelfPendingCtrl", function($scope, $http, SERVER){
		$scope.SERVER = SERVER;
		$scope.items = [];

		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/bookshelf/pending", // PROD
			//url: "/dummy/toread.json", // DUMMY
			checkator: true,
		})
		.success(function(data){
			$scope.items = data.items;
		})
		.error(function(e){
		})
	})

	.controller("BookshelfArtistsCtrl", function($scope, $http, SERVER){
		$scope.SERVER = SERVER;
		$scope.artists = [];

		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/bookshelf/artists", // PROD
			//url: "/dummy/bookshelf/artists.json", // DUMMY
			checkator: true,
		})
		.success(function(data){
			console.log(data);
			$scope.artists = data.artists;
		})
		.error(function(e){
		})
	})

	.controller("BookshelfTypeCtrl", function($scope, $http, SERVER, $routeParams){
		$scope.SERVER = SERVER;
		$scope.items = [];
		$scope.types = ["books","comics","magazines","newspapers"];
		$scope.type = $routeParams.type.toUpperCase();

		if($scope.types.indexOf($routeParams.type) != -1){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/bookshelf/" + $scope.types.indexOf($routeParams.type) + "/items", // PROD
				//url: "/dummy/bookshelf/type.json", // DUMMY
				checkator: true,
			})
			.success(function(data){
				console.log(data);
				$scope.items = data.items;
			})
			.error(function(e){
			})
		}
	})
