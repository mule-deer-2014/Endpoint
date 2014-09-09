ENDPOINT.Models.UserReview = Backbone.Model.extend({
  	initialize: function(opts){
  		this.set({id: opts.id, url: opts.url})
  	},
  	url: function(){
  		return this.attributes.url
  	}
})