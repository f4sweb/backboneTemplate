/*global define*/
define([
	'underscore',
	'backbone',
	"common/backboneCustom",
	"common/ajaxControl"
], function (
		_,
		Backbone,
		backboneCustom,
		ajaxControl
	){
	'use strict';

	console.log("router.js");
	var AppRouter = Backbone.Router.extend({
		routes: {
			'exchange(:query)': 	'exchange'
		},
		//ルーティングの前
		before: function () {
			console.log("router before");
		},
		//ルーティング終了
		after: function () {
			console.log("router after");
		}
	});

	var appRouter = new AppRouter();
	console.log("最初のappRouter",appRouter);

	return {
		addRoutes : function(url,func){
			console.log("addRoutes",url,func);
			//appRouter.routes[url] = func;
			appRouter.route(url,func);

		},
		getAppRouter : function(){
			console.log(appRouter);
		}
	};
});
