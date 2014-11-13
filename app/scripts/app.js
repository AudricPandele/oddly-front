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
		'ngFlatFlags',
		'ngFullHeight'
	])
	.constant("SERVER", {
		dev : { url: "localhost:8000/api/v1" },
		pre_prod : { url : "api.oddly.ninja/api/v1"},
		prod : { url : "api.oddly.fr/api/v1" }
	})
	.config(['$routeProvider', '$locationProvider','$translateProvider', function($routeProvider, $locationProvider, $translateProvider) {

		//Load translations
		$translateProvider
			.registerAvailableLanguageKeys(['en_US', 'fr_FR'], {
				'en_us': 'en_US',
				'en-us': 'en_US',
				'en': 'en_US',

				'fr_fr': 'fr_FR',
				'fr-fr': 'fr_FR',
				'fr': 'fr_FR'
			})
			.useStaticFilesLoader({
				prefix: '/languages/',
				suffix: '.json'
			})
			.determinePreferredLanguage()
			/*.determinePreferredLanguage(function(){
				var nav = window.navigator;
				var locale = nav.language || nav.browserLanguage || nav.systemLanguage || nav.userLanguage;
				locale = locale.split("-");
				locale[1] = locale[1].toUpperCase();
				return locale.join("_");
			})*/
			.fallbackLanguage('fr_FR')

console.log(window.navigator);


		//Load routes
		$routeProvider

			//Landing
			.when('/', { 			templateUrl: '/views/landing.html', 	controller: 'LandingCtrl', 		css: "/styles/css/_landing.css" })
			.when('/discover', { 	templateUrl: '/views/discover.html', 	controller: 'DiscoverCtrl', 	css: "/styles/css/_discover.css" })
			.when('/signin', { 		templateUrl: '/views/signin.html', 		controller: 'SignInCtrl', 		css: '/styles/css/_signin.css' })

			//Static pages
			.when('/about', { 		templateUrl: '/views/about.html', 		controller: 'StaticPageCtrl', 	css: '/styles/css/_static.css' })

			//App
			.when('/app', {			templateUrl: '/views/app_fresh.html',	controller: 'GeneralAppCtrl',	css: '/styles/css/_app.css', checkator: true })
			.when('/app/item/:id',{ templateUrl: '/views/app_item.html',	controller: 'ItemCtrl',			css: '/styles/css/_app.css', checkator: true })

			.otherwise({ 			redirectTo: '/' });

		if(window.history && window.history.pushState)
			$locationProvider.html5Mode(true);
	}])
