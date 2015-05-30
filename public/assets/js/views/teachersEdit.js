window.TeachersEditView = Backbone.View.extend({
  events: {
    "submit":"submitEdition",


  },

  submitEdition:function(e){
    //mudar a ação para o professor a editar
    e.target.action="/teachers/"+window.sessionStorage.getItem("ProfEditar");
    window.sessionStorage.remove("ProfEditar");
  },

  initialize: function() {
    var self=this;

  },

  render: function() {
    var self = this;
    //verificar se está logado
    var controlo=window.localStorage.getItem("Logged");
    if(!controlo){
      console.log('Não Logado');
      app.navigate('/#login', {
          trigger: true
        });
        return null;
    }

    $(this.el).html(this.template());

    modem('GET', 'teachers/'+window.sessionStorage.getItem("ProfEditar"), function(data) {
      $('#subcontent', self.el).html(JSON.stringify(data));
    }, function(error) {
      console.log('Error getting teacher list!');
    });

    console.log(document.getElementById("profEditForm"));


    return this;
  }
});
