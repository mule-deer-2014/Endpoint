ENDPOINT.Views.UserReview = Backbone.View.extend({
	template: _.template($("#user-review-template").html()),

	events: {
		"click #submit": "clickSubmit"
	},	

	render: function(){
		// this.$el.html(this.template())
		// return this;
		// debugger
		// $("#app-body").append(this.$el.html(this.template()));
	}

})