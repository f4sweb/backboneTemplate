/*global define*/
define([
	'underscore',
	'backbone',
	"common/backboneCustom",
	"common/ajaxControl",
	"text!../_template/temp01.html",
	"text!../_template/temp02.html",
	"simplaeView"
], function (
		_,
		Backbone,
		backboneCustom,
		ajaxControl,
		page01Temp,
		page02Temp,
		simplaeView
	){
	'use strict';

	//ページインスタンス
	var pageInstance;
	var pageURL;
	var pageTemp;

	var AppRouter = Backbone.Router.extend({

		routes: {
			"": 			"page01",
			'page01(:query)': 	'page01'
		},
		//ルーティングの前
		before: function () {
			if(pageInstance) pageInstance.remove();
		},
		//ルーティング終了
		after: function () {
			pageInstance.start(pageURL,pageTemp);
		},
		//以下各ルーティング
		page01: function () {
			pageURL = "_json/test.json";
			pageTemp = page01Temp;
			pageInstance = simplaeView;
		}
	});
	return AppRouter;
});


