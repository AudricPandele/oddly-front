/**
 * Created by Udo Stephant on 11/10/2014
 * http://www.ugostephant.io / contact@ugostephant.io
 */

(function(){

	angular
		.module('loginCheck', ['ngRoute','ngCookies'])
		.directive('html', ['$rootScope','$compile','$location','$cookies',
			function($rootScope, $compile, $location, $cookies){
				$rootScope.$on('$routeChangeStart', function (e, next, current) {
					if(current && current.$$route && current.$$route.protected){
						console.log("protected");
					}
				});
			}
		]);

})();
