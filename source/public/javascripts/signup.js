app.SignUp = {
	Models: {},
	Collections: {},
	Views: {}
}

app.SignUp.Views.SignUpPage = Backbone.View.extend({
	initialize: function(){
	},
	
	events: {
		"click #submit": "clickSubmit"
	},

	clickSubmit: function(){
		this.email = $("input[name='email']").val();
		this.password = $("input[name='password']").val();
		this.ajaxRequest();
	},

	ajaxRequest: function(){
		Backbone.ajax({
			url: '/users',
			type: 'post',
			data: {email: this.email, password: this.password}
		}).done(function(data){
			$.cookie("user_id", data.user.id)
			app.router.navigate("", true)
		})		
	},

	template: _.template($('#signup-template').html()),
	render: function() {
		this.$el.html(this.template());
		return this;
	},
})