'use strict';

angular
	.module('oddlyFrontApp')

	.controller('SearchCtrl', function($scope, $http, SERVER) {

		/**
		 * Autofocus search input 
		 */
		$('#search').find('input[type="text"]').focus();

		/**
		 * @var (object)
		 */
		$scope._search = {};

		$scope.SERVER = SERVER;

		/**
		 * launch search
		 *
		 * @param (string) query
		 * @return
		 */
		$scope.search = function(query) {
			// tmp
			// > 0
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