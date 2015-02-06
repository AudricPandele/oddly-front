'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Register & login controller
	 * @controller SignInCtrl
	 * @param {Object} $scope
	 * @param {Object} $http
	 * @param {Object} $translate
	 * @param {Object} $cookieStore
	 * @param {Object} $location
	 * @param {Object} SERVER
	 */
	.controller('SignInCtrl', function ($scope, $http, $translate, $cookieStore, $location, SERVER) {

		/**
		 * Register to Oddly
		 * @method register
		 * @param {Object} reg - register form data
		 */
		$scope.register = function(reg){
			if($scope.registerForm.$valid) {
				$http({
					method : "POST",
					url: SERVER.METHOD + SERVER.API + "/register",
					data : reg
				})
				.success(function(data){
					$cookieStore.put('sid',data.sid);
					$cookieStore.put('username', data.username);
					$cookieStore.put('user', data.name + " " + data.lastname);
					$location.path("/app");
				})
				.error(function(e){
					$scope.register_error = e.error;
				});
			}
			else
				$scope.registerForm.submitted = true;
		};


		/**
		 * Login to Oddly
		 * @method login
		 * @param {Object} user - login form data
		 */
		$scope.login = function(user){
			$http({
				method: "POST",
				url: SERVER.METHOD + SERVER.API + "/login",
				data : user,
				headers : {
					"Authentication" : "BasicAuth "+btoa(user.password + ':' + user.username),
					"Content-type" : "application/json"
				}
			})
			.success(function(data){
				$cookieStore.put('sid',data.sid);
				$cookieStore.put('username', data.username);
				$cookieStore.put('user', data.name + " " + data.lastname);
				$location.path("/app");
			})
			.error(function(e,status,header,detail){
				$scope.login_error = e.error;
			});
		};

	});
