ENDPOINT.Views.Review = Backbone.View.extend({

  initialize: function(opts){
    this.api_id = opts.api_id
  },

  template: _.template($("#singlereview-template").html()),

  events: {
    "click .comment-toggler": "toggleComments",
    "click .votes": "upVote"
  },

  //this needs to be refactored
  upVote: function(event){
    var user_id = $.cookie("user_id")
    var review_id = this.model.attributes.rev.id
    if ($.cookie("user_id")){
      Backbone.ajax({
        url: '/reviews/' + review_id + '/votes',
        type: 'POST',
        data: {user_id: user_id, review_id: review_id}
      })
      .done(function(data){
        var newVoteCount = data.vote_count
        review = $("[data-id='"+ data.review_id + "'][class='single-review row']")
        review.find(".vote-count").text(newVoteCount + " votes")
      })
      .fail(function(){
        alert("You can only vote once!")
      })
    } else {
      ENDPOINT.router.navigate("login", true)
      $(".errors").html("You must be logged in to upvote!")
    }
  },

  toggleComments: function(e){
    e.preventDefault();
    console.log("i love yohan")
  },

  render: function(){
    var filledTemplate = this.template(this.model.attributes);
    this.$el.html(filledTemplate)
    var commentsCollection = new ENDPOINT.Collections.Comments({review_id: this.model.attributes.rev.id})
    commentsCollection.set(this.model.attributes.comments)
    var commentsView = new ENDPOINT.Views.Comments({collection: commentsCollection});
    this.$el.find("#comments-area").append(commentsView.render().$el);
    return this;
  }
})

ENDPOINT.Views.Reviews = Backbone.View.extend({
   events: {
    "submit #submit-review": "submitReview",
  },

  template: _.template($("#apireviews-template").html()),
  render: function(){
    var filledTemplate = this.template();
    this.$el.html(filledTemplate);
    var that = this
    this.collection.each(function(reviewModel){
      var reviewView = new ENDPOINT.Views.Review({model: reviewModel, api_id: that.model.attributes.api_id});
      that.$el.find("#tab4").append(reviewView.render().$el);
    })
    return this;
  },

  submitReview: function(event){
    event.preventDefault();
    var reviewData = {title: $("input[name='title']").val(),
                      content: $("textarea[name='content']").val(),
                      score: $("input[name='score']:checked").attr("value"),
                      api_id: this.model.attributes.api_id};
    this.model.save(reviewData).done(function(data){
      var url = "api/" + data.review.api_id;
      ENDPOINT.router.navigate("", true)
      ENDPOINT.router.navigate(url, true)
    });
  }

})