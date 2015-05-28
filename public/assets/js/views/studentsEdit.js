window.StudentsEdit = Backbone.View.extend({
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
    $(this.el).html(this.template());
    //verificar se está logado
    var controlo=window.localStorage.getItem("Logged");
    if(!controlo){
      console.log('Não Logado');
      app.navigate('/#login', {
          trigger: true
        });
        return null;
    }


    return this;
  }
});
