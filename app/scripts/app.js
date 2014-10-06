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
	.constant("SERVER", {
		dev : { url: "localhost:8000" },
		prod : { url : "api.oddly.fr" }
	})
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

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

		if(window.history && window.history.pushState)
			$locationProvider.html5Mode(true);
	}])
