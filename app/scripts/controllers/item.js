'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Single item controller
	 *
	 * @controller ItemCtrl
	 * @param {Object} $scope - Controller scope
	 * @param {Object} $http - Http request handler
	 * @param {Object} $location - Route manager
	 * @param {Object} $translate - Translation manager
	 * @param {Object} SERVER - Server constant
	 * @param {Object} $routeParams - Route parameters object
	 */
	.controller('ItemCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams) {

		/**
		 * Init item default model
		 * @attribute {Object} item
		 */
		$scope.item = { };


		/**
		 * Add SERVER constant to current scope
		 * @attribute {Object} SERVER
		 */
		$scope.SERVER = SERVER;


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
		 * Get asked item
		 *
		 * @method getItemInfos
		 * @param {String} item_id - Your Item ID
		 */
		$scope.getItemInfos = function(item_id){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/item/" + item_id,
				checkator: true,
			})
			.success(function(data){
				$scope.item = data.item;
				$scope.addedToReadLater = data.item.to_read == "true";
				$scope.addedToBookshelf = data.item.in_bookshelf == "true";
			})
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


		// Get content
		$scope.getItemInfos($routeParams.id);
	})


	/**
	 * The whole Book Player. Just the main function of Oddly. Nothing special.
	 *
	 * @controller PlayerCtrl
	 * @param {Object} $scope - Current scope
	 * @param {Object} $http - HTTP manager
	 * @param {Object} $location - Route manager
	 * @param {Object} $translate - Translation manager
	 * @param {Object} SERVER - App server constant
	 * @param {Object} $routeParams - Route parameters
	 * @param {Object} Fullscreen - Fullscreen manager
	 */
	.controller('PlayerCtrl', function($scope, $http, $location, $translate, $interval, SERVER, $routeParams, Fullscreen, $lazyloading){


		/**
		 * Save the last time we saved our position in the current book
		 * @attribute {Date} previousSave
		 */
		$scope.previousSave = new Date();


		/**
		 * Save the current page
		 * @attribute {int} currentPage
		 */
		$scope.currentPage = 1;


		/**
		 * By default, set the previousPage to null
		 * @attribute {Image} previousPage
		 */
		$scope.previousPage = null;


		/**
		 * Init item model
		 * @attribute {Object} item
		 */
		$scope.item = {};


		/**
		 * Check fullscreen state, from time to time, when the grass is green
		 * and your mom is my queen.
		 * Wait... what ?
		 * @attribute {boolean} is_fullscreen
		 */
		$scope.is_fullscreen = false;


		/**
		 * By default, page selected is the current page
		 * @attribute {int} pageSelected
		 */
		$scope.pageSelected = $scope.currentPage;

		/**
		 * @todo
		 */
		$scope.choosingPage = false;


		/**
		 * Register input events to global scope
		 * @method setInputActions
		 */
		$scope.setInputActions = function(){

			// Add keyboard events
			window.onkeyup = function(e) {
				if(e.keyCode == 37) return $scope.getPage($scope.currentPage - 1);
				else if(e.keyCode == 39) return $scope.getPage($scope.currentPage + 1);
				else return false;
			};

			// Avoid mouse events
			window.oncontextmenu = function(){
				return false;
			};

		};


		/**
		 * As it says, get book infos, lol.
		 * @method getItemInfos
		 * @param {String} item_id - Your item ID
		 */
		$scope.getItemInfos = function(item_id){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/item/" + item_id,
				checkator: true,
			})
			.success(function(data){
				$scope.item = data.item;
				$scope.total_pages = data.item.total_pages;
				$scope.haveRead(item_id);
			})
		};


		/**
		 * Check if you already read that book
		 * If you did, we open the book exactly where you stop. Isn't it super ?
		 * @method haveRead
		 * @param {String} item_id - Your item ID
		 */
		$scope.haveRead = function(item_id){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/user/haveread/" + item_id,
				checkator: true,
			})
			.success(function(data){
				if(data.item) {
					$scope.currentPage = parseInt(data.current_page);
					$scope.pageSelected = $scope.currentPage;
				}

				$lazyloading.init($routeParams.id, $scope.total_pages, $scope.currentPage, "SD");
				$scope.getPage($scope.currentPage);
			})
		};


		/**
		 * @todo
		 */
		$scope.getPageByRange = function(page) {
			$scope.choosingPage = true;
		}

		/**
		 * @todo
		 */
		function getPageByRange() {
			$interval(function(){
				if($scope.choosingPage) {
					$scope.choosingPage = false;
					$scope.getPage($scope.pageSelected);
				}
			}, 1000);
		}


		/**
		 * Get a book page using API & lazy-loading plugin made by Nicolas
		 * @method getPage
		 * @param {int} page - The wanted page
		 */
		$scope.getPage = function(page){

			var tmp = new Date();
			var diff = tmp.getTime() - $scope.previousSave.getTime();

			// We save reader's current page every 5 seconds of interractions
			if(diff >= 5000){
				$scope.savePage($scope.item._id, $scope.currentPage);
				$scope.previousSave = new Date();
			}

			var canvas = document.getElementById("player-render");
			var ctx = canvas.getContext("2d");

			// If user quality setting = SD
			$scope.previousPage = $lazyloading.stream(page);

			// On page load, we draw it to a canvas to avoid image save
			$scope.previousPage.onload = function() {
				canvas.width = this.width;
				canvas.height = this.height * (this.width / canvas.width);
				ctx.drawImage(this, 0, 0);

				$scope.currentPage = page;

				// Browser polyfill when window height is not auto. updated
				$(window).trigger('resize');
				$('.app-player').scrollTop(0);
			};

		};


		/**
		 * Tell the API to save the current book at a given page
		 * @method savePage
		 * @param {String} item_id - Your item ID
		 * @param {int} page - The page you want to put a bookmark
		 */
		$scope.savePage = function(item_id, page){
			$http({
				method: "POST",
				url: SERVER.METHOD + SERVER.API + "/user/read/" + item_id + "/" + page,
				checkator: true,
			})
		};


		/**
		 * Toggle fullscreen mode
		 * @method fullscreen
		 */
		$scope.fullscreen = function(){
			Fullscreen.toggleAll();
			$scope.is_fullscreen = (Fullscreen.isEnabled()) ? true : false;
		};


		// Read the book !
		$scope.getItemInfos($routeParams.id);

	})
