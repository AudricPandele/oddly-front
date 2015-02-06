'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * General page controller
	 *
	 * @controller StaticPageCtrl
	 * @param {Object} $scope
	 * @param {Object} $http
	 * @param {Object} $location
	 * @param {Object} $translate
	 * @param {Object} $cookieStore
	 * @param {Object} SERVER
	 */
	.controller('StaticPageCtrl', function ($scope, $http, $location, $translate, $cookieStore, SERVER) {


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
		 * @method setLocale
		 * @param {String} name - ex. "French"
		 * @param {String} code - ex. "fr_FR"
		 * @param {String} locale - ex. "fr"
		 */
		$scope.setLocale = function(name, code, locale){

			// Save current chosen locale to cookieStore
			$cookieStore.put("locale", locale);

			// Set chosen locale for default locale
			$translate.use(locale);

			// Update scope with chosen locale to switch flags
			$scope.selected = { name: name, code: code };

		};


	});
