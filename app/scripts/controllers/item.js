'use strict';

angular
	.module('oddlyFrontApp')

	//Single item controller
	.controller('ItemCtrl', function ($scope, $http, $location, $translate, SERVER, $routeParams) {

		//Set default model
		$scope.item = { };
		$scope.SERVER = SERVER;
		$scope.addedToReadLater = false;
		$scope.addedToBookshelf = false;

		//Get asked item
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/item/" + $routeParams.id, // PROD
			//url: "/dummy/item/item.json", // DUMMY
			checkator: true,
		})
		.success(function(data){
			$scope.item = data.item;
			$scope.addedToReadLater = data.item.to_read == "true";
			$scope.addedToBookshelf = data.item.in_bookshelf == "true";
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
				url: SERVER.METHOD + SERVER.API + "/user/readlater/" + id,
				checkator: true,
			})
			.success(function(data){
				$scope.addedToReadLater = true;
			})
			.error(function(data, status, headers, config){
				console.log(status+" : "+data);
			});
		};

		$scope.save = function(id){
			$http({
				method: "POST",
				url: SERVER.METHOD + SERVER.API + "/user/save/" + id,
				checkator: true,
			})
			.success(function(data){
				console.log(data);
				$scope.addedToBookshelf = data.in_bookshelf == "true";
			})
			.error(function(data, status, headers, config){
				console.log(status+" : "+data);
			});
		};

	})


	.controller('PlayerCtrl', function($scope, $http, $location, $translate, SERVER, $routeParams, Fullscreen, $lazyloading){

		$scope.previousSave = new Date();

		window.onkeyup = function(e) {
			if(e.keyCode == 37) return $scope.getPage($scope.currentPage - 1);
			else if(e.keyCode == 39) return $scope.getPage($scope.currentPage + 1);
			else return false;
		};

		// Avoid right click
		window.oncontextmenu = function(){
			return false;
		};

		// Define scope
		$scope.currentPage = 1;
		$scope.previousPage = null;
		$scope.item = {};
		$scope.is_fullscreen = false;

		$scope.getBookInfos = function(){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/item/" + $routeParams.id, // PROD
				//url: "/dummy/item/item.json", // DUMMY
				checkator: true,
			})
			.success(function(data){
				$scope.item = data.item;
				$scope.total_pages = data.item.total_pages;
				$scope.getReadItem();
			})
			.error(function(data, status, headers, config){
				console.log(status+" : "+data);
			});
		};

		$scope.getReadItem = function(){
			$http({
				method: "GET",
				url: SERVER.METHOD + SERVER.API + "/user/haveread/" + $routeParams.id,
				checkator: true,
			})
			.success(function(data){
				if(data.item)
					$scope.currentPage = parseInt(data.current_page);

				$lazyloading.init($routeParams.id, $scope.total_pages, $scope.currentPage, "SD");
				$scope.getPage($scope.currentPage);
			})
			.error(function(data, status, headers, config){
				console.log(status+" : "+data);
			});
		};

		$scope.getPage = function(page){

			var tmp = new Date();
			var diff = tmp.getTime() - $scope.previousSave.getTime();
			if(diff >= 5000){
				$scope.savePage($scope.item._id, $scope.currentPage);
				$scope.previousSave = new Date();
			}

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

		$scope.savePage = function(itemid, page){
			$http({
				method: "POST",
				url: SERVER.METHOD + SERVER.API + "/user/read/" + itemid + "/" + page,
				checkator: true,
			})
			.success(function(data){
				console.log(data);
			})
			.error(function(e){
				console.log(e);
			})
		};

		$scope.fullscreen = function(){
			Fullscreen.toggleAll();
			$scope.is_fullscreen = (Fullscreen.isEnabled()) ? true : false;
		};

		$scope.getBookInfos();

	})
