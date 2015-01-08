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
		'ngFullHeight',
		'angularSmoothscroll',
		'FBAngular'
	])
	.constant("SERVER", {
		METHOD: "http://",
		API: "api.oddly.fr/api/v1",
		CDN: "cdn.oddly.fr"
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
			//.when('/', { templateUrl: '/views/landing.html', controller: 'LandingCtrl' })
			.when('/', { templateUrl: '/views/discover.html', controller: 'DiscoverCtrl' })
			.when('/signin', { templateUrl: '/views/signin.html', controller: 'SignInCtrl' })

			//Static pages
			.when('/about', { templateUrl: '/views/about.html', controller: 'StaticPageCtrl' })

			//App
			.when('/app', { templateUrl: '/views/app_fresh.html', controller: 'GeneralAppCtrl', checkator: true })
			.when('/app/fresh/:type', { templateUrl: '/views/app_fresh_type.html', controller: 'FreshTypeCtrl', checkator: true })
			.when('/app/item/:id', { templateUrl: '/views/app_item.html', controller: 'ItemCtrl', checkator: true })
			.when('/app/read/:id', { templateUrl: '/views/app_player.html', controller: 'PlayerCtrl', checkator: true })

			.otherwise({ redirectTo: '/' });

		if(window.history && window.history.pushState)
			$locationProvider.html5Mode(true);
	}])
	.run(function($cookieStore, $translate, $rootScope, $http, SERVER){

		//Try to set locale from cookie
		$translate.use($cookieStore.get("locale"));

		//Register appconfig to rootscope
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/settings",
			checkator: true,
		})
		.success(function(data){
			$rootScope.settings = data.settings;
		})
	})
