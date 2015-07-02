/*global define*/
define([
	'underscore',
	'backbone',
	"simpleView"
], function (
		_,
		Backbone,
		simpleView
	){
	'use strict';


	var AppRouter = Backbone.Router.extend({
		routes: {
			"": 				"page01",
			'page01(:query)': 	'page01'
		},
		page01: function () {
			new simpleView();
		}
	});
	return AppRouter;
});
