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
