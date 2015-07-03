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

	var AppRouter = Backbone.Router.extend({
		routes: {
			"": 				"page01",
			'page01(:query)': 	'page01'
		},
		page01: function () {
			new SimpleView();
		}
	});
	return AppRouter;
	
});
