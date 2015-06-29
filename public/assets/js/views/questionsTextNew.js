window.QuestionsTextNew = Backbone.View.extend({
  events: {
    "submit":"validaSubmissao",
    "click #buttonCancelar":"cancelTest",
    "blur .preenche":"verificarCampos",
    "click #txtGrava":"showEqualizer",
  },

  showEqualizer:function(){
    $("#myModaltextRecord").modal("show");

  },


  cancelTest:function(){
    window.history.back();
  },

  validaSubmissao:function(e){

    if ($("#InputDescricao").val().length==0) {
       e.preventDefault();
       //Teste
       //alert("descrição Vaizia");
       return false; //for old browsers
    }
    //adicioinar parametros invisíveis ao form, para tratamento na inserção
    var input = $("<input>").attr("type", "hidden")
                            .attr("name", "profID")
                            .val(window.localStorage.getItem("ProfID"));
    $('#txtNewForm').append($(input));
  },


  initialize: function() {
    var self=this;
  },

  //Martelada à Bruta... Mas funciona.
  verificarCampos: function() {
    var self=this;
    //buscar todos os campos obrigatórios
    var myEl = document.getElementsByClassName('preenche');
    var cont=0;

    //verificar se estão preenchidos
    for(i=0;i<myEl.length; i++){
      if($(myEl[i]).val().length!=0){
        cont++;
      }
    }
    //se todos estão preenchidos, então hbilita o botão de submeter.
    if(cont == myEl.length ){
      //habilitar o botão de submeter
      document.getElementById("subTxt").disabled = false;

    }
    else{
      //senão desabilitar o botão de submeter
      document.getElementById("subTxt").disabled = true;
    }
  },

  render: function() {
    var self=this;

    $(this.el).html(this.template());

    //verificar se está logado
    var controlo=window.localStorage.getItem("Logged");
    if(!controlo){
      console.log('Não Logado');
      app.navigate('/#', {
          trigger: true
        });
        return null;
    }
    var role = ''+window.localStorage.getItem('Role');
    //se não é professor, volta para menuprincipal
    if(role != "Professor"){
        app.navigate('/#', {
          trigger: true
        });
        return null;
    }


    return this;
  }
});
