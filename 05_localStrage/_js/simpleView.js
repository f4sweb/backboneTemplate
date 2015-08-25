define([
	'underscore',
	'backbone',
	'router'
], function (_,Backbone,Router) {



	console.log("simpleView.js");
	console.log(Router);

	Router.addRoutes("page01",function(){
		console.log("simplaeView addRoutes",this);
	});
	Router.getAppRouter();


	var pageTemplate;
	var PageModel = Backbone.Model.extend({});
	var pageModel = new PageModel();

	// ユーザー一覧表示領域のビュー
	var PageView = Backbone.View.extend({

		model : pageModel,
		initialize : function(options) {
			this.template = _.template(pageTemplate);

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
		}
	});
	var pageView;

	return {
		start : function(url,temp){
			pageModel.url = url;
			pageTemplate = temp;

			pageView = new PageView();
		},
		remove : function(){
			pageTemplate = null;
			pageModel.clear();
			pageView.remove();
		}
	};
});
