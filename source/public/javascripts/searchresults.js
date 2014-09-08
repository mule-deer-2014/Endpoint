app.Views = {};
app.Models = {};
app.Collections = {};

app.Models.Search = Backbone.Model.extend({
  initialize: function(opts) {
    this.set({input: opts.query});
  },
  url: '/search'
})

app.Models.SearchResult = Backbone.Model.extend({
})

app.Collections.SearchResults = Backbone.Collection.extend({
  model: app.Models.SearchResult
})

app.Views.SearchResult = Backbone.View.extend({
  template: _.template($('#search-template').html()),
  render: function(){
    compiledTemplate = this.template(this.model.attributes);
    this.$el.html(compiledTemplate);
    return this;
  }
})

app.Views.SearchResults = Backbone.View.extend({
  render: function(){
    $('#app-body').append('<div id="search-list"></div>');
    this.collection.each(function(searchModel){
      var searchView = new app.Views.SearchResult({model: searchModel})
      $("#search-list").append(searchView.render().$el)
    })
    return this
  },

  navigateToProfile: function(){
    event.preventDefault();
    var id = this.dataset.id
    app.router.navigate("api/" + id, true)
  }
})



