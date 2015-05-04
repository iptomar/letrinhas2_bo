window.TestsNewView = Backbone.View.extend({
  events: {
    "click #txtSubmeter": "textSubmeter",
    "click #buttonCancelar": "buttonCancelar",

  },
  initialize: function() {
    var self=this;
    //verificar se está logado
    var controlo=window.localStorage.getItem("Logged");
    if(!controlo){
      console.log('Não Logado');
      window.history.back();
    }
    else{
      console.log('Logado'); //guardar variavel
    }

  },

  textSubmeter: function(e){
    e.preventDefault();
    var self = this;
    console.log("a submeter");


    //1ºcriar a pergunta
    var pergunta = {

    };


    //2ºcriar o teste e adicionar a sua pergunta

    //3º inserir o teste e a pergunta na BD.
  /*  modem('GET', 'tests', function(data) {
      $('#subcontent', self.el).html(JSON.stringify(data));
    }, function(error) {
      console.log('Error getting test list!');
    });
*/
  },

  buttonCancelar: function(e) {
    e.preventDefault();
    //console.log(confirm("cenas de pergunta"));
    if(confirm("Os dados inseridos irão perder-se.\n"
                +"Deseja mesmo sair?")){
      window.history.go(-1);
    }

  },


  render: function() {

    var self = this;

    $(this.el).html(this.template());

    return this;
  }
});
