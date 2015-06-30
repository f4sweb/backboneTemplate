define([
	'underscore',
	'backbone'
], function (_,Backbone) {

	var uaMatch = function () {
		const ua = navigator.userAgent.toLowerCase();
		for (var i = 0; i < arguments.length; i++) {
			if (ua.match(arguments[i])) {
				return true;
			}
		}
		return false;
	};
	const ua = {
		ios: uaMatch('ipad', 'iphone', 'ipod'),
		ios6: uaMatch('iphone os 6_'),
		ipad: uaMatch('ipad'),
		ipod: uaMatch('ipod'),
		android: uaMatch('android'),
		isGalaxys2: uaMatch('isw11sc', 'sc-02c', 'sc-03d'),
		isGalaxys3: uaMatch('sc-03e', 'sc-06d', 'scl21'),
		isGalaxys3a: uaMatch('sc-03e')
	};
	ua.isGalaxys2 = true;

	const cgti = (function () { // commonGetTouchId. 端末によって効き具合が異なる.
		if (!ua.ios && !ua.android) {
			return 'click'; // pc browser.

		} else if (ua.isGalaxys2 || ua.isGalaxys3) {
			return 'click'; // !touchend.
		}

		return 'touchend'; // default. iOS=!click.
	})();

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
		events:function(){
			var obj = {}
			obj[cgti] = "touchHandler";
			return obj;
		},
		touchHandler : function(){
			console.log("たっち");
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
