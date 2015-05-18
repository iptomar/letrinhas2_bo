window.QuestionsTextNew = Backbone.View.extend({
  events: {
    "submit":"validaSubmissao",
    "click #buttonCancelar":"cancelTest",
    "blur .preenche":"verificarCampos",

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
    } else{

      app.navigate('/tests', {
          trigger: true
        });


       //form was OK - you can add some pre-send script in here
    }



  },


  initialize: function() {
    var self=this;
  },

  //Martelada à Bruta...
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
      //adicioinar parametros invisíveis ao form, para tratamento na inserção
      var input = $("<input>").attr("type", "hidden")
                              .attr("name", "profID")
                              .val(window.localStorage.getItem("ProfID"));
      $('#txtNewForm').append($(input));
    }
    else{
      //senão desabilitar o botão de submeter
      document.getElementById("subTxt").disabled = true;
    }
  },

  render: function() {
    var self=this;

    $(this.el).html(this.template());


    return this;
  }
});
