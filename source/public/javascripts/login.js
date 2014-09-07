app.LogIn = {
	Models: {},
	Collections: {},
	Views: {}
}

app.LogIn.Views.LoginPage = Backbone.View.extend({
	initialize: function(){
	},

	template: _.template($('#login-template').html()),

	render: function() {
		this.$el.html(this.template());
		return this;
	},
})