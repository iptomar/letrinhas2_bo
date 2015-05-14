window.SchoolsNew = Backbone.View.extend({
  events: {"click #buttonCancelar": "buttonCancelarEscola",



  },
  initialize: function() {},

    buttonCancelarEscola: function(e) {
    e.preventDefault();
    window.history.back();
  },
    
  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});
