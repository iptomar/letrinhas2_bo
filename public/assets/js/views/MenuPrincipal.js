

window.MenuPrincipalView = Backbone.View.extend({
  events:{
    "click #menuSair": "Logout",
  },

  initialize: function () {
    //verificar se está logado
    var controlo=window.localStorage.getItem("Logged");
    if(!controlo){
      console.log('Não Logado');
      window.history.back();
    }
    else{
      console.log('Logado'); //guardar variavel
    }
    //criar restrições a opções consoante as permissões do professor.
    
  },

  Logout:function(e){
    e.preventDefault();
    console.log("sair");
    window.localStorage.removeItem("Logged");
    window.localStorage.removeItem("ProfID");
    window.history.back();

  },

  render: function () {
    $(this.el).html(this.template());
    return this;
  },

});
