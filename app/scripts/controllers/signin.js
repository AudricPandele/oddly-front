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
			console.log(reg);
			$http({
				method : "POST",
				url: "http://"+SERVER.API+"/register/",
				data : reg
			})
			.success(function(data){
				console.log(data);
			})
			.error(function(e,status,header,detail){
				$scope.error = e.error;
			});
		}


		$scope.login = function(user){
			$http({
				method: "POST",
				url: "http://"+SERVER.API+"/login/",
				data : user,
				headers : {
					"Authentication" : "BasicAuth "+btoa(user.password + ':' + user.username),
					"Content-type" : "application/json"
				}
			})
			.success(function(data){
				$cookieStore.put('sid',data.sid);
				$cookieStore.put('username', data.username);
				$location.path("/app");
			})
			.error(function(e,status,header,detail){
				console.error(e.error);
			});
		}

	});
