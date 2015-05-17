window.TeachersNewView = Backbone.View.extend({
  events: {
    //"submit":"submeterProfessor",
    "click #subProf":"submeterProfessor",
    "click #buttonCancelar": "buttonCancelar",
    "blur #InputEmail":"verificaMail",
    "click #addEscola":"addTurma",



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

  },

  addTurma:function(){
    $("#selectEscola").attr("style","visibility:initial");
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
    window.history.back();
  },

  render: function() {
    $(this.el).html(this.template());

    //Teste de associar a(s) turmas ao professor.
    modem('GET', 'schools',
        function (json) {
          // Preencher o select escola, com as escolas existentes e respetivas turmas:
          //e o select que vai ajudar a devolver os ID's ao form e vazer a correta atualização na escola

          console.log("nº de escolas: ", json.length);
          var s='<select id="selectTurma">';
          var d='<select id="hiddenTurma">';
          for(i=0; i<json.length; i++){
            console.log(json[i].doc.nome);
            s+="<optgroup label="+ json[i].doc.nome+'>';
            //e adicionar as turmas...

            for(j=0;j<json[i].doc.turmas.length;j++){
              s+='<option value="'+json[i].doc.nome+'">'+json[i].doc.turmas[j].nome+'</option>';
              d+='<option value="'+json[i].doc._id+'">'+json[i].doc.turmas[j]._id+'</option>';
              console.log(json[i].doc.turmas[j].nome);
            }
            s+="</optgroup>";
          }
          s+="</select>";
          d+="</select>";

          $("#selectEscola").html(s);
          $("#hiddenEscola").html(d);

          //adicionar os eventos para o select da turma.
          var myEl = document.getElementById('selectTurma');
          myEl.addEventListener('change', function() {
            var i = this.selectedIndex;
            //igualar os indexes
            document.getElementById('hiddenEscola').selectedIndex = i;
            //apresentar a turma escolhida
            var v='<label> - '+this.options[i].text+'</label><span>, '
                  +this.options[i].value+'; </span>'
            $("#assocTurma").append(v);

            //esconder o select
            $("#selectEscola").attr('style','visibility:hidden');

          }, false);


        },

        function (xhr, ajaxOptions, thrownError) {
          var json = JSON.parse(xhr.responseText);
          console.log("\nErro:\n")
          console.log(json.message.error);
          console.log(json.result);
        }
      );







    return this;
  }

});
