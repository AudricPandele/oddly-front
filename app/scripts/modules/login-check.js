'use strict';

/**
 * Created by Udo Stephant on 11/10/2014
 * http://www.ugostephant.io / contact@ugostephant.io
 */

angular
	.module('loginCheck', ['ngRoute'])
	.factory("CookieCheckator", ["$cookieStore", "$location", function($cookieStore, $location){
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
	.run(["$rootScope", "$location", "CookieCheckator", function($rootScope, $location, CookieCheckator){

		//Init history for back purpose
		var history = [];


		//Add check on route change
		$rootScope.$on('$routeChangeStart', function (e, next, current) {
			if(next && next.$$route && next.$$route.checkator){
				CookieCheckator({ route : true, checkator : true });
			}
		});

		//Push current path to history
		$rootScope.$on('$routeChangeSuccess', function() {
			history.push($location.$$path);
		});


		//Add back function to go back in history, yihhhhhaaaaaaa !
		$rootScope.back = function () {
			var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/app";
			$location.path(prevUrl);
		};

	}]);
