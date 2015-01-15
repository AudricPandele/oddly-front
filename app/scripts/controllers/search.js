'use strict';

angular
	.module('oddlyFrontApp')

	.controller('SearchCtrl', function($scope, $http, SERVER) {

		$scope.search = {};

		$scope.search = function(query) {
			if(query.length > 2) {

				$http({
					medtod: "GET",
					url: SERVER.METHOD + SERVER.API + "/search",
					checkator: true,
					params: {
						query: query
					}
				})
				.success(function(data){
					$scope.search = data.result;
				});

			} else 
				return false;
		}

	});