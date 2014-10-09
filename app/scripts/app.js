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
		'routeStyles',
		'pascalprecht.translate'
	])
	.constant("SERVER", {
		dev : { url: "localhost:8000" },
		prod : { url : "api.oddly.fr" }
	})
	.config(['$routeProvider', '$locationProvider','$translateProvider', function($routeProvider, $locationProvider, $translateProvider) {

		//Load translations
		$translateProvider.determinePreferredLanguage();
		$translateProvider.useStaticFilesLoader({
			prefix: '/languages/',
			suffix: '.json'
		});


		//Load routes
		$routeProvider

			.when('/', {
				templateUrl: 'views/landing.html',
				controller: 'LandingCtrl',
				css: "styles/css/_landing.css"
			})

			.when('/discover', {
				templateUrl: 'view/discover.html',
				controller: 'DiscoverCtrl',
				css: "styles/css/_discover.css"
			})

			.otherwise({
				redirectTo: '/'
			});

		if(window.history && window.history.pushState)
			$locationProvider.html5Mode(true);
	}])
