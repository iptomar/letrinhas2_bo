

window.MenuPrincipalView = Backbone.View.extend({
  events:{
    "click #menuSair": "Logout",
  },

  initialize: function () {
    var self=this;

  },

  Logout:function(e){
    e.preventDefault();
    console.log("sair");
    window.localStorage.removeItem("Logged");
    window.localStorage.removeItem("ProfID");
    window.localStorage.removeItem("Roll");
    window.history.back();

  },

  render: function () {
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
      console.log('Logado'); //guardar variavel
    //criar restrições a opções consoante as permissões do professor.




    return this;
  },

});
