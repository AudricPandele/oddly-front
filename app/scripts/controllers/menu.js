'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Main menu controller
	 *
	 * @controller MenuCtrl
	 * @param {Object} $scope - Current scope
	 * @param {Object} $routeParams - Route parameters
	 * @param {Object} SERVER - App server constant
	 * @param {Object} $http - HTTP manager
	 */
	.controller('MenuCtrl', function($scope, $routeParams, SERVER, $http){


		/**
		 * Inject route params to view to set some menu items to "active" state
		 * @attribute {Object} routeParams
		 */
		$scope.routeParams = $routeParams;


		/**
		 * Also inject server to view for images purposes
		 * @attribute {Object} SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Get the last item you read to show you a shortcut into the menu
		 * A pretty cool feature tho.
		 * @method getLastReadItem
		 */
		$scope.getLastReadItem = function(){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/bookshelf/last",
				checkator: true
			})
			.success(function(data){
				$scope.item = data.item;
			})
		};


		// Get last item
		$scope.getLastReadItem();
	})
