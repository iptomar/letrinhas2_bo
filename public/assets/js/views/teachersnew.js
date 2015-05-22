window.TeachersNewView = Backbone.View.extend({
  events: {
    //"submit":"submeterProfessor",
    //"click #subProf":"submeterProfessor",
    "click #buttonCancelar": "buttonCancelar",
    //"blur #InputEmail":"verificaMail",
    "click #addEscola":"addTurma",
    "mouseover #pwdIcon":"verPwd",
    "mouseout #pwdIcon":"escondePwd",
    "keyup #ConfirmPasswd": "confirmPwd",
    "focus #InputPasswd":"limpapwds",



  },

  confirmPwd:function(){
    if($("#InputPasswd").val()==$("#ConfirmPasswd").val()){
      console.log("iguais");
      $("#confIcon").addClass("glyphicon-ok");
      $("#confIcon").removeClass("glyphicon-remove");
      $("#confIcon").attr("style","color:#66dd66");
    }
    else{
      $("#confIcon").addClass("glyphicon-remove");
      $("#confIcon").removeClass("glyphicon-ok");
      $("#confIcon").attr("style","color:#dd6666");

    }
  },

  limpapwds:function(){
    $("#ConfirmPasswd").val('');
    $("#InputPasswd").val('');
    $("#confIcon").removeClass("glyphicon-ok");
    $("#confIcon").removeClass("glyphicon-remove");
  },

  escondePwd:function(){
    $("#pwdIcon").attr("style","color:#cccccc");
    $("#InputPasswd").attr("type","password");
  },
  verPwd:function(){
    $("#pwdIcon").attr("style","color:#66cc66");
    $("#InputPasswd").attr("type","text");

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
      //para fazer update às escolas selecionadas e respetivas turmas,
      //caso seja submetido o formulário
    }


  },

  addTurma:function(){
    $("#selectEscola").attr("style","display:show");
    $("#addEscola").attr("style","display:none");
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
    var sefl=this;


    $(this.el).html(this.template());
    //Teste de associar a(s) turmas ao professor.
    modem('GET', 'schools',
        function (json) {
          // Preencher o select escola, com as escolas existentes e respetivas turmas:
          //e o select que vai ajudar a devolver os ID's ao form e fazer a correta atualização na escola
          var s='<select class="form-control" id="selectTurma">';
          var d='<select id="hiddenTurma">';
          for(i=0; i<json.length; i++){
            s+="<optgroup label="+ json[i].doc.nome+'>';
            //e adicionar as turmas...

            for(j=0;j<json[i].doc.turmas.length;j++){
              s+='<option value="'+json[i].doc.nome+'">'+json[i].doc.turmas[j].nome+'</option>';
              d+='<option value="'+json[i].doc._id+'">'+json[i].doc.turmas[j]._id+'</option>';
            }
            s+="</optgroup>";
          }
          s+="</select>";
          d+="</select><input type='text' id='hidden2'  class='form-control' name='turmas' style='display:none'>";

          $("#selectEscola").html(s);
          $("#hiddenEscola").html(d);
          //no hidden, contém no value o id da escola
          //e no text o id da turma.

          //adicionar os eventos para o select da turma.
          var myEl = document.getElementById('selectTurma');
          myEl.addEventListener('change', function() {
            var i = this.selectedIndex;
            //igualar os indexes
            var hidden = document.getElementById('hiddenTurma');
            hidden.selectedIndex = i;
            //apresentar a turma escolhida
            var v='<label> - '+this.options[i].text+'</label><span>, '
                  +this.options[i].value+'; </span>';
            $("#assocTurma").append(v);

            var r=$("#hidden2").val();
            r+=hidden.options[i].value+':'+hidden.options[i].text+';';
            console.log(r);
            $("#hidden2").val(r);

            console.log($("#hidden2").val());

            //esconder o select

            $("#selectEscola").attr('style','display:none');
            //mostra o botão
            $("#addEscola").attr("style","display:show");

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
