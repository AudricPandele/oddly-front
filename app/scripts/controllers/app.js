'use strict';

angular
	.module('oddlyFrontApp')
	.controller('GeneralAppCtrl', function ($scope, $http, $location, $translate, SERVER) {

		//Set default models
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
			url: "/dummy/fresh/items.json"
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

	});
