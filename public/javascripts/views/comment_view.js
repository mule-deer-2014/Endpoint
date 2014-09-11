ENDPOINT.Views.Comment = Backbone.View.extend({
  template: _.template($("#comment-template").html()),

  render: function(){
    var filledTemplate = this.template(this.model.attributes);
    this.$el.html(filledTemplate)
    return this;
  }
})