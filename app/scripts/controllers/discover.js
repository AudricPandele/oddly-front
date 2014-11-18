'use strict';

angular
	.module('oddlyFrontApp')
	.controller('DiscoverCtrl', function ($scope, $http, $translate, $cookieStore, SERVER) {

		//Change lang
		$scope.setLocale = function(name, code, locale){
			$cookieStore.put("locale", locale);
			$translate.use(locale);
			$scope.selected = { name: name, code: code };
		};

	});
