/*global define*/
define([
	"jquery",
	'backbone'
], function ($,Backbone) {
	'use strict';

	console.log("ajaxControl.js");
	//##########################
	//ajax共通処理
	//##########################
	var doc = $(document);
	doc.ajaxStart(function() {
		console.log("ajaxスタート");
	});
	doc.ajaxError(function() {
		console.log("ajaxエラー");
	});
	doc.ajaxComplete(function() {
		console.log("ajax終了");
	});

});
