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
		'oddlyLoginCheck',
		'oddlyLazyLoading',
		'oddlyAppConstants',
		'oddlyAppFilters',
		'oddlyFlatFlags',
		'oddlyFullHeight',
		'angularSmoothscroll',
		'FBAngular'
	])


	.config(function($routeProvider, $locationProvider, $translateProvider) {

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
			.when('/app', { templateUrl: '/views/app_fresh.html', controller: 'FreshCtrl', checkator: true })
			.when('/app/search', { templateUrl: '/views/app_search.html', controller: 'SearchCtrl', checkator: true })
			.when('/app/search/:query', { templateUrl: '/views/app_search.html', controller: 'SearchCtrl', checkator: true })
			.when('/app/fresh/:type', { templateUrl: '/views/app_fresh_type.html', controller: 'FreshTypeCtrl', checkator: true })
			.when('/app/item/:id', { templateUrl: '/views/app_item.html', controller: 'ItemCtrl', checkator: true })
			.when('/app/artist/:id', { templateUrl: '/views/app_artist.html', controller: 'ArtistCtrl', checkator: true })
			.when('/app/read/:id', { templateUrl: '/views/app_player.html', controller: 'PlayerCtrl', checkator: true })
			.when('/app/bookshelf/pending', { templateUrl: '/views/app_bookshelf_pending.html', controller: 'PendingCtrl', checkator: true })
			.when('/app/settings', { templateUrl: '/views/app_settings.html', controller: 'SettingsCtrl', checkator: true })

			.otherwise({ redirectTo: '/' });

		if(window.history && window.history.pushState)
			$locationProvider.html5Mode(true);
	})


	.run(function($cookieStore, $translate, $rootScope, $location){

		//Try to set locale from cookie
		$translate.use($cookieStore.get("locale"));

		//Init history for back purpose
		var history = [];

		//Push current path to history
		$rootScope.$on('$routeChangeSuccess', function() {
			history.push($location.$$path);
		});

		//Add back function to go back in history, yihhhhhaaaaaaa !
		$rootScope.back = function () {
			var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/app";
			$location.path(prevUrl);
		};

	})
