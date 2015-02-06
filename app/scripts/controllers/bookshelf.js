'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Represents the books you added to your bookshelf for future reading
	 *
	 * @controller BookshelfPendingCtrl
	 * @param {Object} $scope - Current scope
	 * @param {Object} $http - HTTP manager
	 * @param {Object} SERVER - App server constant
	 */
	.controller("BookshelfPendingCtrl", function($scope, $http, SERVER){


		/**
		 * Add SERVER constant to current scope to access it from the view
		 * @attribute {Object} SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Init items list
		 * @attribute {Array} items
		 */
		$scope.items = [];


		/**
		 * Get your pending books list
		 * @method getPendingBooks
		 */
		$scope.getPendingBooks = function(){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/bookshelf/pending",
				checkator: true,
			})
			.success(function(data){
				$scope.items = data.items;
			})
		};


		// Get content
		$scope.getPendingBooks();

	})


	/**
	 * Represents your bookshelf content, ordered by artists
	 *
	 * @controller BookshelfArtistsCtrl
	 * @param {Object} $scope - Current scope
	 * @param {Object} $http - HTTP manager
	 * @param {Object} SERVER - App server constant
	 */
	.controller("BookshelfArtistsCtrl", function($scope, $http, SERVER){


		/**
		 * Inject server constant to current scope to access it from the view
		 * @attribute {Object} SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Init artists list
		 * @attribute {Array} artists
		 */
		$scope.artists = [];


		/**
		 * Define artists default types
		 * @attribute {Array} types
		 */
		$scope.types = ["Writer","Drawer"];


		/**
		 * Get saved artists from your bookshelf
		 * Note : Don't really save an artist into your bookshelf at home.
		 * That's called harassment & is punishable by the law.
		 *
		 * @method getArtists
		 */
		$scope.getArtists = function(){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/bookshelf/artists",
				checkator: true,
			})
			.success(function(data){
				$scope.artists = data.artists;
			})
		};


		// Get content
		$scope.getArtists();
	})


	/**
	 * Organize your bookshelf from a given type
	 *
	 * @controller BookshelfTypeCtrl
	 * @param {Object} $scope
	 * @param {Object} $http
	 * @param {Object} SERVER
	 * @param {Object} $routeParams
	 */
	.controller("BookshelfTypeCtrl", function($scope, $http, SERVER, $routeParams){


		/**
		 * Add SERVER constant to current scope
		 * @attribute {Object} SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Init items list
		 * @attribute {Array} items
		 */
		$scope.items = [];


		/**
		 * Set default book types
		 * @attribute {Array} types
		 */
		$scope.types = ["books","comics","magazines","newspapers"];


		/**
		 * Sets the asked type as a title in view
		 * @attribute {String} type
		 */
		$scope.type = $routeParams.type.toUpperCase();


		/**
		 * Read the god damn name timmy !
		 *
		 * @method getBookshelfContent
		 * @param {String} type - 0 = books, 1 = comics, 2 = mag, 3 = newspapers
		 */
		$scope.getBookshelfContent = function(type){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/bookshelf/" + type + "/items",
				checkator: true,
			})
			.success(function(data){
				$scope.items = data.items;
			})
		};


		// Get content
		if($scope.types.indexOf($routeParams.type) != -1)
			$scope.getBookshelfContent($scope.types.indexOf($routeParams.type));
	})
