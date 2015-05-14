window.StudentsNewView = Backbone.View.extend({
  events: {
      "click #buttonCancelar": "buttonCancelarAluno",
  
  
  
  },
  initialize: function() {},
    
buttonCancelarAluno: function(e) {
    e.preventDefault();
    window.history.back();
  },
    
    
    
    
  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});
