/*global define*/
define([
	'underscore',
	'backbone',
	"simpleView"
], function (
		_,
		Backbone,
		SimpleView
	){
	'use strict';

	var AppRouter = Backbone.Router.extend({
		routes: {
			"": 				"page01",
			'page01(:query)': 	'page01',
			'page02(:query)': 	'page02',
			'page03(:query)': 	'page03'
		},
		page01: function () {
			new SimpleView();
		},
		page02: function () {
			new SimpleView();
		},
		page03: function () {
			new SimpleView();
		}
	});
	return AppRouter;
});
