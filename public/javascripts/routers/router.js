ENDPOINT.Routers = Backbone.Router.extend({
	routes: {
		"": "navigateToHome",
		"signup": "navigateToSignUp",
		"login": "navigateToLogin",
		"search=:query": "navigateToSearchResults",
		"api/:id": "navigateToApiProfile"
	},


	resetBody: function(){
		$('#app-body').empty();
		var hasNavbar = false
		for (var i = 0 ; i < ENDPOINT.CurrentState.Views.length; i++) {
			ENDPOINT.CurrentState.Views[i].remove();
			if(ENDPOINT.CurrentState.Views[i].isNavbar){
				hasNavbar = true;
			}
		}
		if (!hasNavbar){
			var navbar = new ENDPOINT.Views.NavBarView({isNavbar: true});
			$('#navbar').html(navbar.render().$el)
		}
		ENDPOINT.CurrentState.Views = [];
	},

	navigateToHome: function(){
		this.resetBody();
		this.toggleNavBar();
	    var homeView = new ENDPOINT.Views.HomeView();
		ENDPOINT.CurrentState.Views.push(homeView)
		$('#app-body').html(homeView.render().$el);
	},

	navigateToSignUp: function(){
		this.resetBody();
		this.toggleNavBar();
		var signupModel = new ENDPOINT.Models.SignUp();

		var signup = new ENDPOINT.Views.SignUpPage({model: signupModel});
		$('#app-body').html(signup.render().$el);
	},

	navigateToLogin: function(){
		this.resetBody()
		this.toggleNavBar();
		var loginModel = new ENDPOINT.Models.Login();
		var login = new ENDPOINT.Views.LoginPage({model: loginModel});
		$("#app-body").html(login.render().$el);
	},

	navigateToSearchResults: function(query){
		this.resetBody();
		this.toggleNavBar();
		console.log("in navigate")
		var searchModel = new ENDPOINT.Models.Search({input: query});
		searchModel.fetch({data: {input: searchModel.get("input")}}).done(function(data){
			var searchResultCollection = new ENDPOINT.Collections.SearchResults(data.apis);
			var searchResultsView = new ENDPOINT.Views.SearchResults({collection: searchResultCollection});
			searchResultsView.render().$el;
		}).fail(function(){
			ENDPOINT.router.navigate("", true)
			$("#search-error-message").append("Sorry, we don't have anything that matches that.")
		})
	},

	navigateToApiProfile: function(id){
		this.resetBody();
		this.toggleNavBar();

		//display profile page
		var apiProfileModel = new ENDPOINT.Models.ApiProfile({url: "/apis/"+ id});
		apiProfileModel.fetch().done(function(data){
			var apiProfileView = new ENDPOINT.Views.ApiProfile({model: apiProfileModel})
			apiProfileView.render().$el;

		//display reviews on profile page
		var reviewModel = new ENDPOINT.Models.Review({api_id: id})
		var reviewsCollection = new ENDPOINT.Collections.Reviews({api_id: id});
		reviewsCollection.fetch().done(function(data){
			var reviewsCollection = new ENDPOINT.Collections.Reviews(data.reviews);
			var reviewsView = new ENDPOINT.Views.Reviews({collection: reviewsCollection, model: reviewModel});
			$("#app-body").append(reviewsView.render().$el);
		});

		});
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
	ENDPOINT.router = new ENDPOINT.Routers();
	Backbone.history.start()
})()
