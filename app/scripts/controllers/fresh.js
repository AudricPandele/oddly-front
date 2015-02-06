'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Fresh items from every types
	 *
	 * @controller FreshCtrl
	 * @param {Object} $scope - Controller scope
	 * @param {Object} $http - Http request handler
	 * @param {Object} $location - Route manager
	 * @param {Object} $translate - Translation manager
	 * @param {Object} SERVER - Server constant
	 */
	.controller('FreshCtrl', function ($scope, $http, $location, $translate, SERVER) {


		/**
		 * Pass SERVER constant to view for images path
		 * @attribute {Object} SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Init home advertisement
		 * @attribute {Object} advert
		 */
		$scope.advert = {};


		/**
		 * Init items lists
		 * @attribute {Object<Array>} items
		 */
		$scope.items = {
			books:[],
			comics:[],
			magazines:[],
			newspapers:[]
		};


		/**
		 * Check current route for active links
		 *
		 * @deprecated
		 * @method activeRoute
		 * @param {String} rt - Route you want to check
		 * @return {boolean} - true if rt is the current route, false otherwise
		 */
		$scope.activeRoute = function(rt){
			throw new Error("This method is deprecated. Please refer to $rootScope.getCurrentRoute() function");
			return rt === $location.path();
		};


		/**
		 * Change current language
		 *
		 * @todo Move it to rootScope
		 * @method setLocale
		 * @param {String} name - Language name
		 * @param {String} code - Language ISO code (ex: French = fr_FR)
		 * @param {String} locale - Can't remember what is that shit
		 */
		$scope.setLocale = function(name, code, locale){
			$translate.use(locale);
			$scope.selected = { name: name, code: code };
		};


		/**
		 * Get home advert
		 * @method getHomeAdvert
		 */
		$scope.getHomeAdvert = function(){
			$http({
				method: "GET",
				url: "/dummy/fresh/home_ad.json"
			})
			.success(function(data){
				$scope.advert = data.advert;
			});
		};


		/**
		 * Get newest items from each type
		 * @method getFreshItems
		 */
		$scope.getFreshItems = function(){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/items/fresh",
				checkator: true
			})
			.success(function(data){
				$scope.items = data.items;
			});
		};


		// Get content
		$scope.getHomeAdvert();
		$scope.getFreshItems();

	})


	/**
	 * Fresh items for every wanted categories in a given type
	 *
	 * @controller FreshTypeCtrl
	 * @param {Object} $scope - Controller scope
	 * @param {Object} $http - Http request handler
	 * @param {Object} $location - Route manager
	 * @param {Object} $translate - Translations manager
	 * @param {Object} SERVER - Server constant
	 * @param {Object} $routeParams - Route parameters manager
	 */
	.controller('FreshTypeCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams) {


		/**
		 * Get item UCFirst type
		 * @attribute {String} type
		 */
		$scope.type = $routeParams.type.charAt(0).toUpperCase() + $routeParams.type.slice(1);


		/**
		 * Pass SERVER constant to view for image paths
		 * @attribute {Object} SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Item types with constant values
		 * @attributes {Object<int>} types
		 */
		$scope.types = {
			"books" : 0,
			"comics" : 1,
			"magazines" : 2,
			"newspapers" : 3
		};


		/**
		 * Get newest items for the given type
		 * @method getFreshItemsFromType
		 * @param {String} type - 0 = books, ...
		 */
		$scope.getFreshItemsFromType = function(type){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/items/fresh/" + type,
				checkator: true
			})
			.success(function(data){
				$scope.items = data.items;
			});
		};


		// Get content
		$scope.getFreshItemsFromType($scope.types[$routeParams.type]);

	})
