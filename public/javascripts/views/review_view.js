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