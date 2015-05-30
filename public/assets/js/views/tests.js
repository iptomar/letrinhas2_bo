window.TestsView = Backbone.View.extend({
  events: {
    "click #btnTestNew":"newTest",
    "click #btnTesteCriar":"criarTeste",
    "click #btnTexto":"criarTexto",
    "click #btnLista":"criarLista",
    "click #btnMult":"criarMultimedia",
    "click #btnInterp":"criarInterpr",


  },

  criarTexto:function(){
    var sefl=this;
    sefl.tipoTeste="texto";
    $("#btnTexto").attr('style','height:50px; background-color: #53BDDC; color:#00ff00');
    $("#btnTesteCriar").attr('style','visibility:initial');
    $("#btnLista").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnMult").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnInterp").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
  },

  criarLista:function(){
    var sefl=this;
    sefl.tipoTeste="lista";
    $("#btnLista").attr('style','height:50px; background-color: #53BDDC; color:#00ff00');
    $("#btnTesteCriar").attr('style','visibility:initial');
    $("#btnTexto").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnMult").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnInterp").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
  },

  criarMultimedia:function(){
    var sefl=this;
    sefl.tipoTeste="Multimedia";
    $("#btnMult").attr('style','height:50px; background-color: #53BDDC; color:#ff0000');
    $("#btnTesteCriar").attr('style','visibility:initial');
    $("#btnTexto").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnLista").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnInterp").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
  },

  criarInterpr:function(){
    var sefl=this;
    sefl.tipoTeste="interpr";
    $("#btnInterp").attr('style','height:50px; background-color: #53BDDC; color:#ff0000');
    $("#btnTesteCriar").attr('style','visibility:initial');
    $("#btnTexto").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnMult").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnLista").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
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
        app.navigate('man', {
            trigger: true
          });
        break;
      case 'interpr':
        app.navigate('man', {
            trigger: true
          });
        break;
    };

    $('#myModalTest').modal("hide");
  },

  newTest:function(){
    $('#myModalTest').modal("show");
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
      var d='<span class="badge btn-info">Pré-visualização</span><hr>'
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
              +'<source src="'+self.site+'/dev_perguntas/'+item._id+'/voz.mp3" type="audio/mpeg">'
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

    }, function(error2) {
      console.log('Error getting questions\n');
      console.log(error2);
    });


  },

  //Em construção
  enchePreviewLista: function(documnt){
    var self=this;
    modem('GET', 'questions/'+documnt.perguntas, function(item) {

      var d='<span class="badge btn-info">Pré-visualização</span><hr>'
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
                d+='<span class="badge btn-warning">Este itma não tem conteúdo</span>';
           }

           d+='</div>'
           +'<div class="col-md-12 " align=left>'
            +'<label>Demo:</label>'
            +'<audio id="vozProf" controls style="width:100%">'
              +'<source src="'+self.site+'/dev_perguntas/'+item._id+'/voz.mp3" type="audio/mpeg">'
            +'</audio><hr> '
           +'</div>'
           +'<div class="col-md-12 "  align=right >'
              +'<button id="btnTestEdit" class="btn btn-warning" style="font-size:10px">'
                +'<span class="glyphicon glyphicon-pencil" style="color:#ffff00;"></span>'
                +' Editar dados'
              +'</button>'
           +'</div>';

           $('#testsPreview').html(d);

    }, function(error2) {
      console.log('Error getting questions\n');
      console.log(error2);
    });
  },

  //Em construção
  enchePreviewMultim: function(documnt){
    var d="Preview<br><label>Descrição multimédia:</label> "+documnt.descricao
        +'<br>'
        +'<img src="../img/inConstruction.jpg"  style="height:220px;">';

        $('#testsPreview').html(d);
  },

  //Em construção
  enchePreviewInterp: function(documnt){
    var d="Preview<br><label>Descrição Interpretação:</label> "+documnt.descricao
        +'<br>'
        +'<img src="../img/inConstruction.jpg"  style="height:220px;">';

        $('#testsPreview').html(d);
  },

  getColunas:function(lista){
    var coluna='';

    for(i=0;i<lista.length;i++){
      coluna+='<br>'+lista[i];
    }

    return coluna;
  },

  initialize: function() {
    var self=this;
    self.bd='dev_testes';
    self.site='http://127.0.0.1:5984';
  },

  render: function() {
    $(this.el).html(this.template());
    var self=this;

    //verificar se está logado
    var controlo=window.localStorage.getItem("Logged");
    if(!controlo){
      console.log('Não Logado');
      app.navigate('/#login', {
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
            default:  img2="../img/page-loader.gif";
              break;
          };


          var date = new Date(data[i].doc.data);
          var day = date.getDate().toString();
          var month = date.getMonth().toString();
          var year = date.getFullYear().toString();
          var hours = date.getHours().toString();
          var minutes = date.getMinutes().toString();
          day = day.length === 2 ? day : '0' + day;
          month = month.length === 2 ? month : '0' + month;
          hours = hours.length === 2 ? hours : '0' + hours;
          minutes = minutes.length === 2 ? minutes : '0' + minutes;


          s+= '<button id="' + data[i].doc._id
            +'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
            +' class="btn btn-lg btn-block testSelect" >'
            +' <img src="'+img+'"  style="height:25px;" > '
            +' <img src="'+img2+'"  style="height:25px;" > '
            + data[i].doc.titulo + ' - '+day+'.'+month+'.'+year+' </button>';

          if(first){
            self.encheTestPreview(data[i].doc);
            first=false;
          }
        }

      }
      $('#testsContent').html(s);
      //enchePreviewTexto

      document.getElementById(data[0].doc._id).focus();

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
});
