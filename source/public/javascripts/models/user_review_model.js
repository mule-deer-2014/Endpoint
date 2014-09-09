ENDPOINT.Models.UserReview = Backbone.Model.extend({
  	initialize: function(opts){
  		this.id = opts.id
  	},
  	url: '/apis/' + this.id + '/reviews'
})