'use strict';

angular
	.module('oddlyFrontApp')
	.controller('SignInCtrl', function ($scope, $http, $translate, SERVER) {

		/**
		 * @todo Faire ça plus propre
		 * avec vérif du model user
		 * et personnalisation message success / error
		 */
		$scope.register = function(register){
			$http({
				method : "POST",
				url: "http://"+SERVER.prod.url+"/register/",
				data : register
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
				url: "http://"+SERVER.prod.url+"/login/",
				data : user,
				headers : {
					"Authentication" : "BasicAuth "+btoa(user.username + ':' + user.password),
					"Content-type" : "application/json"
				}
			})
			.success(function(data){
				console.log("logged");
				console.log(data);
			})
			.error(function(e,status,header,detail){
				console.error(e.error);
			});
		}

	});
