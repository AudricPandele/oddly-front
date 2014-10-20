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
		'loginCheck',
		'ngFlatFlags'
	])
	.constant("SERVER", {
		dev : { url: "localhost:8000" },
		pre_prod : { url : "vps106520.ovh.net/~oddly-api"},
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

			//Landing
			.when('/', { 			templateUrl: 'views/landing.html', 	controller: 'LandingCtrl', 		css: "styles/css/_landing.css" })
			.when('/discover', { 	templateUrl: 'views/discover.html', controller: 'DiscoverCtrl', 	css: "styles/css/_discover.css" })
			.when('/signin', { 		templateUrl: 'views/signin.html', 	controller: 'SignInCtrl', 		css: 'styles/css/_signin.css' })

			//Static pages
			.when('/about', { 		templateUrl: 'views/about.html', 	controller: 'StaticPageCtrl', 	css: 'styles/css/_static.css' })

			.otherwise({ 			redirectTo: '/' });

		if(window.history && window.history.pushState)
			$locationProvider.html5Mode(true);
	}])
