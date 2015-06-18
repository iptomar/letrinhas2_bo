window.QuestionsMultimediaNew = Backbone.View.extend({
  events: {
    "click #criarPerg":"showCriar",
    "click #aproveitarPerg":"showEditar",

    "click #tipPText":"perguntaTexto",
    "click #tipPImg":"perguntaImg",
    "click #tipPAudio":"perguntaAudio",

    "click #tipRText":"respostaTexto",
    "click #tipRImg":"respostaImg",
    "click #testBadge":"addCrResposta",
    "click #testBadge2":"removeCrResposta",


    "click #add":"addLista",
    "click #remove":"removeLista",
    "click #up":"cima",
    "click #down":"baixo",
    "click #btnPergCriar":"subNPerg",
    "click #btnPergAlter":"subAPerg",


    "change #InputPerguntaImg":"verpergImg",
    "change #InputPerguntaAudio":"verpergAudio",
    "change .actLista":"getPerguntas",

    "dblclick .pergunta":"showPergunta",

  },

  removeCrResposta:function(e){
    var self=this;
    if(self.nRespostas>2){
      self.nRespostas--;
      $("#lbl"+self.nRespostas).remove();
      $("#inpt"+self.nRespostas).remove();
      if(self.nRespostas==2){
        $("#testBadge2").remove();
      }
    }
  },

  addCrResposta:function(e){
    var self = this;
    console.log(self.nRespostas);
    if(self.nRespostas<4){
      var s='';
      self.tipoR="txt";

      switch (self.tipoR) {
        case "txt":
          s='<div class="col-sm-5" id="lbl'+self.nRespostas+'">'
            +'<label for="InputRespTxt'+self.nRespostas+'">'+self.nRespostas+'ª Resposta Errada:</label>'
          +'</div>'
          +'<div class="col-sm-5" id="inpt'+self.nRespostas+'">'
            +'<input type="text" class="form-control preenche" id="InputRespTxt'+self.nRespostas+'" placeholder="Ex: '+parseInt(Math.random()*100)+'" name="resposta'+self.nRespostas+'">'
          +'</div>';
          self.nRespostas++;
          break;
        case "img":

          break;
        default:

      }

      if(self.nRespostas==3){
        s+='<span id="testBadge2"class="badge btn" style="background-color:#cc0000"><span class="glyphicon glyphicon-minus"></span></span>';
      }
      if(self.nRespostas)
      $("#respContent").append(s);
    }


  },


  subNPerg:function(e){
    $("#multimNewPergForm").submit();
  },

  subAPerg:function(e){
    $("#multimEditPergForm").submit();
  },

  cima:function(e){
    var lista1 = document.getElementById("newlistMultQuestions");
    var indx = lista1.selectedIndex;
    console.log(indx);
    if(indx>0){
      lista1.options[indx].selected=false;
      var val = lista1.options[indx].value;
      var txt = lista1.options[indx].text;
      lista1.options[indx].value = lista1.options[indx-1].value;
      lista1.options[indx].text = lista1.options[indx-1].text;
      lista1.options[indx-1 ].value = val;
      lista1.options[indx-1 ].text = txt;
      lista1.options[indx-1].selected=true;
    }
  },

  baixo:function(e){
    var lista1 = document.getElementById("newlistMultQuestions");
    var indx = lista1.selectedIndex;
    if(indx< lista1.length-1 && indx>(-1)){
      lista1.options[indx].selected=false;
      var val = lista1.options[indx].value;
      var txt = lista1.options[indx].text;
      lista1.options[indx].value = lista1.options[indx+1].value;
      lista1.options[indx].text = lista1.options[indx+1].text;
      lista1.options[indx+1 ].value = val;
      lista1.options[indx+1 ].text = txt;
      lista1.options[indx+1].selected=true;
    }
  },

  addLista:function(e) {
    var self=this;
    var lista1 = document.getElementById("listMultQuestions");
    var lista2 = document.getElementById("newlistMultQuestions");

    for(i=(lista1.length-1); i> (-1); i--){
      if(lista1.options[i].selected == true){
        var podePassar = true;
        lista1.options[i].selected = false;
        for(j=0; j< lista2.length; j++){
          if(lista2.options[j].value==lista1.options[i].value){
            podePassar=false;
          }
        }
        if(podePassar){
          $("#newlistMultQuestions").append(lista1.options[i]);
        }
      }
    }
    $("#multBadge").text(lista1.length);
    $("#multBadge2").text(lista2.length);
  },

  removeLista:function(e) {
    var self=this;
    var lista1 = document.getElementById("newlistMultQuestions");
    var lista2 = document.getElementById("listMultQuestions");
    for(i=(lista1.length-1); i> (-1); i--){
      if(lista1.options[i].selected == true){
        var podePassar = true;
        lista1.options[i].selected = false;
        for(j=0; j< lista2.length; j++){
          if(lista2.options[j].value==lista1.options[i].value){
            podePassar=false;
            lista1.options[i]=null;
          }
        }
        if(podePassar){
          $("#listMultQuestions").append(lista1.options[i]);
        }
      }
    }
    $("#multBadge").text(lista2.length);
    $("#multBadge2").text(lista1.length);
  },

  showPergunta:function(e){
    $("#pergPreview").modal("show");
  },

  showCriar:function(e){
    e.preventDefault();
    $("#createPerg").modal("show");

  },
  showEditar:function(e){
    e.preventDefault();
    $("#editPerg").modal("show");
  },


  //Perguntas
  perguntaTexto: function(){
    var s='';
      s='<input type="text" class="form-control preenche" id="InputPerguntaTxt" placeholder="Ex: 5 + 5 - 2 = ?" name="CPergunta">';
    $("#pergContent").html(s);
  },

  perguntaImg: function(){
    var s='';
      s= '<input type="file" class="perg-control preenche" id="InputPerguntaImg" name="crImgPergunta">'
        +'<img id="imgPrg" src="" style="max-height:100px;">';

    $("#pergContent").html(s);

  },

  perguntaAudio: function(){
    var s='';
      s='<input type="file" class="perg-control preenche" id="InputPerguntaAudio" name="crAudioPergunta">'
        +'<audio id="playPlayer" style="" controls></audio>';
    $("#pergContent").html(s);

  },

  //Respostas
  respostaTexto: function(){
    var self=this;
    self.nRespostas=2;
    self.tipoR="txt";
    var s='';
      s= '<div class="col-sm-5" >'
          +'<label for="InputRespTxt0">Resposta Correta:</label>'
        +'</div>'
        +'<div class="col-sm-5">'
          +'<input type="text" class="form-control preenche" id="InputRespTxt0" placeholder="Ex: Oceano" name="resposta0">'
        +'</div>'
        +'<div class="col-sm-5">'
          +'<label for="InputRespTxt1">1ª Resposta Errada:</label>'
        +'</div>'
        +'<div class="col-sm-5">'
          +'<input type="text" class="form-control preenche" id="InputRespTxt1" placeholder="Ex: Laranja" name="resposta1">'
        +'</div>'
        +'<span id="testBadge"class="badge btn" style="background-color:#00cc00"><span class="glyphicon glyphicon-plus"></span></span>';
    $("#respContent").html(s);
  },

  respostaImg: function(){
    var self=this;
    self.nRespostas=2;
    self.tipoR="txt";
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

            opt='<option value="'+data[i].doc._id+'" class="pergunta"> > '
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
