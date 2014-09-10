ENDPOINT.Views.Comments = Backbone.View.extend({
  template: _.template($("#comments-template").html()),

  render: function(){
    var filledTemplate = this.template();
    this.$el.html(filledTemplate);
    var that = this
    this.collection.each(function(commentModel){
      var commentView = new ENDPOINT.Views.Comment({model: commentModel});
      that.$el.find("#comment-space").append(commentView.render().$el);
    })

    return this;
  },
})


ENDPOINT.Views.Comment = Backbone.View.extend({
  template: _.template($("#comment-template").html()),

  render: function(){
    var filledTemplate = this.template(this.model.attributes);
    this.$el.html(filledTemplate)
    return this;
  }

})