'use strict';

angular
	.module('oddlyFrontApp')


	/**
	 * Top items from every types
	 * @controller FreshCtrl
	 * @param $scope - Controller scope
	 * @param $http - Http request handler
	 * @param $location - Route manager
	 * @param $translate - Translation manager
	 * @param SERVER - Server constant
	 */
	.controller('TopsCtrl', function ($scope, $http, $location, $translate, SERVER) {
		$scope.addedToReadLater = false;
		$scope.addedToBookshelf = false;


		/**
		 * Pass SERVER constant to view for images path
		 * @attribute SERVER
		 */
		$scope.SERVER = SERVER;


		/**
		 * Init items lists
		 * @attribute items
		 */
		$scope.items = {
			books:[],
			comics:[],
			magazines:[],
			newspapers:[]
		};


		/**
		 * Change current language
		 * @todo Move it to rootScope
		 * @method setLocale
		 * @param name - Language name
		 * @param code - Language ISO code (ex: French = fr_FR)
		 * @param locale - Can't remember what is that shit
		 */
		$scope.setLocale = function(name, code, locale){
			$translate.use(locale);
			$scope.selected = { name: name, code: code };
		};


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


		/**
		 * Get newest items from each type
		 * @static
		 * @protected
		 */
		$http({
			method: "GET",
			url: SERVER.METHOD + SERVER.API + "/items/tops",
			//url: "/dummy/fresh/items.json", // DUMMY
			checkator: true
		})
		.success(function(data){
			$scope.items = data.items;
			console.log(data.items.highlighted.categories)
		});

	})
