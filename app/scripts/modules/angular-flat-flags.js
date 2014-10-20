/**
 * ng-flat-flags module
 * Turns country ISO code to flag thumbnail.
 *
 */
angular.module('ngFlatFlags', []).
  directive('flag', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<span class="flat-flag flag-{{ size }} flag-{{ country }}"></span>',
      scope: {
        country: '@',
        size: '@'
      },
      link: function(scope, elm, attrs) {
        // Default flag size
        scope.size = 32;

        scope.$watch('country', function(value) {
          scope.country = angular.lowercase(value);
        });

        scope.$watch('size', function(value) {
          scope.size = value;
        });
      }
    };
  });
