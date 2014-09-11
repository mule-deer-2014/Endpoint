ENDPOINT.Views.Comments = Backbone.View.extend({
  events: {
    "click .submission":"submitComment"
  },
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

  submitComment: function(){
    event.preventDefault();
    var reviewId = event.target.parentElement.parentElement.children[0].children[0].children[1].dataset.id
    var userId = $.cookie("user_id")
    var commentContent = $(event.target).parent().children().first().val();
    var newComment = {content: commentContent,
                      review_id: reviewId,
                      user_id: userId
                      }
    this.collection.create(newComment)
    var api_id = $(".single-review")[0].dataset.api
    var url = "api/" + api_id;
    ENDPOINT.router.navigate("", true)
    ENDPOINT.router.navigate(url, true)
  }
})


ENDPOINT.Views.Comment = Backbone.View.extend({
  template: _.template($("#comment-template").html()),

  render: function(){
    var filledTemplate = this.template(this.model.attributes);
    this.$el.html(filledTemplate)
    return this;
  }

})