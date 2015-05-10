window.TeachersNewView = Backbone.View.extend({
  events: {
    //"submit":"submeterProfessor",
    "click #subProf":"submeterProfessor",
    "click #buttonCancelar": "buttonCancelar",
    "blur #InputEmail":"verificaMail",



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
    //para fazer update às escolas selecionadas e respetivas turmas,
    //caso seja submetido o formulário
    var turmas = new Array();


    //Teste de preencher o dropDown para selecção da escola.
    modem('GET', 'schools',
        function (json) {
          // Preencher o select escola, com as escolas existentes e respetivas turmas:
          // PROBLEMAS!!! o Array de objetos devolvido existe, mas ao aceder a
          // um campo este aparece como um undefined
          // Consultar o professor Dias...
          //
          console.log("nº de escolas: ", json.length);
          var s='';
          for(i=0; i<json.length; i++){
            console.log(json[i].doc.nome);
            s+="<option >"+ json[i].doc.nome;
            //e adicionar as turmas...
            s+='<select>';
            for(j=0;j<json[i].doc.turmas.length;j++){
              s+='<option>'+json[i].doc.turmas[j].nome+'</option>';
              console.log(json[i].doc.turmas[j].nome);
            }
            s+="</select>";
            s+="</option>";
          }
          $("#selectEscola").html(s);
        },

        function (xhr, ajaxOptions, thrownError) {
          var json = JSON.parse(xhr.responseText);
          console.log("\nErro:\n")
          console.log(json.message.error);
          console.log(json.result);
        }
      );

  },

  verificaMail: function(){

    console.log("A verificar mail...");

    //1ºverificar se o e-mail é válido
    //2ºse já exite na BD
  },

  submeterProfessor: function(e){
    //e.preventDefault();
    console.log("A submeter");


    //1ªvalidar Telefone
    //2ºverificar a foto, se não tiver atribuir uma por defeito, consoante o género
    //e por fim submeter??.
    //Insert no professores, com foto, se possível.
    //vários Updates das Escolas/ Turmas associadas

    //teste na submissão: ######################################################
    //verificar o estado:
    var estado;
    if($("#selectEstado").val()=="Ativo") estado=true;
    else estado = false;


  /*  var prof={
      '_id': $("#InputEmail").text(),
      'nome': $("#InputNome").text(),
      'telefone': $("#InputTelefone"),
      'password': $("#InputPasswd"),
      'pin': $("#inputPin"),
      'estado': estado,
      'tipo': $("#selectTipo").selected,
    };
    try{
      modem('POST','teachers', prof,null);
    }
    catch (err) {
      console.log(err.message);
      alert("Ocorreu um erro na inserção do utilizador na BD, tente mais tarde.");
      window.history.back();
    }*/
    // fim de teste na submissão: ###### ERRO ##################################
    return false;
  },

  buttonCancelar: function(e) {
    e.preventDefault();
    app.navigate('/MenuPrincipal', {
        trigger: true
      });
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  }

});
