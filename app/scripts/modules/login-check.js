'use strict';

/**
 * Created by Udo Stephant on 11/10/2014
 * http://www.ugostephant.io / contact@ugostephant.io
 */

angular
	.module('loginCheck', ['ngRoute'])
	.factory("CookieCheckator", ["$cookieStore", "$location", function($cookieStore, $location){
		return function(config){

			if($cookieStore.get("sid", "username") && config && config.checkator){

				var authdata = btoa($cookieStore.get("sid")+":"+$cookieStore.get("username"));
				config.headers["Authentication"] = "CheckAuth "+authdata;
				config.headers["Content-type"] = "application/json";
			}

			if(!$cookieStore.get("sid", "username"))
				$location.path("/signin");

			if(config)
				return config;
		}
	}])
	.factory("HttpInterceptor", ["$q", "CookieCheckator", function($q, CookieCheckator){
		return {
			request: function (config) {
				return CookieCheckator(config) || config || $q.when(config);
			},

			requestError: function(rejection) { return $q.reject(rejection); },
			response: function(response){ return response || $q.when(response); },
			responseError: function(rejection){ return $q.reject(rejection); }
		}
	}])
	.config(function($httpProvider){

		//Add check on http request
		$httpProvider.interceptors.push('HttpInterceptor');

	})
	.run(["$rootScope", "CookieCheckator", function($rootScope, CookieCheckator){

		//Add check on route change
		$rootScope.$on('$routeChangeStart', function (e, next, current) {
			if(next && next.$$route && next.$$route.checkator)
				CookieCheckator();
		});

	}]);
