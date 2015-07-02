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
		onFetch : function(){
			$("#contents").append(this.template())

			console.log(this)
		}
	});
	return PageView;

});
