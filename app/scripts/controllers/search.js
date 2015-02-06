'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Mega search controller - To find all the stuff you want on the interwebs
	 * @controller SearchCtrl
	 * @param {Object} $scope
	 * @param {Object} $http
	 * @param {Object} SERVER
	 * @param {Object} $routeParams
	 * @param {Object} $rootScope
	 */
	.controller('SearchCtrl', function($scope, $http, SERVER, $routeParams, $rootScope) {


		/**
		 * Search results
		 * @attribute {Object} found
		 */
		$scope.found = {};


		/**
		 * App server constant
		 * @attribute {Object} SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Search something bro
		 * @method search
		 * @param {String} query - The "thing" you want to search
		 */
		$scope.search = function(query) {
			if(query.length <= 2) return $scope.found = {};

			$http({
				medtod: "GET",
				url: SERVER.METHOD + SERVER.API + "/search",
				checkator: true,
				params: { query: query }
			})
			.success(function(data){
				$scope.found = data.result;
			})
		};


		/**
		 * Check if there was results from the last query
		 * @method noResults
		 * @param {Object} search - Search results
		 * @return {boolean} - true if nothing is found, false otherwise
		 */
		$scope.noResults = function(search) {
			for(var i in search)
				if(search[i].length != 0) return false;

			return true;
		};


		/**
		 * Sets keys, auto search & auto focus for search input
		 * @method init
		 */
		$scope.init = function(){

			// Add 'esc' key handling to quit search
			window.onkeyup = function(e) {
				if(e.keyCode == 27) {
					$rootScope.back();
				}
			}

			// Autosearch if something is found in the current route
			if($routeParams.query !== undefined) {
				$scope.query = $routeParams.query;
				$scope.search($scope.query);
			}

			// Autofocus search input
			$('#search').find('input[type="text"]').focus();

		};


		// Init search
		$scope.init();

	});
