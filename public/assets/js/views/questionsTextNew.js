window.QuestionsTextNew = Backbone.View.extend({
  events: {
    "submit":"validaSubmissao",
    "blur .preenche":"verificarCampos",

  },

  validaSubmissao:function(e){
    if ($("#InputDescricao").val().length==0) {
       e.preventDefault();
       alert("descrição Vaizia");
       return false; //for old browsers
    } else{


       //form was OK - you can add some pre-send script in here
    }

    //$(this).submit();
    //you don't have to submit manually if you didn't prevent the default event before


    console.log("A submeter...");

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
      document.getElementById("subProf").disabled = false;
      //adicioinar parametros invisíveis ao form, para tratamento na inserção
      var input = $("<input>").attr("type", "hidden")
                              .attr("name", "profID")
                              .val(window.localStorage.getItem("ProfID"));
      $('#txtNewForm').append($(input));
    }
    else{
      //senão desabilitar o botão de submeter
      document.getElementById("subProf").disabled = true;
    }
  },

  render: function() {
    var self=this;

    $(this.el).html(this.template());


    return this;
  }
});
