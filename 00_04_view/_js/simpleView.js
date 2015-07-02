define([
	'underscore',
	'backbone',
	"text!temp.html"
], function (_,Backbone,temp) {

	//####################
	//Model
	//####################
	var PageModel = Backbone.Model.extend({
		url:"_js/testJson.json"
	});
	var pageModel = new PageModel();

	//####################
	//View
	//####################
	var PageView = Backbone.View.extend({
		model : pageModel,
		template:_.template(temp),
		initialize : function(){

			pageModel.fetch({
				type:"POST",
				success : $.proxy(this.onFetch, this)
			});

		},
		render : function() {
			this.$el.html(this.template({model:this.model.toJSON()}));
			return this;
		},
		onFetch : function(){
			$("#contents").append(this.render().el);
		}
	});
	var pageView;

	return {
		remove : function(){
			pageModel.clear();
			pageView.remove();
		},
		start : function(){
			pageView = new PageView();
		}
	};
});
