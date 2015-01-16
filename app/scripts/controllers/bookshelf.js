'use strict';

angular
	.module('oddlyFrontApp')

	.controller("PendingCtrl", function($scope, $http, SERVER){
		$scope.SERVER = SERVER;
		$scope.items = [];

		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/user/toread", // PROD
			//url: "/dummy/toread.json", // DUMMY
			checkator: true,
		})
		.success(function(data){
			$scope.items = data.to_read;
			console.log(data.to_read)
		})
		.error(function(e){

		})
	})
