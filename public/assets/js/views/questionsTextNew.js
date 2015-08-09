window.QuestionsTextNew = Backbone.View.extend({
  events: {
    "submit":"validaSubmissao",
    "click #buttonCancelar":"cancelTest",
    "blur .preenche":"verificarCampos",
    "click #txtGrava":"showEqualizer",
    "click #record":"eGrava",
  },

  eGrava:function(e){
    e.preventDefault();
    var self=this;
    if($("#record").attr("value")==1){
      $("#save").attr("style","color:#80ccee;font-size:16px");
      $("#record").html('<span class="glyphicon glyphicon-record" style="color:#ee0000"></span> Gravar');
      $("#record").attr("value",0);
    }
    else{
      $("#save").attr("style","visibility:hidden");
      $("#record").html('<span class="glyphicon glyphicon-stop" style="color:#ee0000"></span> Parar');
      $("#record").attr("value",1);
      $("#Rplayer").attr("style","visibility:hidden;width:60%");
      $("#Rplayer").stop();
    }

    toggleRecording(e.target);
  },

  showEqualizer:function(e){
    e.preventDefault();
    $("#rTexto").text($("#InputTexto").val());
    $("#myModalRecord").modal("show");
    initAudio();
  },


  cancelTest:function(e){
    e.preventDefault();
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
    self.bd='dev_testes';
    self.bd2='dev_perguntas';
    self.site='http://127.0.0.1:5984';
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

    setTimeout(function(){
      //verificar se está a Clonar
      if(window.sessionStorage.getItem("ClonarTeste")){
        console.log("está a clonar!!");

        self.vaiClonar(window.sessionStorage.getItem("ClonarTeste"));
      }else{
        //desbloquear os inputs
        $("#InputTitulo").attr("disabled",false);
        $("#InputDescricao").attr("disabled",false);
        $("#inputSom").attr("disabled",false);
        $("#InputPergunta").attr("disabled",false);
        $("#InputTexto").attr("disabled",false);
      }

      console.log(window.sessionStorage.getItem("ClonarTeste"));
      window.sessionStorage.removeItem("ClonarTeste");

    },10);
    return this;
  },

  vaiClonar: function(teste){
    var self=this;

    modem('GET', 'tests/'+teste, function(item) {
      $("#InputTitulo").val("Colne de "+item.titulo);
      $("#InputDescricao").val(item.descricao);
      modem('GET', 'questions/'+item.perguntas[0], function(perg) {
        $("#InputPergunta").val(perg.pergunta);
        $("#InputTexto").text(perg.conteudo.texto);
        //disciplina
        switch (perg.disciplina) {
          case "Português":
              document.getElementById("selectDiscip").selectedIndex=0;
            break;
          case "Inglês":
              document.getElementById("selectDiscip").selectedIndex=1;
            break;
          default:
              document.getElementById("selectDiscip").selectedIndex=2;
        }
        //ano escolar
        document.getElementById("selectAno").selectedIndex=(parseInt(perg.anoEscolar) - 1 );

        //################################################################################
        //som
        //Dúvida!!
        //Recolocar o attachment no input!
        //$("#inputSom").val(self.site+'/'+self.bd2+'/'+item._id+'/voz.mp3');
        //################################################################################

        $("#InputTitulo").attr("disabled",false);
        $("#InputDescricao").attr("disabled",false);
        $("#inputSom").attr("disabled",false);
        $("#InputPergunta").attr("disabled",false);
        $("#InputTexto").attr("disabled",false);
      }, function(errQ) {
        console.log('Error getting question '+item.perguntas[0]);
        console.log(errQ);
      });

    }, function(erro) {
      console.log('Error getting test '+teste);
      console.log(erro);
    });
  }
});
