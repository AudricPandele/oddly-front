'use strict';

angular
	.module('oddlyFrontApp')
	.controller('LandingCtrl', function ($scope, $http, $translate, SERVER) {

		$scope.subscribe = function(user) {
			$(".ui-progress-button").removeClass("error").removeClass("success");

			if($scope.subscribeForm.$valid){

				$(".progress").width((50 + Math.random() * 30) + "%")

				$http({
					method : "POST",
					url: "http://"+ SERVER.API +"/beta/account/",
					data : user
				})
				.success(function(data,status,headers,config){
					$(".progress").width("101%");
					$(".ui-progress-button").addClass("success");
					$('input[type="email"]').val('');

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
