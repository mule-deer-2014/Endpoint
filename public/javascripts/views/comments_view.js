ENDPOINT.Views.Comments = Backbone.View.extend({
  events: {
    "click .submission":"submitComment"
  },
  template: _.template($("#comments-template").html()),

  render: function(){
    var filledTemplate = this.template();
    this.$el.html(filledTemplate);
    var that = this
    // debugger
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
    var commentContent = $("textarea[name='content']").val()
    // debugger
    var newComment = {content: commentContent,
                      review_id: reviewId,
                      user_id: userId
                      }
    this.collection.create(newComment)
    // debugger
    var url = "api/" + data.review.api_id;
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