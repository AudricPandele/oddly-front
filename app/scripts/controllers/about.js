'use strict';

/**
 * @ngdoc function
 * @name oddlyFrontApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the oddlyFrontApp
 */
angular.module('oddlyFrontApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
