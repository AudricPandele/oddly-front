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
			$(".ui-progress-button").removeClass("error").removeClass("success");

			if($scope.subscribeForm.$valid){

				$(".progress").width((50 + Math.random() * 30) + "%")

				$http({
					method : "POST",
					url: "http://"+ SERVER.prod.url +"/beta/account/",
					data : user
				})
				.success(function(data,status,headers,config){
					$(".progress").width("101%");
					$(".ui-progress-button").addClass("success");

					return $scope.success = true;
				})
				.error(function(e,status,detail,request){
					$(".progress").width("101%");
					$(".ui-progress-button").addClass("error");

					console.error(status);
					console.error(request); // Request debug
				});
			}
		}

	});
