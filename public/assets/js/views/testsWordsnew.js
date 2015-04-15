window.TestsWordsNewView = Backbone.View.extend({
  events: {
    "click #buttonCancelar": "buttonCancelar",
  
  },
  initialize: function() {},
    
    buttonCancelar: function(e) {
    app.navigate('/MenuPrincipal', {
        trigger: true
      });
    },
    

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

 