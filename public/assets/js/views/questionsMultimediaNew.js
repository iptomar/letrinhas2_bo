window.QuestionsMultimediaNew = Backbone.View.extend({
  events: {
    "click #criarPerg":"showCriar",
    "click #aproveitarPerg":"showModalperguntas",
    "click #tipPText":"perguntaTexto",
    "click #tipPImg":"perguntaImg",
    "click #tipRText":"respostaTexto",
    "click #tipRImg":"respostaImg",
    "click #tipPAudio":"perguntaAudio",
    "click #add":"addLista",

    "change #InputPerguntaImg":"verpergImg",
    "change #InputPerguntaAudio":"verpergAudio",
    "change .actLista":"getPerguntas",

    "dblclick .pergunta":"showPergunta",

  },

  addLista:function(e) {
    var self=this;
    var lista1 = document.getElementById("listMultQuestions");
    var lista2 = document.getElementById("newlistMultQuestions");
    var indx = 0;

    for(i=0; i< lista1.length; i++){
      if(lista1.options[i].selected == true){
        $("#newlistMultQuestions").append(lista1.options[i]);
        $("#listMultQuestions").remove(i);//options[i]=null;

        console.log("selecionado");
        
      }
      else {
        console.log("Não selecionado");
      }
    }
  },

  showPergunta:function(e){
    alert("Pré-visualização ainda não disponivel");
  },

  showCriar:function(e){
    e.preventDefault();
    $("#panelCriar").attr("style","visibility:innitial");
    $("#criarPerg").attr("style","display:none");
    $("#aproveitarPerg").attr("style","display:none");

  },
  showModalperguntas:function(e){
    e.preventDefault();
  },


  //Perguntas
  perguntaTexto: function(){
    var s='';
      s='<input type="text" class="form-control preenche" id="InputPerguntaTxt" placeholder="Ex: 5 + 5 - 2 = ?" name="pergunta">';
    $("#pergContent").html(s);
  },

  perguntaImg: function(){
    var s='';
      s= '<input type="file" class="perg-control preenche" id="InputPerguntaImg" name="pergunta">'
        +'<img id="imgPrg" src="" style="max-height:100px;">';

    $("#pergContent").html(s);

  },

  perguntaAudio: function(){
    var s='';
      s='<input type="file" class="perg-control preenche" id="InputPerguntaImg" name="pergunta">'
        +'<audio id="playPlayer" style="" controls></audio>';
    $("#pergContent").html(s);

  },

  //Respostas
  respostaTexto: function(){
    var self=this;
    var s='';
      s= '<div class="col-sm-5" >'
          +'<label for="InputRespTxt0">Resposta Correta:</label>'
        +'</div>'
        +'<div class="col-sm-5">'
          +'<input type="text" class="form-control preenche" id="InputRespTxt0" placeholder="Ex: 8" name="resposta0">'
        +'</div>'
        +'<div class="col-sm-5">'
          +'<label for="InputRespTxt1">1ª Resposta Errada:</label>'
        +'</div>'
        +'<div class="col-sm-5">'
          +'<input type="text" class="form-control preenche" id="InputRespTxt1" placeholder="Ex: 9" name="resposta1">'
        +'</div>'
        +'<span id="testBadge"class="badge btn" style="background-color:#00cc00"><span class="glyphicon glyphicon-plus"></span></span>';
    $("#respContent").html(s);
  },

  respostaImg: function(){
    var self=this;
    var s='';
      s= '<label for="InputRespImg0">Resposta Correta:</label>'
        +'<input type="file" class="perg-control preenche" id="InputRespImg0" name="resposta0">'
        +'<img id="imgPrg" src="" style="max-height:100px;">';

    $("#respContent").html(s);

  },


  initialize: function() {},

  render: function() {
    var self=this;

    $(this.el).html(this.template());
    //verificar se está logado
    var controlo=window.localStorage.getItem("Logged");
    if(!controlo){
      console.log('Não Logado');
      app.navigate('/#login', {
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

    if("1º"<"2º") console.log("menor");
    else console.log("tretas");

    self.getPerguntas();
    return this;
  },

  getPerguntas:function(){
    //Modem para consultar as questões do tipo multimédia da disciplina seleccionada e ano escolar
    //Constrir as opções
    modem('GET', '/questions', function(data) {
      //limpar lista
      var list = document.getElementById("listMultQuestions");
      for(i=0; i< list.length; list.remove(0));

      //Aplicar o filtro
      var lista = new Array();
      var selAno = document.getElementById("selectAno");
      var ind = selAno.selectedIndex;

      var selDiscip = document.getElementById("selectDiscip");
      var ind2 = selDiscip.selectedIndex;
      var nOpt=0;

      for(i=0; i<data.length; i++){
        //por tipo, ano e disciplina
        console.log(data[i].doc.anoEscolar);
        console.log(data[i].doc.disciplina);
        if( //data[i].doc.tipoTeste == "Multimédia" &&
          data[i].doc.anoEscolar <= selAno.item(ind).text &&
          data[i].doc.disciplina == selDiscip.item(ind2).text){
            console.log("Iguais");
            var opt='';

            var date = new Date(data[i].doc.dataCri);
            var day = date.getDate().toString();
            var month = date.getMonth().toString();
            var year = date.getFullYear().toString();
            var hours = date.getHours().toString();
            var minutes = date.getMinutes().toString();
            day = day.length === 2 ? day : '0' + day;
            month = month.length === 2 ? month : '0' + month;
            hours = hours.length === 2 ? hours : '0' + hours;
            minutes = minutes.length === 2 ? minutes : '0' + minutes;

            opt='<option id="'+data[i].doc._id+'" class="pergunta"> > '
                +data[i].doc.titulo+' - '+day+'.'+month+'.'+year+'</option>';
            nOpt++;
            $("#listMultQuestions").append(opt);
          }
          else{
            console.log("Diferentes");
          }
          $("#multBadge").text(nOpt);
      }

    }, function(error) {
      console.log('Error getting questions list!');
    });
  },
});
