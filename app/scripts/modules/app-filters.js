"use strict";

angular


	/**
	 * Oddly filters
	 * @module oddlyAppFilters
	 */
	.module("oddlyAppFilters", [])


	/**
	 * Replace unix new lines by html linebreaks in a text
	 * @filter nl2br
	 * @return {String} parsed text
	 */
	.filter("nl2br", function () {
		return function(text) {
			return text ? text.replace(/\n/g, "<br/>") : "";
		}
	})


	/**
	 * Check is object is empty
	 * @filter isEmpty
	 * @return {boolean} true is object is empty, false otherwise
	 */
	.filter('isEmpty', function () {
		return function (obj) {
			return Object.keys(obj).length == 0;
		};
	})


	/**
	 * Transforms a float rate (from 0 to 5) to stars
	 * @filter toStars
	 * @param {float} rate - Artist rate from 0.0f to 5.0f
	 * @return {String} - HTML containing the created stars
	 */
	.filter('toStars', function(){
		return function (rate){
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
