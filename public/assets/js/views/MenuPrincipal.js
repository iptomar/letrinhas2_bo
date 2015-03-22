

window.MenuPrincipalView = Backbone.View.extend({
  events:{
        //"click #buttonEntrar": "buttonEntrar",
  },
  initialize: function () {
  },
    
    /*
    buttonEntrar: function(e) {
    app.navigate('/MenuPrincipal', {
        trigger: true
      });
    },
    */
    
  render: function () {
    $(this.el).html(this.template());
    return this;
  }

});
