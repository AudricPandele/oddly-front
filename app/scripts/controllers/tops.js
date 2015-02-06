'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Top items from every types
	 *
	 * @controller FreshCtrl
	 * @param {Object} $scope - Controller scope
	 * @param {Object} $http - Http request handler
	 * @param {Object} $location - Route manager
	 * @param {Object} $translate - Translation manager
	 * @param {Object} SERVER - Server constant
	 */
	.controller('TopsCtrl', function ($scope, $http, $location, $translate, SERVER) {


		/**
		 * Whether you already added a book to your pending list
		 * @attribute {boolean} addedToReadLater
		 */
		$scope.addedToReadLater = false;


		/**
		 * Whether you already added a book to your bookshelf
		 * @attribute {boolean} addedToBookshelf
		 */
		$scope.addedToBookshelf = false;


		/**
		 * Pass SERVER constant to view for images
		 * @attribute {Object} SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Init items lists
		 * @attribute {Object<Array>} items
		 */
		$scope.items = {
			books:[],
			comics:[],
			magazines:[],
			newspapers:[]
		};


		/**
		 * Add an item to your pending list
		 *
		 * @method readLater
		 * @param {String} item_id - Your item ID
		 * @return {boolean} - false if the book is already in your bookshelf
		 */
		$scope.readlater = function(id){
			if($scope.addedToReadLater == true) return false;

			$http({
				method: "POST",
				url: SERVER.METHOD + SERVER.API + "/user/readlater/" + item_id,
				checkator: true,
			})
			.success(function(data){
				$scope.addedToReadLater = true;
			})
		};


		/**
		 * Save an item to your bookshelf. Pretty useful tho.
		 *
		 * @method save
		 * @param {String} item_id - Your item ID
		 */
		$scope.save = function(item_id){
			$http({
				method: "POST",
				url: SERVER.METHOD + SERVER.API + "/user/save/" + item_id,
				checkator: true,
			})
			.success(function(data){
				$scope.addedToBookshelf = data.in_bookshelf == "true";
			})
		};


		/**
		 * Get newest items from each type
		 * @method getTopItems
		 */
		$scope.getTopItems = function(){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/items/tops",
				checkator: true
			})
			.success(function(data){
				$scope.items = data.items;
				$scope.highlighted = data.highlighted;
			});
		};


		// Get content
		$scope.getTopItems();

	})
