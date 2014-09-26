'use strict';

/**
 * @ngdoc function
 * @name oddlyFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oddlyFrontApp
 */
angular.module('oddlyFrontApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
