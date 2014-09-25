ENDPOINT.Views.UserProfile = Backbone.View.extend({
  model: ENDPOINT.Models.UserProfile,

  template: _.template($('#user-profile-template').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes.user));
    $("#app-body").append(this.$el);
    return this;
  },
})