window.TeachersNewView = Backbone.View.extend({
  events: {
    "submit":"submeterProfessor",
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


    //1º Buscar o professor pelo e-mail
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
            console.log(json[i].nome+'');
            s+="<option >"+ json[i].nome;
            //e adicionar as turmas...
            s+='<select>';
            for(j=0;j<json[i].turmas.length;j++){
              s+='<option>'+json[i].turmas[j].nome+'</option>';
            }
            s+="  </select></option>";
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

  submeterProfessor: function(e){
    //e.preventDefault();
    console.log("A submeter");
    //1ºverificar se o e-mail é válido
    //2ºse já exite na BD
    //3ºvalidar PIN
    //4ªvalidar Telefone
    //5ºverificar a foto, se não tiver atribuir uma por defeito, consoante o género
    //e por fim submeter..
    //teste na submissão: ######################################################
    //verificar o estado:
    var estado;
    if($("#selectEstado").selected==0) estado=true;
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

    return true;
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
