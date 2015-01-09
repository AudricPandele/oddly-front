'use strict'

/**
 * $lazyloading servie
 *
 * @param (object)
 */
angular
	.module('oddlyFrontApp')
	.service('$lazyloading', function(SERVER) {

		/**
		 * @var (object)
		 */
		this.img = {};

		/*
		 * @var (string)
		 */
		this.url = "";

		/**
		 * @var (int)
		 */
		this.total_pages;

		/**
		 * Init lazy loading
		 *
		 * @param (string)
		 * @param (int)
		 * @param (int)
		 * @param (string)
		 * @return (function) stream()
		 */
		this.init = function(id, total_pages, page, quality) {
			page = page || 1;
			quality = quality || "SD";

			this.url = SERVER.METHOD + SERVER.CDN + "/item/" + id + "/" + quality + "/";
			this.total_pages = total_pages;

			return this.stream(page);
		}

		/**
		 * Stream image
		 *
		 * @param (int) 
		 * @return (object)
		 */
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