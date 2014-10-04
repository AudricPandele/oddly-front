'use strict';

/**
 * @ngdoc function
 * @name oddlyFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oddlyFrontApp
 */
angular.module('oddlyFrontApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ]; 
      /**
       * List of messages
       */
      $scope.messages = {
	  success : "Inscription réussie",
	  error : "Une erreur est survenue",
	  already_exist : "Cet email est déjà utilisé"
      };	

      /**
       * Check if is a valid form
       * and add user email for beta account
       */
      $scope.subscribe = function(user) {
	  if($scope.subscribeForm.$valid)
	  {
	      $http({
		  method : "POST",
		  url: "http://"+ SERVER.dev.url +"/beta/account/",
		  data : user
	      })
		  .success(function(data,status,headers,config){
		      return $scope.success = true;
		  })
		  .error(function(e,status,detail,request){
		      console.error(status);
		      console.error(request); // Request debug
		  });
	  }
      }
  }).controller('GalleryCtrl', function($scope,$http,$interval){	
	$http.get("https://www.kimonolabs.com/api/6d5btrrc?apikey=Lx1hGyuzKEXvzbMH2gvsnB0GtS0FneX3")
	  .success(function(data,status){
	      if(status == 200)
		  $interval(function() {
						randomItem(data);
		  }, 5000);
	  });
      
      /**
       * Get a random item from kimono api
       *
       * @return $scope
       */
      function randomItem(data) {
	  var random_item = data.results.gallery[Math.floor(Math.random() * data.results.gallery.length)];	
	  return $scope.background_image = random_item.image.src;
     } 	
});
