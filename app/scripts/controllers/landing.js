'use strict';

angular
	.module('oddlyFrontApp')
	.controller('LandingCtrl', function ($scope, $http, SERVER) {

		/**
		 * List of messages
		 */
		$scope.messages = {
			success : "Inscription réussie",
			error : "Une erreur est survenue",
			already_exist : "Cet email est déjà utilisé"
		};


		$scope.subscribe = function(user) {
			if($scope.subscribeForm.$valid){
				$http({
					method : "POST",
					url: "http://"+ SERVER.prod.url +"/beta/account/",
					data : user
				})
				.success(function(data,status,headers,config){
					console.log(data);
					return $scope.success = true;
				})
				.error(function(e,status,detail,request){
					console.error(status);
					console.error(request); // Request debug
				});
			}
		}

	});
