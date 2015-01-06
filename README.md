## Oddly Front ![](https://travis-ci.org/unexceptednavyshower/oddly-front.svg)

### Prequisites
* Node JS >= 0.10.0 :
	- Windows : [32-bit](http://nodejs.org/dist/v0.10.35/node-v0.10.35-x86.msi) / [64-bit](http://nodejs.org/dist/v0.10.35/x64/node-v0.10.35-x64.msi)
	- Mac OS : [Universal](http://nodejs.org/dist/v0.10.35/node-v0.10.35.pkg)
	- Linux : `sudo apt-get install nodejs npm`


* Grunt CLI / Bower : `npm install -g grunt-cli bower`


### Install project dependencies
Inside project root :
* Node : `npm install`
* Bower : `bower install`


### Run on local server
* Start server : `grunt serve`
* Open main page : [localhost:9001](http://localhost:9001/)


### Build project to `dist/`
* Clean : `grunt clean`
* Build : `grunt build`

![](https://img.shields.io/badge/%2F!%5C-Warning-yellow.svg?style=flat) Don't forget to make your Apache vhost go to `dist/`

### Known errors

* Grunt :
	- **Grunt cannot run/build :** You didn't install the dependencies...


* Chrome :
	- **Cannot find scripts located in `bower_components/` :** Your apache vhost configuration is propably going to `app/` instead of `dist/`. Means you're hitting dev environment instead of production. You dumb ass.
	- **Cannot resolve Angular to a variable :** Either you didn't build the project, or you didn't install all the dependencies
    - **500 Internal Server Error :** Most probably due to a missing `.htaccess` in the `dist/` folder (due to file permissions). Try copying it manually or run `grunt build` with `sudo`.
