'use strict';

angular
	.module('oddlyFrontApp')
	.controller('StaticPageCtrl', function ($scope, $http, $location, $translate, SERVER) {

		//Check current route for active links
		$scope.activeRoute = function(rt){
			return rt === $location.path();
		};


		//Change lang
		$scope.setLocale = function(name, code, locale){
			$translate.use(locale);
			$scope.selected = { name: name, code: code };
		};

	});
