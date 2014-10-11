'use strict';

angular
	.module('oddlyFrontApp')
	.controller('SignInCtrl', function ($scope, $http, $translate, SERVER) {

		/**
		 * @todo Faire ça plus propre
		 * avec vérif du model user
		 * et personnalisation message success / error
		 */
		$scope.register = function(user){
			$http({
				method : "POST",
				url: "http://"+ SERVER.dev.url +"/api/v1/register/",
				data : user
			})
			.success(function(data){
				console.log(data);
			})
			.error(function(e,status,header,detail){
				$scope.error = e.error;
			});
		}

	});
