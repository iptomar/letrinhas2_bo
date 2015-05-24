window.TeachersNewView = Backbone.View.extend({
  events: {
    //"submit":"submeterProfessor",
    //"click #subProf":"submeterProfessor",
    "click #buttonCancelar": "buttonCancelar",
    "blur .preenche":"verificarCampos",
    "blur #InputEmail":"verificarMail",
    "focus .preenche":"disabelSub",
    "click #addEscola":"addTurma",
    "click #limpaTurmas":"limpaTurmas",
    "mouseover #pwdIcon":"verPwd",
    "mouseout #pwdIcon":"escondePwd",
    "keyup #ConfirmPasswd": "confirmPwd",
    "focus #InputPasswd":"limpapwds",
    "change #inputFoto": "carregFoto",


  },

  disabelSub: function(){
   console.log("focus");
   document.getElementById("subProf").disabled = true;
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

  carregFoto:function(){
    if($("#inputFoto").val().length >0 ){
      $("#iFoto").attr("src","../img/inConstruction.jpg");
      $("#iFoto").attr("style"," width:200px; display:show");

    }
    else{
      $("#iFoto").attr("style","display:none");
    }
  },

  limpaTurmas: function(){
    //esconder o select escola e o limpar
    $("#selectEscola").attr('style','display:none');
    $("#limpaTurmas").attr("style","display:none");
    //mostra o adicionar turma
    $("#addEscola").attr("style","display:show");
    //limpa as turmas escolhidas
    $("#assocTurma").html('');
    //limpa os ids.
    $("#hidden2").val('');
    console.log("size input: "+$("#hidden2").val().length);
  },

  confirmPwd:function(){
    if($("#InputPasswd").val()==$("#ConfirmPasswd").val()){
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

  verificarMail: function(){
    var self=this;
    document.getElementById("subProf").disabled = true;
    var mail = $("#InputEmail").val();
    var placeHolder = $("#InputEmail").attr("placeholder");
    $("#InputEmail").val('');
    $("#InputEmail").attr("placeholder",mail);
    $("#imgMail").attr("style","display:show");

    //Verificar se mail já existe na BD se já exite na BD
    modem('GET', 'teachers/'+mail,
        function (json) {
          $("#lblMAil").attr("style","color:#ff0000");
          $("#lblMAil").text('Email: "'+mail+'" já consta na Base de Dados!');
          $("#InputEmail").attr("placeholder",placeHolder);
          $("#imgMail").attr("style","display:none");
        },
        function (xhr, ajaxOptions, thrownError) {
          var json = JSON.parse(xhr.responseText);
          console.log("\nErro:\n")
          console.log(json.message.error);
          console.log(json.result);
          $("#lblMAil").text('Email:');
          $("#lblMAil").attr("style","color:#000000");
          $("#InputEmail").val(mail);
          $("#InputEmail").attr("placeholder",placeHolder);
          $("#imgMail").attr("style","display:none");
          self.verificarCampos();
        }
      );
  },

  submeterProfessor: function(e){
    var estado;
    if($("#selectEstado").val()=="Ativo") estado=true;
    else estado = false;
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
                  +this.options[i].value+'; </span><br>';
            $("#assocTurma").append(v);

            //addicionar os id's necessários de escola:turma;
            var r=$("#hidden2").val();
            r+=hidden.options[i].value+':'+hidden.options[i].text+';';
            $("#hidden2").val(r);

            //esconder o select
            $("#selectEscola").attr('style','display:none');
            //mostra o botão add e limpar
            $("#addEscola").attr("style","display:show");
            $("#limpaTurmas").attr("style","display:show");

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
