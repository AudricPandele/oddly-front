"use strict";

angular
	.module("oddlyLoginCheck", [
		"ngRoute"
	])


	/**
	 * CookieCheckator, the savior of our protected content !
	 * Checks your cookies for the right one & adds needed headers to your http requests, what a hero !
	 * @factory CookieCheckator
	 * @param {Object} $cookieStore - Cookie manager
	 * @param {Object} $location - Route manager
	 */
	.factory("CookieCheckator", function($cookieStore, $location){
		return function(options){

			if(options && !options.route && options.checkator && $cookieStore.get("sid", "username")){
				var authdata = btoa($cookieStore.get("sid")+":"+$cookieStore.get("username"));
				options.headers["Authentication"] = "CheckAuth "+authdata;
				options.headers["Content-type"] = "application/json";
			}

			if(options && options.checkator && !$cookieStore.get("sid", "username"))
				$location.path("/signin");

			return options;
		}
	})


	/**
	 * Even better than CookieCheckator, hail to the great HttpInterceptor !!!
	 * He watches every moves thou do wiz thy feetz, and call CookieCheckator
	 * if you're doing something wrong... what a jerk, ain't he ?
	 * @factory HttpInterceptor
	 * @param {Object} $q - Query manager
	 * @param {SuperHero} CookieCheckator - Bet you already know his name...
	 * @param {Object} $location - Route manager
	 */
	.factory("HttpInterceptor", function($q, CookieCheckator, $location){
		return {
			request: function (config) {
				return CookieCheckator(config) || config || $q.when(config);
			},

			requestError: function(rejection) { return $q.reject(rejection); },
			response: function(response){ return response || $q.when(response); },

			responseError: function(rejection){
				if(rejection.status == 401 || rejection.statusText == "UNAUTHORIZED")
					$location.path("/signin");

					return $q.reject(rejection);
			}
		}
	})


	/**
	 * Attach HttpInterceptor to all HTTP requests
	 * I'M PITTYLESS !!! MOUAHAHAHAHA !!!
	 * @param {Object} $httpProvider - Http request provider
	 */
	.config(function($httpProvider){
		$httpProvider.interceptors.push('HttpInterceptor');
	})


	/**
	 * Attach CookieCheckator on every route change
	 * Even more silly than http requests, lol
	 * @param {Object} $rootScope - App root scope
	 * @param {Object} $location - Route manager
	 * @param {SuperHero} CookieCheckator - THE ONE AND ONLY
	 */
	.run(function($rootScope, $location, CookieCheckator){

		//Add check on route change
		$rootScope.$on('$routeChangeStart', function (e, next, current) {
			if(next && next.$$route && next.$$route.checkator){
				CookieCheckator({ route : true, checkator : true });
			}
		});

	})
