"use strict"

angular
	.module("oddlyAppConstants", [])


	/**
	 * Oddly SERVER constant
	 * @static
	 */
	.constant("SERVER", {
		METHOD: "http://",
		API: "api.oddly.fr/api/v1",
		CDN: "cdn.oddly.fr"
	})
