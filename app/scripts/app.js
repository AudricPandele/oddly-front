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
			.useStaticFilesLoader({
				prefix: '/languages/',
				suffix: '.json'
			})
			.preferredLanguage('fr_FR')
			.fallbackLanguage('fr_FR');


		//Load routes
		$routeProvider

			//Landing
			.when('/', { templateUrl: '/views/landing.html', controller: 'LandingCtrl' })
			.when('/discover', { templateUrl: '/views/discover.html', controller: 'DiscoverCtrl' })
			.when('/signin', { templateUrl: '/views/signin.html', controller: 'SignInCtrl' })

			//Static pages
			.when('/about', { templateUrl: '/views/about.html', controller: 'StaticPageCtrl' })

			//App
			.when('/app', { templateUrl: '/views/app_fresh.html', controller: 'GeneralAppCtrl', checkator: true })
			.when('/app/item/:id', { templateUrl: '/views/app_item.html', controller: 'ItemCtrl', checkator: true })

			.otherwise({ redirectTo: '/' });

		if(window.history && window.history.pushState)
			$locationProvider.html5Mode(true);
	}])
	.run(function($cookieStore, $translate){

		//Try to set locale from cookie
		$translate.use($cookieStore.get("locale"));

	})
