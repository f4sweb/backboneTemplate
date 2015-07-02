define([
	"jquery",
	'underscore',
	'backbone',
	"text!../_template/listTemp.html",
	"text!../_template/temp02.html"
], function ($,_,Backbone,listTemp,temp02) {




	//################################
	//チャレンジボタンコレクションとビュー
	//################################
	var ListCollection = Backbone.Collection.extend({
		url:"./_json/listUpdate.json"
	})
	var listCollection;


	var ListView = Backbone.View.extend({
		template: _.template(listTemp),

		events:{
			"touchend .btn" : "save"
		},
		initialize : function(){
			this.listenTo(this.model, "change", this.render);
		},
		render : function() {
			this.$el.html(this.template({model:this.model.toJSON()}));
			return this;
		},
		save : function(){
			this.model.save({"btnState":2},{
				wait : true,
				//success : $.proxy(this.render, this),
				error : function(model,res,options){
					console.log(options);
				}
			})
		}
	})



	//################################
	//初回Model、View
	//################################
	var pageTemplate;
	var PageModel = Backbone.Model.extend({
		url:"./_json/test2.json"
	});
	var pageModel = new PageModel();

	// ユーザー一覧表示領域のビュー
	var PageView = Backbone.View.extend({

		model : pageModel,
		initialize : function(options) {
			this.template = _.template(temp02);

			//初回同期
			this.model.fetch({
				type:"POST",
				success : $.proxy(this.onFetch, this),
				error : function(model,res,options){
					console.log(options);
				}
			})
		},
		render : function() {
			this.$el.html(this.template({model:this.model.toJSON()}));
			return this;
		},
		onFetch : function(collection, resp) {
			$("#contents").append(this.render().el);

			//################################
			//チャレンジボタンコレクション
			//################################
			var list = document.getElementById("listWrap").getElementsByTagName("li");
			listCollection = new ListCollection(resp.list);
			listCollection.each(function(model,index){
				var listView = new ListView({
					model:model,
					el:list[index]
				});
			});

		}
	});
	var pageView;


	return {
		start : function(){
			pageView = new PageView();
		},
		remove : function(){

			pageModel.clear();
			pageView.remove();
		}
	};
});
