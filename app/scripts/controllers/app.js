'use strict';

angular
	.module('oddlyFrontApp')

	//General app controller
	.controller('GeneralAppCtrl', function ($scope, $http, $location, $translate, SERVER) {

		//Set default models
		$scope.SERVER = SERVER;
		$scope.advert = {};
		$scope.items = { books:[], comics:[], magazines:[], newspapers:[] };


		//Get home advert
		$http({
			method: "GET",
			url: "/dummy/fresh/home_ad.json"
		})
		.success(function(data){
			$scope.advert = data.advert;
		});


		//Get new items from each type
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/items/fresh",
			//url: "/dummy/fresh/items.json", // DUMMY
			checkator: true
		})
		.success(function(data){
			$scope.items = data.items;
		});


		//Check current route for active links
		$scope.activeRoute = function(rt){
			return rt === $location.path();
		};


		//Change lang
		$scope.setLocale = function(name, code, locale){
			$translate.use(locale);
			$scope.selected = { name: name, code: code };
		};

	})

	//Single item controller
	.controller('ItemCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams) {

		//Set default model
		$scope.item = { };
		$scope.SERVER = SERVER;

		//Get asked item
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/item/" + $routeParams.id, // PROD
			//url: "/dummy/item/item.json", // DUMMY
			checkator: true,
			params: {
				locale : "en_US"
			}
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
		}

	})


	.controller('PlayerCtrl', function($scope, $http, $location, $translate, SERVER, $routeParams, Fullscreen){

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
		})
		.error(function(data, status, headers, config){
			console.log(status+" : "+data);
		});

		$scope.getPage = function(page){
			var canvas = document.getElementById("player-render");
			var ctx = canvas.getContext("2d");

			// If user quality setting = SD
			$scope.previousPage = new Image();
			$scope.previousPage.onload = function() {
				canvas.width = this.width;
				canvas.height = this.height * (this.width / canvas.width);
				ctx.drawImage(this, 0, 0);

				$scope.currentPage = page;
				$(window).trigger('resize');
				console.log($scope.currentPage);
			};

			$scope.previousPage.src = SERVER.METHOD + SERVER.CDN + "/item/" + $routeParams.id + "/SD/" + page;
		};

		$scope.fullscreen = function(){
			Fullscreen.toggleAll();
			$scope.is_fullscreen = (Fullscreen.isEnabled()) ? true : false;
		};

	})
