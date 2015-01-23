'use strict';

angular
	.module('oddlyFrontApp')

	.controller('MenuCtrl', function($scope, $routeParams) {
		$scope.routeParams = $routeParams;
	})
