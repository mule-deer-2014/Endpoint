app.LogIn = {
	Models: {},
	Collections: {},
	Views: {}
}

app.LogIn.Views.LoginPage = Backbone.View.extend({
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
			url: '/login',
			type: 'get',
			data: {email: this.email, password: this.password}
		}).done(function(data){
			if (data.user) {
				$.cookie("user_id", data.user.id)
				app.router.navigate("", true)
			} else {
				$(".errors").html("Email or password is incorrect.")
			}
		})		
	},


	template: _.template($('#login-template').html()),
	render: function() {
		this.$el.html(this.template());
		return this;
	},
})