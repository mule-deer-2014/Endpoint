app.Router = Backbone.Router.extend({
	routes: {
		"": "navigateToHome",
		"signup": "navigateToSignUp",
		"login": "navigateToLogin",
		"searchResults": "navigateToSearchResults",
		"api/:id": "navigateToApiProfile"
	},

	resetBody: function(){
		var navbar = new app.NavBar.Views.NavBarView();
		$('#navbar').empty();
		$('#app-body').empty();
		$('#navbar').html(navbar.render().$el)

	},

	navigateToHome: function(){
		this.resetBody();
		this.toggleNavBar();
		var homeView = new app.HomePage.Views.HomeView();
		$('#app-body').html(homeView.render().$el);
	},

	navigateToSignUp: function(){
		this.resetBody();
		this.toggleNavBar();
		var signup = new app.SignUp.Views.SignUpPage(app.router);
		$('#app-body').html(signup.render().$el);
	},

	navigateToLogin: function(){
		this.resetBody()
		this.toggleNavBar();
		var login = new app.LogIn.Views.LoginPage(app.router);
		$("#app-body").html(login.render().$el);
	},

	navigateToSearchResults: function(){
		var navbar = new app.NavBar.Views.NavBarView();
		$('#navbar').html(navbar.render().$el)
		this.toggleNavBar();
		var result = new app.SearchResults.View();
		result.render()
	},

	navigateToApiProfile: function(id){
		this.resetBody()
		this.toggleNavBar();
		var navbar = new app.NavBar.Views.NavBarView();
		var apiprofile = new app.ApiProfile.Views.Profile({id: id});
		var apireviews = new app.ApiProfile.Views.Reviews({id: id});
		$('#navbar').empty();
		$('#app-body').empty();
		$('#navbar').html(navbar.render().$el);
		$('#app-body').html(apiprofile.render().$el);
		$('#app-body').append(apireviews.render());
	},

	toggleNavBar: function(){
		if ($.cookie("user_id")){
			$("#logout").toggleClass("hidden")
		} else {
			$("#login").toggleClass("hidden")
			$("#sign-up").toggleClass("hidden")
		}
	}

});

(function(){
	app.router = new app.Router();
	Backbone.history.start()
})()
