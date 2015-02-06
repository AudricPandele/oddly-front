'use strict';

/**
 * Main app module
 *
 * @ngdoc overview
 * @name oddlyFrontApp
 * @description
 * # oddlyFrontApp
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


	/**
	 * App global config
	 * You can set here everything related to translations, routes, ...
	 *
	 * @param {Object} $routeProvider
	 * @param {Object} $locationProvider
	 * @param {Object} $translateProvider
	 */
	.config(function($routeProvider, $locationProvider, $translateProvider) {

		// Load translations
		$translateProvider
			.useStaticFilesLoader({
				prefix: '/languages/',
				suffix: '.json'
			})
			.preferredLanguage('fr_FR')
			.fallbackLanguage('fr_FR');


		// Load routes
		$routeProvider

			// Landing
			.when('/', { templateUrl: '/views/discover.html', controller: 'DiscoverCtrl' })
			.when('/signin', { templateUrl: '/views/signin.html', controller: 'SignInCtrl' })

			// Static pages
			.when('/about', { templateUrl: '/views/about.html', controller: 'StaticPageCtrl' })
			.when('/about/legal', { templateUrl: '/views/legal.html', controller: 'StaticPageCtrl' })

			// App
			.when('/app', { templateUrl: '/views/app_fresh.html', controller: 'FreshCtrl', checkator: true })

			// Search
			.when('/app/search', { templateUrl: '/views/app_search.html', controller: 'SearchCtrl', checkator: true })
			.when('/app/search/:query', { templateUrl: '/views/app_search.html', controller: 'SearchCtrl', checkator: true })

			// General topics
			.when('/app/fresh/:type', { templateUrl: '/views/app_fresh_type.html', controller: 'FreshTypeCtrl', checkator: true })
			.when('/app/tops', { templateUrl: '/views/app_tops.html', controller: 'TopsCtrl', checkator: true })

			// Single views
			.when('/app/item/:id', { templateUrl: '/views/app_item.html', controller: 'ItemCtrl', checkator: true })
			.when('/app/artist/:id', { templateUrl: '/views/app_artist.html', controller: 'ArtistCtrl', checkator: true })
			.when('/app/read/:id', { templateUrl: '/views/app_player.html', controller: 'PlayerCtrl', checkator: true })

			// Bookshelf
			.when('/app/bookshelf/pending', { templateUrl: '/views/app_bookshelf_pending.html', controller: 'BookshelfPendingCtrl', checkator: true })
			.when('/app/bookshelf/artists', { templateUrl: '/views/app_bookshelf_artists.html', controller: 'BookshelfArtistsCtrl', checkator: true })
			.when('/app/bookshelf/:type', { templateUrl: '/views/app_bookshelf_type.html', controller: 'BookshelfTypeCtrl', checkator: true })

			// Settings
			.when('/app/settings', { templateUrl: '/views/app_settings.html', controller: 'SettingsCtrl', checkator: true })

			.otherwise({ redirectTo: '/' });

		// Set html5mode to true if you want to get rid of the #
		if(window.history && window.history.pushState)
			$locationProvider.html5Mode(true);
	})


	/**
	 * App main run function
	 * Use it to call things on app startup
	 *
	 * @param {Object} $cookieStore
	 * @param {Object} $translate
	 * @param {Object} $rootScope
	 * @param {Object} $location
	 * @param {Object} $route
	 */
	.run(function($cookieStore, $translate, $rootScope, $location, $route){


		//Try to set locale from cookie
		$translate.use($cookieStore.get("locale"));


		//Init history for... history purpose
		var history = [];


		//Push current path to history
		$rootScope.$on('$routeChangeSuccess', function() {
			history.push($location.$$path);
		});


		/**
		 * Navigates into your history
		 *
		 * @method back
		 */
		$rootScope.back = function () {
			var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/app";
			$location.path(prevUrl);
		};


		/**
		 * Get the original path of your current route
		 * e.g. If your route is /item/ERGE4T245Y45EYETGEG, getCurrentRoute
		 * returns true if your route is like /item/:id
		 *
		 * @method getCurrentRoute
		 * @param {String} route - The route you want to check
		 * @return {boolean} - true if they are equals, false otherwise
		 */
		$rootScope.getCurrentRoute = function(route){
			return route == $route.current.$$route.originalPath;
		};


		/**
		 * Get a cookie from the cookieStore anywhere you want, even views,
		 * avoiding injections of $cookieStore in every controllers & scopes.
		 * For security purposes, we only access cookieStore on "read-only"
		 * mode in rootScope.
		 *
		 * @method getCookie
		 * @param {String} key - Name of the cookie you want to get
		 * @return {Object} - Anything stored into your cookie
		 */
		$rootScope.getCookie = function(key){
			return $cookieStore.get(key);
		};

	})
