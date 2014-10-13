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
		'pascalprecht.translate',
		'loginCheck'
	])
	.constant("SERVER", {
		dev : { url: "localhost:8000" },
		prod : { url : "api.oddly.fr" }
	})
	.config(['$routeProvider', '$locationProvider','$translateProvider', function($routeProvider, $locationProvider, $translateProvider) {

		//Load translations
		$translateProvider.determinePreferredLanguage();
		$translateProvider.fallbackLanguage('fr_FR');
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
				templateUrl: 'views/discover.html',
				controller: 'DiscoverCtrl',
				css: "styles/css/_discover.css",
				protected: true
			})

			.when('/signin', {
				templateUrl: 'views/signin.html',
				controller: 'SignInCtrl',
				css: 'styles/css/_signin.css'
			})

			.otherwise({
				redirectTo: '/'
			});

		if(window.history && window.history.pushState)
			$locationProvider.html5Mode(true);
	}])
