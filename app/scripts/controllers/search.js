'use strict';

angular
	.module('oddlyFrontApp')

	.controller('SearchCtrl', function($scope, $http, SERVER) {

		$scope._search = {};

		$scope.search = function(query) {
			if(query.length > 0) {

				$http({
					medtod: "GET",
					url: SERVER.METHOD + SERVER.API + "/search",
					checkator: true,
					params: {
						query: query
					}
				})
				.success(function(data){
					console.log(data);
					return $scope._search = data.result;
				});

			} else if(query.length < 2) {
				return $scope._search = {};
			}
		}

	});