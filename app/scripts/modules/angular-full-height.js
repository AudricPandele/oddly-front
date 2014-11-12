/**
 * ng-full-height module
 * Resize container the size of your screen (fucktard css can't do it properly)
 */
angular.module('ngFullHeight', []).
	directive('resize', function($window) {
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
