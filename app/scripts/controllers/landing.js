'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Landing page controller
	 * @controller LandingCtrl
	 * @param {Object} $scope - Current scope
	 * @param {Object} $http - HTTP manager
	 * @param {Object} $translate - Translation manager
	 * @param {Object} SERVER - App server constant
	 */
	.controller('LandingCtrl', function ($scope, $http, $translate, SERVER) {


		/**
		 * Subscribe a user to the beta test list
		 * @method subscribe
		 * @param {Object} user - User email
		 */
		$scope.subscribe = function(user) {
			$(".ui-progress-button").removeClass("error").removeClass("success");

			if($scope.subscribeForm.$valid){

				$(".progress").width((50 + Math.random() * 30) + "%")

				$http({
					method : "POST",
					url: SERVER.METHOD + SERVER.API + "/beta/account",
					data : user
				})
				.success(function(data,status,headers,config){
					$(".progress").width("101%");
					$(".ui-progress-button").addClass("success");
					$('input[type="email"]').val('');

					$scope.success = true;
				})
				.error(function(e,status,detail,request){
					$(".progress").width("101%");
					$(".ui-progress-button").addClass("error");
				});
			}
		};


	});
