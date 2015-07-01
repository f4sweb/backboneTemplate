define([
	'underscore',
	'backbone',
	"text!temp01.html"
], function (_,Backbone,temp) {

	console.log("あいうおえ");
	var PageModel = Backbone.Model.extend({});
	var pageModel = new PageModel();

	// ユーザー一覧表示領域のビュー
	var PageView = Backbone.View.extend({
		model : pageModel,
		template:_.template(temp),
		initialize : function(){
			document.getElementById("contents").appendChild(this.template());
		}
	});
	return PageView;

});
