/*global define*/
define([
	'underscore',
	'backbone',
	"common/backboneCustom",
	"common/ajaxControl",
	"text!../_template/temp01.html",
	"text!../_template/temp02.html",
	"simplaeView",
	"challengeView"
], function (
		_,
		Backbone,
		backboneCustom,
		ajaxControl,
		page01Temp,
		page02Temp,
		simplaeView,
		challengeView
	){
	'use strict';

	//ページインスタンス
	var pageInstance;
	var pageURL;
	var pageTemp;

	var AppRouter = Backbone.Router.extend({

		routes: {
			"": 			"simplePage",
			'simplePage(:query)': 	'simplePage',
			'challengePage(:query)': 	'challengePage'
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
				//console.log(pageInstance);
				pageInstance.start();
			}

		},
		//以下各ルーティング
		simplePage: function () {
			pageURL = "_json/test.json";
			pageTemp = page01Temp;
			pageInstance = simplaeView;
		},
		challengePage: function () {
			pageURL = null;
			pageInstance = challengeView;
		}
	});
	return AppRouter;
});


