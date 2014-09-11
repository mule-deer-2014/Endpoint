ENDPOINT.Collections.Comments = Backbone.Collection.extend({
  initialize: function(opts){
    this.url = "/reviews/" + opts.review_id +  "/comments"
  },
  model: ENDPOINT.Models.Comment
})