'use strict';

angular
	.module('oddlyFrontApp')

	.controller('ArtistCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams) {
		$scope.SERVER = SERVER;

		// Get artist infos
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/artist/" + $routeParams.id,
			checkator: true
		})
		.success(function(data){
			$scope.artist = data.artist;
		})
		.error(function(e){
			console.log(e);
		});

	})
