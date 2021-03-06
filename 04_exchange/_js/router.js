/*global define*/
define([
	'underscore',
	'backbone',
	"common/backboneCustom",
	"common/ajaxControl",
	"text!../_template/temp01.html",
	"text!../_template/temp02.html",
	"simpleView",
	"exchangeView"
], function (
		_,
		Backbone,
		backboneCustom,
		ajaxControl,
		page01Temp,
		page02Temp,
		simpleView,
		exchangeView
	){
	'use strict';

	//ページインスタンス
	var pageInstance;
	var pageURL;
	var pageTemp;

	var AppRouter = Backbone.Router.extend({

		routes: {
			"": 			"simple",
			'simple(:query)': 	'simple',
			// 'simple(:query)': 	function(){
			// 	pageURL = "_json/test.json";
			// 	pageTemp = page01Temp;
			// 	pageInstance = simpleView;
			// 	console.log("これがいけるなら");
			// },
			'exchange(:query)': 	'exchange'
		},
		//ルーティングの前
		before: function () {
			if(pageInstance) pageInstance.remove();
		},
		//ルーティング終了
		after: function () {
			if(pageURL){
				pageInstance.start(pageURL,pageTemp);
			}else{
				pageInstance.start();
			}
		},
		//以下各ルーティング
		simple: function () {
			pageURL = "_json/test.json";
			pageTemp = page01Temp;
			pageInstance = simpleView;
		},
		exchange: function () {
			pageURL = null;
			pageInstance = exchangeView;
		}


	});
	return AppRouter;
});
