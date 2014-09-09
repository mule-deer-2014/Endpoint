ENDPOINT.Views.Review = Backbone.View.extend({
  template: _.template($("#singlereview-template").html()),

  events: {
    "click .comment-toggler": "toggleComments",
    // "click #submit": "submitReview",
    "click .votes": "upVote"
  },

  //this shit needs to be refactored
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
    $('.comment-area').toggle()
  },

  render: function(){
    var filledTemplate = this.template(this.model.attributes);
    this.$el.html(filledTemplate)
    return this;
  }
})

ENDPOINT.Views.Reviews = Backbone.View.extend({
  template: _.template($("#apireviews-template").html()),

  render: function(){
    $("#app-body").append(this.template());
    this.collection.each(function(reviewModel){
      var reviewView = new ENDPOINT.Views.Review({model: reviewModel});
      $("#tab4").append(reviewView.render().$el);
    });
    $("#submit").click(this.submitReview)
    return this;
  }

})