'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Get an artist infos
	 *
	 * @controller ArtistCtrl
	 * @param {Object} $scope - Current scope
	 * @param {Object} $http - HTTP manager
	 * @param {Object} $location - Route manager
	 * @param {Object} $translate - Translations manager
	 * @param {Object} SERVER - App SERVER constant
	 * @param {Object} $routeParams - Route parameters (e.g. /item/:id -> id)
	 */
	.controller('ArtistCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams) {


		/**
		 * Add SERVER constant to current scope for view (mostly for images)
		 * @attribute {Object} SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Artist default types
		 * @attribute {Array} types
		 */
		$scope.types = ["Writer", "Drawer"];


		/**
		 * Get the actual artist infos from the API
		 *
		 * @method getArtist
		 * @param {String} artist_id - Everything is in the title
		 */
		$scope.getArtist = function(artist_id){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/artist/" + artist_id,
				checkator: true
			})
			.success(function(data){
				$scope.artist = data.artist;
			})
		};


		// Get artist infos
		$scope.getArtist($routeParams.id);

	})
