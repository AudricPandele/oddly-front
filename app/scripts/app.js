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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).constant("SERVER", {
	"dev" : {
		"url": "localhost:8000",
	},
	"prod" : {
		"url" : "api.oddly.fr",
	}
});
