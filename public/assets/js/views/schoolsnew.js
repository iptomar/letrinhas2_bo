window.SchoolsNew = Backbone.View.extend({
  events: {
    "click #buttonCancelar": "buttonCancelarEscola",
    "change #inputFoto": "carregFoto",
    "change .preenche":"verificarCampos",
    "focus .preenche":"disabelSub",
    "click #createTurma":"showTurmaForm",
    "click #addTurma":"newTurma",
    "click #cancelTurma":"hideTurmaForm",
    "keyup #InputNomeTurma": "confirmNameTurma",

  },

  confirmNameTurma: function(){
    if($("#InputNomeTurma").val().length > 0){
      $("#addTurma").attr("disabled",false);
    }
    else{
      $("#addTurma").attr("disabled",true);
    }
  },

  newTurma:function(){
    var self=this;
    var myEl = document.getElementById('selectAno');
    var indx = myEl.selectedIndex;
    var turmaAno= myEl.options[indx].text+', '+$("#InputNomeTurma").val();

    indx = $("#nTurmas").val();
    indx++;
    $("#nTurmas").val(indx);
    var d = '<input type="text" id="anoTrm'+indx+'" class="form-control" name="anoturm'+indx+'">'
            +'<input type="text" id="trm'+indx+'" class="form-control" name="nomTurm'+indx+'">';
    $("#hiddenListaTurmas").append(d);

    var s = '<br><label id="lb'+indx+'">'+turmaAno+'</label>'
            +'<a id="bt'+indx+'" class="glyphicon glyphicon-trash" align="right" style="width:30px; color:#dd0000"></a>';

    $("#listaTurmas").append(s);


    d= '#anoTrm'+indx;
    $(d).val(myEl.options[indx].value);

    d= '#trm'+indx;
    $(d).val($("#InputNomeTurma").val());

/*
myEl.addEventListener('change', function() {
  var i = this.selectedIndex;
  //igualar os indexes
  var hidden = document.getElementById('hidenTurma');
  hidden.selectedIndex = i;
  //addicionar os id's necessários de escola:turma;
  var r=hidden.options[i].value+':'+hidden.options[i].text+';';
  $("#hidenIDTurma").val(r);


<div id="hiddenListaTurmas" style="display:none">
  <input type="number" id="nTurmas" class="form-control" name="nTurmas">
</div>

*/


    self.hideTurmaForm();
  },

  hideTurmaForm:function(){
    var self=this;
    $("#createTurma").attr("style","display:show");
    $("#checkTurma").attr("style","display:none");
    $("#formTurma").attr("style","display:none");
    self.verificarCampos();
  },

  showTurmaForm:function(){
    $("#createTurma").attr("style","display:none");
    $("#checkTurma").attr("style","display:show");
    $("#formTurma").attr("style","display:show");
    $("#addTurma").attr("disabled",true);
    document.getElementById("subEscola").disabled = true;

  },


  initialize: function() {
    var self=this;

  },

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
      document.getElementById("subEscola").disabled = false;
    }
    else{
      //senão desabilitar o botão de submeter
      document.getElementById("subEscola").disabled = true;
    }
  },

  carregFoto:function(e){
    var self=this;
    if($("#inputFoto").val().length >0 ){
      var tmppath = URL.createObjectURL(e.target.files[0]);
      $("#iFoto").attr("src",tmppath);
      $("#iFoto").attr("style"," width:230px; display:show");

    }
    else{
      $("#iFoto").attr("style","display:none");
    }
  },

  buttonCancelarEscola: function(e) {
    e.preventDefault();
    window.history.back();
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});
