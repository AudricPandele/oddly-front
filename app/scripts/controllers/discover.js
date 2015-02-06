'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * The glorious Oddly Landing page
	 * scheduled to move over to oddly-hipster
	 *
	 * @controller DiscoverCtrl
	 * @param {Object} $scope
	 * @param {Object} $http
	 * @param {Object} $translate
	 * @param {Object} $cookieStore
	 * @param {Object} SERVER
	 */
	.controller('DiscoverCtrl', function ($scope, $http, $translate, $cookieStore, SERVER) {


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
