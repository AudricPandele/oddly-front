'use strict';

angular
	.module('oddlyFrontApp')
	.controller('SignInCtrl', function ($scope, $http, $translate, $cookieStore, $location, SERVER) {

		/**
		 * @todo Faire ça plus propre
		 * avec vérif du model user
		 * et personnalisation message success / error
		 */
		$scope.register = function(reg){
			if($scope.registerForm.$valid) {
				$http({
					method : "POST",
					url: SERVER.METHOD + SERVER.API + "/register",
					data : reg
				})
				.success(function(data){
					console.log(data);
				})
				.error(function(e,status,header,detail){
					console.log(detail);
					$scope.register_error = e.error;
				});
			} else
				return $scope.registerForm.submitted = true;
		}


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
		}

	});
