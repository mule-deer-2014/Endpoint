app.ApiProfile = {
  Models: {},
  Collections: {},
  Views: {}
}

app.ApiProfile.Models.Profile = Backbone.Model.extend({

  urlRoot: '/apis/:id',

  initialize: function(){
  },

  defaults: {
    "title": "",
    "description": "",
    "tips": "",
    "average_score": "",
    "logo_url": "",
    "data_type": "",
    "doc_link": "",
    "endpoint_link": "",
    "num_followers": 0,
  }
})

app.ApiProfile.Views.Profile = Backbone.View.extend({
  model: app.ApiProfile.Models.Profile,

  initialize: function(opts){
    this.id = opts.id
  },

  template: _.template($('#apiprofile-template').html()),

  render: function() {
    var apiObject = new this.model
    var that = this;
    $.ajax({
      url:'/apis/' + this.id,
      success: function(result){
        apiObject.set(result.api);
        that.$el.html(that.template(apiObject.attributes));
      }
    })
    return this;
  },
})

/////////////// Reviews Section
app.ApiProfile.Models.Review = Backbone.Model.extend({

  initialize: function(){
  },

  defaults: {
    "score": "",
    "content": "",
    "title": "",
    "created_at": "",
    "user_id": "",
    "user_photo_url": "",
    "comment_content": ""
  }
})


app.ApiProfile.Views.Reviews = Backbone.View.extend({

  
  model: app.ApiProfile.Models.Review,

  events: {
    "click .vote": "upVote",
    "click .comment-toggler": "toggleComments",
    "click #submit": "submitReview"
  },


  initialize: function(opts){
    this.id = opts.id
  },


  upVote: function(){
    var cookie = $.cookie()
    if (jQuery.isEmptyObject(cookie)) {
      alert("not valid cookie");
    } else { 
      console.log("YOLO");
      var user_id = $.cookie("user_id");
      var that = this;
      $.ajax({
        url: '/reviews/'+ that.id +'/votes',
        type: 'POST',
        data: {user_id: user_id, review_id: that.id},
      })
      .done(function(data) {
        debugger
        var newVoteCount = data.vote_count
        // NEED SOMEWHERE TO FIND THE CORRECT VOTECOUNT CLASS!!!!!!!!!!!!!!!!!!!!
        $(".vote-count").text(newVoteCount)
      }.bind(this))
    }   
  },


  toggleComments: function(e){
    e.preventDefault();
    $('.comment-area').toggle()
  },

  reviewsTemplate: _.template($('#apireviews-template').html()),
  singleReviewTemplate: _.template($('#singlereview-template').html()),
  
  render: function() {
    var reviewObject = new this.model;
    var that = this;
    Backbone.ajax({
    url: '/apis/' + that.id + '/reviews',
    type: 'GET'
    }).done(function(data){
      allReviewsHTML = ""
      for(var i=0; i< data.reviews.length; i++){
        reviewObject.set(data.reviews[i]);
        var templates = that.$el.html(that.singleReviewTemplate(reviewObject.attributes));
        allReviewsHTML += templates[0].innerHTML
      };

      $("#app-body").append(that.$el.html(that.reviewsTemplate()));
      $("#tab4").append(allReviewsHTML);
    })
  },

  submitReview: function(){
    event.preventDefault();
    Backbone.ajax({
    url: '/apis/' + this.id + '/reviews',
    type: 'POST',
    data: $('.reviewSubmission').serialize()
    }).done(function(data){
      console.log('success');
      $('.feedback-success').toggle()
    }).fail(function(){
      console.log(errors)
    });
  }
})


