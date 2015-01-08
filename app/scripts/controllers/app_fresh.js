'use strict';

angular
	.module('oddlyFrontApp')

	//General app controller
	.controller('FreshTypeCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams, $rootScope) {
		$scope.type = $routeParams.type.charAt(0).toUpperCase() + $routeParams.type.slice(1);

		
	})
