'use strict';

angular
	.module('oddlyFrontApp')
	.controller('GeneralAppCtrl', function ($scope, $http, $location, $translate, SERVER) {
		$scope.items = {
			books:[],
			comics:[],
			magazines:[],
			newspapers:[]
		};

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
