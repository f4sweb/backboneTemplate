/*global define*/
define([
	'underscore',
	'backbone',
	"common/backboneCustom",
	"common/ajaxControl",
	"SectionDayOfTheWeekPage"
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

	var sectionControl = new SectionDayOfTheWeekPage();

	var AppRouter = Backbone.Router.extend({

		routes: {
			"": 			"top",
			"day(:query)": 		"day",
			'challenge(:query)': 	'simplePage',
			'que(:query)': 		'que'
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
		top : function(){

		},
		//以下各ルーティング
		day: function () {
			pageURL = "_json/test.json";
			pageTemp = page01Temp;
			pageInstance = simplaeView;
		},
		challenge: function () {
			pageURL = null;
			pageInstance = challengeView;
		},
		que: function () {
			pageURL = null;
			pageInstance = challengeView;
		}
	});
	return AppRouter;
});


