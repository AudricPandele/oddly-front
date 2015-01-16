'use strict';

angular
	.module('oddlyFrontApp')

	.controller('SearchCtrl', function($scope, $http, SERVER, $routeParams) {

		autoFocus();

		/**
		 * @var (object)
		 */
		$scope._search = {};

		/**
		 * @var (object)
		 */
		$scope.SERVER = SERVER;

		/**
		 * launch search
		 *
		 * @param (string) query
		 * @return
		 */
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
					return $scope._search = data.result;
				});

			} else if(query.length < 2) {
				return $scope._search = {};
			} 
		}

		if($routeParams.query !== undefined) {
			$scope.query = $routeParams.query;
			$scope.search($scope.query);
		}

		/**
		 * Autofocus search input 
		 *
		 * @return
		 */
		function autoFocus() {
			return $('#search').find('input[type="text"]').focus();
		}

	});