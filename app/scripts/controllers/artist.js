'use strict';

angular
	.module('oddlyFrontApp')

	.controller('ArtistCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams) {
		$scope.SERVER = SERVER;
		$scope.types = [
			"Writer",
			"Drawer"
		];

		// Get artist infos
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/artist/" + $routeParams.id,
			checkator: true
		})
		.success(function(data){
			console.log(data.artist);
			$scope.artist = data.artist;
		})
		.error(function(e){
			console.log(e);
		});


		$scope.getRank = function(rate){
			rate = parseInt(rate);
			rate = (rate > 5) ? 5 : ((rate < 0) ? 0 : rate);

			var full_stars = rate;
			var empty_stars = 5 - rate;

			var res = "";
			for(var i = 0; i < full_stars; i++) res+="<i class='fa fa-star'></i>";
			for(var i = 0; i < empty_stars; i++) res+="<i class='fa fa-star-o'></i>";

			return res;
		};

	})
