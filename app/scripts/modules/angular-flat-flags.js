"use strict";

angular
	.module("oddlyFlatFlags", [])


	/**
	 * Oddly Flat Flags
	 * Show mini-flags using simple directives and ISO codes
	 * @author Ugo Stephant
	 * @module oddlyFlatFlags
	 * @directive flag
	 */
	.directive("flag", function() {
		return {
			restrict: "E",
			replace: true,
			template: '<span class="flat-flag flag-{{ size }} flag-{{ country }}"></span>',
			scope: {
				country: "@",
				size: "@"
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
	})
