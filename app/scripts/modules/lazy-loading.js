'use strict'

angular.module('oddlyFrontApp').service('$lazyloading', function(SERVER) {

	this.img = {};
	this.url = "";
	this.total_pages;

	this.init = function(id, total_pages, page, quality) {
		page = page || 1;
		quality = quality || "SD";

		this.url = SERVER.METHOD + SERVER.CDN + "/item/" + id + "/" + quality + "/";
		this.total_pages = total_pages;

		return this.stream(page);
	}

	this.stream = function(page) {
		var page = parseInt(page);
		if(this.img.hasOwnProperty(page)) {
			var item = new Image();
			item.src = this.url + page;
			this.img[page] = item;

			var itemLz = new Image();
			itemLz.src = this.url + parseInt(page + 1);
			this.img[parseInt(page + 1)] = itemLz;

			return item;
		} else {
			var item = new Image();
			item.src = this.url + page;
			this.img[page] = item;

			return item;
		}
	}

});