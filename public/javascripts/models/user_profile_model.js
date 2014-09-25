ENDPOINT.Models.UserProfile = Backbone.Model.extend({
  initialize: function(opts){
    this.set("url", opts.url)
  },

  url: function(){
    return this.attributes.url;
  }
})