"use strict";

angular
	.module("oddlyLazyLoading", [
		"oddlyAppConstants"
	])


	/**
	 * LazyLoading allows us to autoload books pages one after another
	 * @service $lazyloading
	 * @param {Object} SERVER - Oddly server constant
	 */
	.service("$lazyloading", function(SERVER) {


		/**
		 * Represents every pages of a book as images
		 * @attribute {Object} img
		 */
		this.img = {};


		/*
		 * Current page url
		 * @attribute {String} url
		 */
		this.url = "";


		/**
		 * Book number of pages
		 * @attribute {Integer} total_pages
		 */
		this.total_pages = 0;


		/**
		 * Init lazy loading
		 * @param {String} id - Item id
		 * @param {Integer} total_pages - Item total pages
		 * @param {Integer} page - Wanted page
		 * @param {String} quality - Wanted quality (SD or HD)
		 * @return {Image} the loaded page
		 */
		this.init = function(id, total_pages, page, quality) {
			page = page || 1;
			quality = quality || "SD";

			this.url = SERVER.METHOD + SERVER.CDN + "/item/" + id + "/" + quality + "/";
			this.total_pages = total_pages;

			return this.stream(page);
		};


		/**
		 * Stream an image
		 * @param {Integer} page - Wanted page
		 * @return {Image} the loaded page
		 */
		this.stream = function(page) {
			page = parseInt(page);

			if(this.img.hasOwnProperty(page)) {
				var item = new Image();
				item.src = this.url + page;
				this.img[page] = item;

				var itemLz = new Image();
				itemLz.src = this.url + (page + 1);
				this.img[page + 1] = itemLz;

				return item;
			} else {
				var item = new Image();
				item.src = this.url + page;
				this.img[page] = item;

				return item;
			}
		};

	});
