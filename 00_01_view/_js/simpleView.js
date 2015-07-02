define([
	'underscore',
	'backbone'
], function (_,Backbone) {

	var PageModel = Backbone.Model.extend({});
	var pageModel = new PageModel();

	// ユーザー一覧表示領域のビュー
	var PageView = Backbone.View.extend({
		model : pageModel
	});
	return PageView;

});
