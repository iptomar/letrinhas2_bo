window.TestsView = Backbone.View.extend({
  events: {
    "click #btnTestNew":"newTest",
    "click #btnTesteCriar":"criarTeste",
    "click #btnTexto":"criarTexto",
    "click #btnLista":"criarLista",
    "click #btnMult":"criarMultimedia",
    "click #btnInterp":"criarInterpr",
    "click #myne":"soOsMeus",

    "keyup #testProcurar":"searchTeste",
   },

   searchTeste: function(){
     var self=this;
     var str1= $("#testProcurar").val();
     var myBotoes = document.getElementsByClassName('testSelect');
     var cont=0;
     for(i=0; i< myBotoes.length; i++){
       var position = $(myBotoes[i]).text().toLowerCase().search( str1.toLowerCase() );
       if(position == -1){
         $(myBotoes[i]).attr("style","display:none");
       }
       else{
         cont++;
         $(myBotoes[i]).attr("style","display:show; height:50px; background-color: #53BDDC; color: #ffffff;");

       }
       $('#testBadge').text(cont);
     }

   },

  criarTexto:function(){
    var sefl=this;
    sefl.tipoTeste="texto";
    $("#btnTexto").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#00ff00');
    $("#btnTesteCriar").attr('style','visibility:initial');
    $("#btnLista").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
    $("#btnMult").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
    $("#btnInterp").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
  },

  criarLista:function(){
    var sefl=this;
    sefl.tipoTeste="lista";
    $("#btnLista").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#00ff00');
    $("#btnTesteCriar").attr('style','visibility:initial');
    $("#btnTexto").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
    $("#btnMult").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
    $("#btnInterp").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
  },

  criarMultimedia:function(){
    var sefl=this;
    sefl.tipoTeste="Multimedia";
    $("#btnMult").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#00ff00');
    $("#btnTesteCriar").attr('style','visibility:initial');
    $("#btnTexto").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
    $("#btnLista").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
    $("#btnInterp").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
  },

  criarInterpr:function(){
    var sefl=this;
    sefl.tipoTeste="interpr";
    $("#btnInterp").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#00ff00');
    $("#btnTesteCriar").attr('style','visibility:initial');
    $("#btnTexto").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
    $("#btnMult").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
    $("#btnLista").attr('style','height:50px; width:200px; background-color: #53BDDC; color:#ffffff');
  },

  criarTeste:function(){
    var sefl=this;
    switch(sefl.tipoTeste){
      case 'texto':
        app.navigate('/questionsText/new', {
            trigger: true
          });
        break;
      case 'lista':
        app.navigate('/questionsList/new', {
            trigger: true
          });
        break;
      case 'Multimedia':
        app.navigate('questionsMultimedia/new', {
            trigger: true
          });
        break;
      case 'interpr':
        app.navigate('questionsInterp/new', {
            trigger: true
          });
        break;
    };

    $('#myModalTest').modal("hide");
  },

  newTest:function(){
    $('#myModalTest').modal("show");
  },

  deleteTest:function(){
    app.navigate('man', {
        trigger: true
      });
  },

  editTest:function(){
    app.navigate('man', {
        trigger: true
      });
  },

  mudaTest:function(obj){
    var self=this;
    modem('GET', 'tests/'+obj.id, function(item) {
      self.encheTestPreview(item);

    }, function(error2) {
      console.log('Error getting questions\n');
      console.log(error2);
    });

  },

  encheTestPreview:function(documnt){
    var self = this;
    self.professor = documnt.professorId;
    var f = documnt.tipo;
    switch(f){
      case 'Texto':
          self.enchePreviewTexto(documnt);
        break;
      case 'Lista':
          self.enchePreviewLista(documnt);
        break;
      case 'Multimédia':
          self.enchePreviewMultim(documnt);
        break;
      case 'Interpretação':
          self.enchePreviewInterp(documnt);
        break;
    };
  },

  enchePreviewTexto: function(documnt){
    var self=this;
    modem('GET', 'questions/'+documnt.perguntas[0], function(item) {
      var d='<span class="badge btn-info">Pré-visualização de "'+documnt.titulo+'"</span><hr>'
           +'<div align=left>'
            +'<label>Descrição:</label><span> '+documnt.descricao+'</span>'
            +'<br><label>Pergunta:</label><span> '+item.pergunta+'</span>'
           +'</div>'
           +'<div class="panel panel-default col-md-12 " align=left style="height:300px; overflow:auto">'
            +''+item.conteudo.texto
           +'</div>'
           +'<div class="col-md-12 " align=left>'
            +'<label>Demo:</label>'
            +'<audio id="vozProf" controls style="width:100%">'
              +'<source src="'+self.site+'/'+self.bd2+'/'+item._id+'/voz.mp3" type="audio/mpeg">'
            +'</audio><hr> '
           +'</div>'
           +'<div class="col-md-12 "  align=right >'
              +'<button id="btnTestEdit" class="btn btn-warning" style="font-size:10px">'
                +'<span class="glyphicon glyphicon-pencil" style="color:#ffff00;"></span>'
                +' Editar dados'
              +'</button>'
           +'</div>';

           $('#testsPreview').html(d);

           myEl = document.getElementById('btnTestEdit');
           myEl.addEventListener('click', function() {
                         self.editTest();
                       }, false);
           self.validaUser();

    }, function(error2) {
      console.log('Error getting questions\n');
      console.log(error2);
    });
  },

  //Em construção
  enchePreviewLista: function(documnt){
    var self=this;
    modem('GET', 'questions/'+documnt.perguntas, function(item) {
      var d='<span class="badge btn-info">Pré-visualização de "'+documnt.titulo+'"</span><hr>'
           +'<div align=left>'
            +'<label>Descrição:</label><span> '+documnt.descricao+'</span>'
            +'<br><label>Pergunta:</label><span> '+item.pergunta+'</span>'
           +'</div>'
           +'<div class="panel panel-default col-md-12 " aling="center" style="height:300px; overflow:auto">';
           if(item.conteudo['palavrasCL1'].length > 0) {
              d+='<div class="col-md-4">'
                  +'<span class="badge btn-success">Coluna 1</span>'
                  + self.getColunas(item.conteudo['palavrasCL1'])
                +'</div>';
           }
           if(item.conteudo['palavrasCL2'].length > 0) {
              d+='<div class="col-md-4" style="max-height:290px; overflow:auto">'
                  +'<span class="badge btn-success">Coluna 2</span>'
                  +self.getColunas(item.conteudo['palavrasCL2'])
                +'</div>';
           }
           if(item.conteudo['palavrasCL3'].length > 0) {
              d+='<div class="col-md-4" style="max-height:290px; overflow:auto">'
                  +'<span class="badge btn-success">Coluna 3</span>'
                  + self.getColunas(item.conteudo['palavrasCL3'])
                +'</div>';
           }

           if( item.conteudo['palavrasCL1'].length==0
            && item.conteudo['palavrasCL2'].length==0
            && item.conteudo['palavrasCL3'].length==0
              ){
                d+='<span class="badge btn-warning">Este item não tem conteúdo</span>';
           }

           d+='</div>'
           +'<div class="col-md-12 " align=left>'
            +'<label>Demo:</label>'
            +'<audio id="vozProf" controls style="width:100%">'
              +'<source src="'+self.site+'/'+self.bd2+'/'+item._id+'/voz.mp3" type="audio/mpeg">'
            +'</audio><hr> '
           +'</div>'
           +'<div class="col-md-12 "  align=right >'
              +'<button id="btnTestEdit" class="btn btn-warning" style="font-size:10px">'
                +'<span class="glyphicon glyphicon-pencil" style="color:#ffff00;"></span>'
                +' Editar dados'
              +'</button>'
           +'</div>';

           $('#testsPreview').html(d);
           self.validaUser();


    }, function(error2) {
      console.log('Error getting questions\n');
      console.log(error2);
    });
  },

  //Em construção
  enchePreviewMultim: function(documnt){
    var self=this;
    $('#testsPreview').html('');

    var d='<div class="btn-group" id="btnTestEdit" style="position:absolute; left:10px">'
          +'<span type="button" class="btn badge btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">'
          +'<span class="glyphicon glyphicon-cog"></span>'
          +'<span class="sr-only">Toggle Dropdown</span>'
          +'</span>'
          +'<ul class="dropdown-menu" role="menu">'
            +'<li>'
              +'<a><label id="btnTestClonar" class="btn badge btn-warning">'
                +'<span class="glyphicon glyphicon-refresh" style="color:#80ee80"></span> '
                 +'Clonar Teste'
              +'</label></a>'
            +'</li>'
            +'<li class="divider"></li>'
            +'<li>'
            +'<a><label id="btnTestElimina" class="btn badge btn-danger">'
              +'<span class="glyphicon glyphicon-trash" style="color:#cccccc"></span> '
               +'Apagar Teste'
            +'</label></a>'
            +'</li>'
          +'</ul>'
        +'</div>'
        +'<span class="badge btn-info" >Pré-visualização de "'+documnt.titulo+'"</span>'
         +'<hr>'
         +'<div align=left>'
          +'<label>Descrição:</label><span> '+documnt.descricao+'</span>'
         +'</div>'
         +'<hr>'
         +'<div id="paginas" style="height:475px; overflow:auto">'
         +'</div>';
         $('#testsPreview').append(d);
         var indicador=1;
         for (var i = 0; i < documnt.perguntas.length; i++) {
           modem('GET', 'questions/'+documnt.perguntas[i], function(item) {

             var corpo='';
             switch (item.conteudo.tipoDoCorpo) {
               case 'texto':
                 corpo= '<label style="position:relative;top:20px; max-height:175px">'+item.conteudo.corpo+'</label>';
                 break;
               case 'imagem':
                 corpo='<img src="'+self.site+'/'+self.bd2+'/'+item._id+'/corpo.jpg" style="position:relative;top:20px; width:150px; max-height:175px">';
                 break;
               case 'audio':
                 corpo= '<div style="position:relative;top:20px;"><img src="../img/paly_off.png" style=" width:130px">'
                      + '<br>'
                      +'<audio controls style="width:100%">'
                        +'<source src="'+self.site+'/'+self.bd2+'/'+item._id+'/corpo.mp3" type="audio/mpeg">'
                        +'</audio>'
                      +'</div>';
                 break;
               default:
             }
             var opcoes='<div>';
             var size = 12/item.conteudo.opcoes.length;
             for (var j = 0; j < item.conteudo.opcoes.length; j++) {
               switch (item.conteudo.opcoes[j].tipo) {
                 case 'texto':
                   opcoes+=' <div class="col-sm-'+size+'">'
                            +'<span class="btn-sm btn-block" style="position:relative;top:20px;background-color:#53BDDC; color:#ffffff; height:70px;">'
                              +item.conteudo.opcoes[j].conteudo
                            +'</span>'
                          +'</div> ';
                   break;
                 case 'imagem':
                   opcoes+= ' <div class="col-sm-'+size+'">'
                            +'<span class="btn-lg btn-block" style="background-color:#53BDDC; color:#ffffff; height:70px; ">'
                              +'<img src="'+self.site+'/'+self.bd2+'/'+item._id+'/op'+(j+1)+'.jpg" style=" height:45px">'
                            +'</span>'
                          +'</div> ';
                   break;
                 default:

               }
             }
             opcoes+='</div>';
             var g='<div align=left><label class="badge btn-success">Página '+indicador+': '+item.titulo+' </label><br>'
                  +'<label>Pergunta:</label><span> '+item.pergunta+'</span></div><br>'
                  +'<div class="panel panel-default" align=center style=" height:200px; width:100%; color:#ffffff; background-color:#80c0ff;">'
                    +corpo
                  +'</div>'
                  +'<div align=center style="height:140px; width:100%;">'
                    +opcoes
                  +'</div>'
                  +'<hr>';
             indicador++;
             $("#paginas").append(g);
           }, function(error2) {
             console.log('Error getting questions\n');
             console.log(error2);
           });
         }

         myEl = document.getElementById('btnTestClonar');
         myEl.addEventListener('click', function() {
                       self.editTest();
                     }, false);

         myEl = document.getElementById('btnTestElimina');
         myEl.addEventListener('click', function() {
                       self.deleteTest();
                     }, false);


    self.validaUser();

  },

  //Em construção
  enchePreviewInterp: function(documnt){
    var self=this;
    modem('GET', 'questions/'+documnt.perguntas[0], function(item) {
      var d='<span class="badge btn-info">Pré-visualização de "'+documnt.titulo+'"</span><hr>'
           +'<div align=left>'
            +'<label>Descrição:</label><span> '+documnt.descricao+'</span>'
            +'<br><label>Pergunta:</label><span> '+item.pergunta+'</span>'
           +'</div>'
           +'<div class="panel panel-default col-md-12 " style="height:300px; overflow:auto; text-align:justify">'
            +' <br>'+self.marcaTexto(item.conteudo.texto, item.conteudo.posicaoResposta)
           +'</div>'
           +'<div class="col-md-12 " align=left>'
            +'<label>Demo:</label>'
            +'<audio id="vozProf" controls style="width:100%">'
              +'<source src="'+self.site+'/'+self.bd2+'/'+item._id+'/voz.mp3" type="audio/mpeg">'
            +'</audio><hr> '
           +'</div>'
           +'<div class="col-md-12 "  align=right >'
              +'<button id="btnTestEdit" class="btn btn-warning" style="font-size:10px">'
                +'<span class="glyphicon glyphicon-pencil" style="color:#ffff00;"></span>'
                +' Editar dados'
              +'</button>'
           +'</div>';

           $('#testsPreview').html(d);

           myEl = document.getElementById('btnTestEditar');
           myEl.addEventListener('click', function() {
                         self.editTest();
                       }, false);
           self.validaUser();

    }, function(error2) {
      console.log('Error getting questions\n');
      console.log(error2);
    });


  },

  marcaTexto:function(texto, posicoes){
    var self=this;
    var text="";
    var s='<span ';
    var s1=' class="badge">';
    var palavra= s;
    var isCaracter=true;
    var posicao=1;
    var index=0;
    if(posicoes[index]==posicao){
      palavra+=s1;
      index++;
    }

    if(texto.length!=0){
      for (var i = 0; i < texto.length; i++) {
        //de acordo com a tabela ascii 1º caracter possivel '!' CODE 33
        if(texto.charCodeAt(i)<33){
          //se o caracter anterior for válido
          if(isCaracter){
            //fecha a palavra
            palavra+=' </span>';
            posicao++;
            //adiciona a palavra à linha
            text+=palavra;
            //reinicia a palavra
            palavra= s;

            if(posicoes[index]==posicao){
              palavra+=s1;
              index++;
            }
            else{
              palavra+='>';
            }
            //não e um caracter válido (ex: "enter", "space", "tab")
            isCaracter=false;
          }
        }
        else{
          //adiciona o caracter à palavra
          palavra+=texto.charAt(i);
          //confirma que era uma caracter
          isCaracter=true;
        }
      }
      //entregar o resto
      if(palavra.length>0){
        palavra+=' </span>';
        text+= palavra;
      }
    }
    return text;
  },

  getColunas:function(lista){
    var coluna='';

    for(i=0;i<lista.length;i++){
      coluna+='<br>'+lista[i];
    }

    return coluna;
  },

  validaUser:function(){
    var self=this;
    //esconder os botões de inserir e editar a todos excepto o Administrador
    var role = window.localStorage.getItem('Role');
    var pId = window.localStorage.getItem('ProfID');
    if( role != "Professor" || self.professor != pId){
      $("#btnTestEdit").attr("style","visibility:hidden");
      $("#btnTestNew").attr("style","visibility:hidden");
    }
  },

  initialize: function() {
    var self=this;
    self.bd='dev_testes';
    self.bd2='dev_perguntas';
    self.site='http://127.0.0.1:5984';
  },

  render: function() {
    $(this.el).html(this.template());
    var self=this;

    //verificar se está logado
    var controlo=window.localStorage.getItem("Logged");
    if(!controlo){
      console.log('Não Logado');
      app.navigate('/#', {
          trigger: true
        });
        return null;
    }

    //Constrir os botões
    modem('GET', 'tests', function(data) {
      $('#testBadge').text(data.length);
      var s='';

      if(data.length == 0){
        s="<h2>Não existem testes para mostrar</h2>"
      }
      else{
        var first=true;
        for(i=0;i<data.length;i++){
          var img, img2;

          switch(data[i].doc.tipo){
            case 'Texto': img="../img/testeTexto.png";
              break;
            case 'Lista': img="../img/testLista.png";
              break;
            case 'Multimédia': img="../img/testMul.png";
              break;
            case 'Interpretação': img="../img/testInterpretacao.png";
              break;
            default:  img="../img/page-loader.gif";
              break;
          };

          switch(data[i].doc.disciplina){
            case 'Português': img2="../img/portugues.png";
              break;
            case 'Inglês': img2="../img/ingles.png";
              break;
            case 'Matemática': img2="../img/mate.png";
              break;
            case 'Estudo do Meio': img2="../img/estudoMeio.png";
              break;
            case 'Outra língua': img2="../img/outroLinguas2.png";
              break;
            case 'Outra': img2="../img/outro.png";
              break;
            default:  img2="../img/page-loader.gif";
              break;
          };

          var cor='#53BDDC';

          if(window.localStorage.getItem('ProfID')==data[i].doc.professorId){
            cor='#60cc60';
          }

          var date = new Date(data[i].doc.data);
          var day = date.getDate().toString();
          var month = (date.getMonth()+1).toString();
          var year = date.getFullYear().toString();
          var hours = date.getHours().toString();
          var minutes = date.getMinutes().toString();
          day = day.length === 2 ? day : '0' + day;
          month = month.length === 2 ? month : '0' + month;
          hours = hours.length === 2 ? hours : '0' + hours;
          minutes = minutes.length === 2 ? minutes : '0' + minutes;

          //tentar colocar mais campos nos botões para evitar muitas chamadas ao servidor
          s+= '<button id="' + data[i].doc._id
            +'"  type="button" style="height:60px; text-align:left; background-color:'+cor+'; color: #ffffff;"'
            +' class="btn btn-lg btn-block testSelect" '
            +' data="'+data[i].doc.data+'"'
            +' ano="'+data[i].doc.anoEscolar+'"'
            +' disciplina="'+data[i].doc.disciplina+'"'
            +' professor="'+data[i].doc.professorId+'"'
            +' tipo="'+data[i].doc.tipo+'">'
            +' <img src="'+img+'"  style="height:30px;" title="'+data[i].doc.tipo+'"> '
            +' <img src="'+img2+'"  style="height:30px;" title="'+data[i].doc.disciplina+'"> '
            + data[i].doc.titulo + ' - '+day+'.'+month+'.'+year+' </button>';

          /*if(first){
            self.encheTestPreview(data[i].doc);
            first=false;
          }*/
        }

      }
      $('#testsContent').html(s);
      self.destacaOsMeus();

      //Criar Eventos
      var myEl = document.getElementsByClassName('testSelect');
      for(j=0;j<myEl.length;j++){
        myEl[j].addEventListener('click', function() {
                      self.mudaTest(this);
                    }, false);
      };

    }, function(error) {
      console.log('Error getting tests list!');
    });

    return this;
  },

  destacaOsMeus:function(){
    var self=this;
    //subir os meus para cima!
    var btns = document.getElementsByClassName('testSelect');

    for (var i = 0; i < btns.length; i++) {
      $('#testsContent').prepend($(btns[i]));
    }
    //enchePreviewTexto
    self.mudaTest(btns[0]);
  },

  soOsMeus:function(e){
    var self=this;

    var btns = document.getElementsByClassName('testSelect');
    var conta=0;
      for (var i = 0; i < btns.length; i++) {
        if(window.localStorage.getItem('ProfID')== $(btns[i]).attr('professor') ){
          $(btns[i]).attr("style","height:60px; text-align:left; background-color:#60cc60; color: #ffffff;");
          conta++;
        }
        else{
          if($(e.toElement).attr("val")==0){
            $(btns[i]).attr("style","display:none");
          }
          else{
            $(btns[i]).attr("style","height:60px; text-align:left; background-color:#53BDDC; color: #ffffff;");
            conta++;
          }
        }
      }

      if($(e.toElement).attr("val")==0){
        $(e.toElement).attr("val",1);
        $("#testBadge").text(conta+" / "+btns.length);
      }
      else {
        $(e.toElement).attr("val",0);
        $("#testBadge").text(conta);

      }


  },
});
