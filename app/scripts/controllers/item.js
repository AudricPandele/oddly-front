'use strict';

angular
	.module('oddlyFrontApp')

	//Single item controller
	.controller('ItemCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams) {

		//Set default model
		$scope.item = { };
		$scope.SERVER = SERVER;
		$scope.addedToReadLater = false;

		//Get asked item
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/item/" + $routeParams.id, // PROD
			//url: "/dummy/item/item.json", // DUMMY
			checkator: true,
		})
		.success(function(data){
			$scope.item = data.item;
		})
		.error(function(data, status, headers, config){
			console.log(status+" : "+data);
		});

		$scope.implode = function(arr, column, glue){
			var res = [];
			for(var i in arr) res.push(arr[i][column]);
			return res.join(glue);
		};

		$scope.getYear = function(date){
			var res = date.split("-");
			return res[0];
		};

		$scope.getRank = function(rate){
			rate = parseInt(rate);
			rate = (rate > 5) ? 5 : ((rate < 0) ? 0 : rate);

			var full_stars = rate;
			var empty_stars = 5 - rate;

			var res = "";
			for(var i = 0; i < full_stars; i++) res+="<i class='fa fa-star'></i>";
			for(var i = 0; i < empty_stars; i++) res+="<i class='fa fa-star-o'></i>";

			return res;
		};

		$scope.readlater = function(id){
			if($scope.addedToReadLater == true) return;

			$http({
				method: "POST",
				url: SERVER.METHOD + SERVER.API + "/user/readLater/" + id, // PROD
				//url: "/dummy/item/item.json", // DUMMY
				checkator: true,
			})
			.success(function(data){
				$scope.addedToReadLater = true;
				console.log(data);
			})
			.error(function(data, status, headers, config){
				console.log(status+" : "+data);
			});
		};

	})


	.controller('PlayerCtrl', function($scope, $http, $location, $translate, SERVER, $routeParams, Fullscreen, $lazyloading){

		window.onkeyup = function(e) {
			if(e.keyCode == 37) return $scope.getPage($scope.currentPage - 1);
			else if(e.keyCode == 39) return $scope.getPage($scope.currentPage + 1);
			else return false;
		}

		// Avoid right click
		window.oncontextmenu = function(){
			return false;
		};

		// Define scope
		$scope.currentPage = 1;
		$scope.previousPage = null;
		$scope.item = {};
		$scope.is_fullscreen = false;

		// Get book infos
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/item/" + $routeParams.id, // PROD
			//url: "/dummy/item/item.json", // DUMMY
			checkator: true,
		})
		.success(function(data){
			$scope.item = data.item;
			$scope.getPage(1);
			$scope.total_pages = data.item.total_pages;
		})
		.error(function(data, status, headers, config){
			console.log(status+" : "+data);
		});

		$lazyloading.init($routeParams.id, $scope.total_pages, 1, "SD");

		$scope.getPage = function(page){
			var canvas = document.getElementById("player-render");
			var ctx = canvas.getContext("2d");

			// If user quality setting = SD
			$scope.previousPage = $lazyloading.stream(page);

			$scope.previousPage.onload = function() {
				canvas.width = this.width;
				canvas.height = this.height * (this.width / canvas.width);
				ctx.drawImage(this, 0, 0);

				$scope.currentPage = page;
				$(window).trigger('resize');
				$('.app-player').scrollTop(0);
			};

		};

		$scope.fullscreen = function(){
			Fullscreen.toggleAll();
			$scope.is_fullscreen = (Fullscreen.isEnabled()) ? true : false;
		};

	})
