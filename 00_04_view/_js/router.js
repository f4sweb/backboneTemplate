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

	//#####################################
	//ルーティング前イベント、後イベント発火
	//#####################################
	Backbone.Router.prototype.before = function () {};
	Backbone.Router.prototype.after = function () {};
	Backbone.Router.prototype.route = function (route, name, callback) {
		if (!_.isRegExp(route)) route = this._routeToRegExp(route);
		if (_.isFunction(name)) {
			callback = name;
			name = '';
		}
		if (!callback) callback = this[name];

		var router = this;

		Backbone.history.route(route, function(fragment) {
			var args = router._extractParameters(route, fragment);

			router.before.apply(router, arguments);
			callback && callback.apply(router, args);
			router.after.apply(router, arguments);

			router.trigger.apply(router, ['route:' + name].concat(args));
			router.trigger('route', name, args);
			Backbone.history.trigger('route', router, name, args);
		});
		return this;
	};

	var instance = null;
	var content = document.getElementById("contents");
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": 				"page01",
			'page01(:query)': 	'page01',
			'page02(:query)': 	'page02',
			'page03(:query)': 	'page03',
			'page04(:query)': 	'page04'
		},
		before : function(){
			if(instance) instance.remove();
		},
		after : function(){
			instance.start();
		},
		page01: function () {
			instance = SimpleView;
		},
		page02: function () {
			instance = SimpleView;
		},
		page03: function () {
			instance = SimpleView;
		}
	});
	return AppRouter;
});
