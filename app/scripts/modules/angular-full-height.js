"use strict";

angular
	.module("oddlyFullHeight", [])


	/**
	 * Shitty polyphil to reproduce CSS3 viewport height behaviour everywhere
	 * (http://www.w3.org/TR/css3-values/#viewport-relative-lengths)
	 * @author Ugo Stephant
	 * @module oddlyFullHeight
	 * @directive resize
	 * @param {Object} $window - Browser window
	 */
	.directive("resize", function($window) {
		return function($scope, $element) {

			//Set scope function to get window height
			$scope.getWindowHeight = function(){ return angular.element($window).height(); };

			//Set scope event to watch window height diff
			$scope.$watch($scope.getWindowHeight, function($new, $old){
				$element.height($new);
			}, true);

			//Bind window resize
			angular.element($window).bind("resize", function(){
				$scope.$apply();
			});
		};
	});
