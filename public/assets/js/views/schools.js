window.SchoolsView = Backbone.View.extend({
  events: {},
  initialize: function() {},

  render: function() {
    var self = this;
      
    $(this.el).html(this.template());
      
     modem('GET', 'schools', function(data) {
      $('#subcontent', self.el).html(JSON.stringify(data));
    }, function(error) {
      console.log('Error getting school list!');
    });  
      
      
    return this;
  }
});

