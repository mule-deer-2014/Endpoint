app.Router = Backbone.Router.extend({
	routes: {
		"": "navigateToHome",
		"signup": "navigateToSignUp",
		"login": "navigateToLogin",
		"search=:query": "navigateToSearchResults",
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

	navigateToSearchResults: function(query){
		this.resetBody()
		this.toggleNavBar();
		var searchModel = new app.Models.Search({query: query});
		searchModel.fetch({data: {input: searchModel.get("input")}}).done(function(data){
			var searchResultCollection = new app.Collections.SearchResults(data.apis);
			var searchResultsView = new app.Views.SearchResults({collection: searchResultCollection});
			searchResultsView.render().$el;
		})
	},

	navigateToApiProfile: function(id){
		this.resetBody()
		this.toggleNavBar();
		var apiprofile = new app.ApiProfile.Views.Profile({id: id});
		var apireviews = new app.ApiProfile.Views.Reviews({id: id});
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
