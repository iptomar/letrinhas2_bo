window.TestsNewView = Backbone.View.extend({
  events: {},
  initialize: function() {},

  render: function() {
      
    var self = this;
      
    $(this.el).html(this.template());
      
    modem('GET', 'tests', function(data) {
      $('#subcontent', self.el).html(JSON.stringify(data));
    }, function(error) {
      console.log('Error getting test list!');
    });    
      
      
    return this;
  }
});



 