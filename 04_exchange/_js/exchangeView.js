define([
	"jquery",
	'underscore',
	'backbone',
	"text!../_template/listTemp.html",
	"text!../_template/temp02.html"
], function ($,_,Backbone,listTemp,temp02) {

	//使用アイテム保存用
	var useItemNum;
	//################################
	//チャレンジボタンコレクションとビュー
	//################################
	var ListCollection = Backbone.Collection.extend({
		url:"./_json/listUpdate.json"
	});
	var listCollection;


	var ListView = Backbone.View.extend({

		tagName:"li",
		template: _.template(listTemp),
		events:{
			"touchend .btn":"touchHandler"
		},
		initialize : function(){
			//this.listenTo(this.model, "change", this.render);

			//コレクションのonSaveを取得
			this.listenTo(listCollection, "onSave", this.onSave);
		},
		touchHandler : function(e){
			e.preventDefault();
			var resultItemNum = pageModel.get("hasTicket") - this.model.get("needNum");
			var resultChangeCount = this.model.get("changeCount") + 1;
			useItemNum = this.model.get("needNum");
			this.save(resultChangeCount);
		},
		render : function() {
			this.$el.html(this.template({model:this.model.toJSON()}));
			return this;
		},
		onSave : function(){
			//所持チケット更新
			var resultItemNum = this.model.get("hasTicket") - useItemNum;
			this.model.set({"hasTicket":resultItemNum});

			//レンダリング
			this.render();
		},
		save : function(resultChangeCount){
			this.model.save({"changeCount":resultChangeCount},{
				wait : true,
				success : function(){
					//コレクションにカスタムイベント発火
					listCollection.trigger("onSave");
					//所持数更新
					document.getElementById("hasTicket").innerText = pageModel.get("hasTicket") - useItemNum;
				},
				error : function(model,res,options){
					console.log(options);
				}
			});
		}
	});


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
			});
		},
		render : function() {
			this.$el.html(this.template({model:this.model.toJSON()}));
			return this;
		},
		onFetch : function(collection, resp) {
			//フラグメントその１
			var flgmntNode01 = document.createDocumentFragment();
			flgmntNode01.appendChild(this.render().el);

			listCollection = new ListCollection(resp.list);
			//フラグメントその２
			var flgmntNode02 = document.createDocumentFragment();
			listCollection.each(function(model,index){
				model.set({"hasTicket":resp.hasTicket});
				var listView = new ListView({
					model:model
				});
				flgmntNode02.appendChild(listView.render().el);
			});

			flgmntNode01.getElementById("listWrap").appendChild(flgmntNode02);

			//最後にコンテンツ追加
			document.getElementById("contents").appendChild(flgmntNode01);
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
