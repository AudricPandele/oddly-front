'use strict';

/**
 * @ngdoc overview
 * @name oddlyFrontApp
 * @description
 * # oddlyFrontApp
 *
 * Main module of the application.
 */
angular
	.module('oddlyFrontApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'routeStyles'
	])
	.config(['$routeProvider', function($routeProvider) {

		$routeProvider

			/*.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})*/

			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl'
			})

			.when('/', {
				templateUrl: 'views/landing.html',
				controller: 'LandingCtrl',
				css: "styles/css/_landing.css"
			})

			.otherwise({
				redirectTo: '/'
			});
	}])
