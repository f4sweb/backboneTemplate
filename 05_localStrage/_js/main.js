/*global require*/
'use strict';

require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: '/lib/jquery',
		underscore: '/lib/underscore',
		backbone: '/lib//backbone',
		backboneLocalstorage: '/lib/backbone.localStorage',
		text: '/lib/text'
	}
});

require([
	'backbone',
	'router',
	'simpleView'
], function (Backbone,Router,simpleView) {

	//new Router();
	Backbone.history.start();
});
