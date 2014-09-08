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
app.ApiProfile.Models.Reviews = Backbone.Model.extend({

  initialize: function(){
  },

  defaults: {
    "content": "I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! I love this API! ",
    "created_at": "9/12/14",
    "comment_content": "Dudes, WTF are you talking about, this API sucks, they have 0 docs >:/",
    "votes": "4",
    "user_photo_url": "http://gravatar.com/avatar.jpg"
  }

})

app.ApiProfile.Views.Reviews = Backbone.View.extend({
  events: {
    "click #upvote": "upVote"
  },
  model: new app.ApiProfile.Models.Reviews,

  initialize: function(){
  },

  template: _.template($('#apireviews-template').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
})
