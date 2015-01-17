"use strict"

angular
	.module("oddlyAppConstants", [])


	/**
	 * Oddly SERVER constant
	 * @static
	 */
	.constant("SERVER", {
		METHOD: "http://",
		API: "odd.li:8001/api/v1", //"api.oddly.fr/api/v1",
		CDN: "cdn.oddly.fr"
	})
