'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Fresh items from every types
	 * @controller FreshCtrl
	 * @param $scope - Controller scope
	 * @param $http - Http request handler
	 * @param $location - Route manager
	 * @param $translate - Translation manager
	 * @param SERVER - Server constant
	 */
	.controller('FreshCtrl', function ($scope, $http, $location, $translate, SERVER) {


		/**
		 * Pass SERVER constant to view for images path
		 * @attribute SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Init home advertisement
		 * @attribute advert
		 */
		$scope.advert = {};


		/**
		 * Init items lists
		 * @attribute items
		 */
		$scope.items = {
			books:[],
			comics:[],
			magazines:[],
			newspapers:[]
		};


		/**
		 * Check current route for active links
		 * @todo Move it to rootScope
		 * @method activeRoute
		 * @param rt - Route you want to check
		 * @return true if rt is the current route, false otherwise
		 */
		$scope.activeRoute = function(rt){
			return rt === $location.path();
		};


		/**
		 * Change current language
		 * @todo Move it to rootScope
		 * @method setLocale
		 * @param name - Language name
		 * @param code - Language ISO code (ex: French = fr_FR)
		 * @param locale - Can't remember what is that shit
		 */
		$scope.setLocale = function(name, code, locale){
			$translate.use(locale);
			$scope.selected = { name: name, code: code };
		};


		/**
		 * Get home advert
		 * @static
		 */
		$http({
			method: "GET",
			url: "/dummy/fresh/home_ad.json"
		})
		.success(function(data){
			$scope.advert = data.advert;
		});


		/**
		 * Get newest items from each type
		 * @static
		 * @protected
		 */
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/items/fresh",
			//url: "/dummy/fresh/items.json", // DUMMY
			checkator: true
		})
		.success(function(data){
			$scope.items = data.items;
		});

	})


	/**
	 * Fresh items for every wanted categories in a given type
	 * @controller FreshTypeCtrl
	 * @param $scope - Controller scope
	 * @param $http - Http request handler
	 * @param $location - Route manager
	 * @param $translate - Translations manager
	 * @param SERVER - Server constant
	 * @param $routeParams - Route parameters manager
	 */
	.controller('FreshTypeCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams) {


		/**
		 * Get item UCFirst type
		 * @attribute type
		 */
		$scope.type = $routeParams.type.charAt(0).toUpperCase() + $routeParams.type.slice(1);


		/**
		 * Pass SERVER constant to view for image paths
		 * @attribute SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Item types with constant values
		 * @attributes types
		 */
		$scope.types = {
			"books" : 0,
			"comics" : 1,
			"magazines" : 2,
			"newspapers" : 3
		};


		/**
		 * Get newest items for the given type
		 * @static
		 * @protected
		 */
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/items/fresh/"+$scope.types[$routeParams.type],
			checkator: true
		})
		.success(function(data){
			$scope.items = data.items;
		});

	})
