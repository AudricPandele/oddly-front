'use strict';

/**
 * Created by Udo Stephant on 11/10/2014
 * http://www.ugostephant.io / contact@ugostephant.io
 */

angular
	.module('loginCheck', ['ngRoute'])
	.run(['$rootScope',function($rootScope){

		$rootScope.$on('$routeChangeStart', function (e, next, current) {
			if(next && next.$$route && next.$$route.protected){
				console.log("protected route")
			}
		});

	}]);
