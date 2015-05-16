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
    $("#btnLista").attr('style','height:50px; background-color: #53BDDC; color:#ffff00');
    $("#btnTesteCriar").attr('style','visibility:initial');
    $("#btnTexto").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnMult").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnInterp").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
  },

  criarMultimedia:function(){
    var sefl=this;
    sefl.tipoTeste="Multimedia";
    $("#btnMult").attr('style','height:50px; background-color: #53BDDC; color:#ffff00');
    $("#btnTesteCriar").attr('style','visibility:initial');
    $("#btnTexto").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnLista").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
    $("#btnInterp").attr('style','height:50px; background-color: #53BDDC; color:#ffffff');
  },

  criarInterpr:function(){
    var sefl=this;
    sefl.tipoTeste="interpr";
    $("#btnInterp").attr('style','height:50px; background-color: #53BDDC; color:#ffff00');
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
        app.navigate('man', {
            trigger: true
          });
        break;
      case 'Multimedia': img="../img/testMul.png";
        break;
      case 'interpr': img="../img/testInterpretacao.png";
        break;
    };





    $('#myModalTest').modal("hide");
  },

  newTest:function(){
    $('#myModalTest').modal("show");
  },

  enchePreviewTexto: function(){},
  enchePreviewLista: function(){},
  enchePreviewMultim: function(){},
  enchePreviewInterp: function(){},


  initialize: function() {
  },

  render: function() {
    $(this.el).html(this.template());
    var self=this;
    //Constrir os botões
    modem('GET', 'tests', function(data) {
      $('#testBadge').text(data.length);
      var s='';

      if(data.length == 0){
        s="<h2>Não existem testes para mostrar</h2>"
      }
      else{
        for(i=0;i<data.length;i++){
          var img, img2;

          switch(data[i].doc.tipo){
            case 'Texto': img="../img/testeTexto.png";
              break;
            case 'Lista': img="../img/testLista.png";
              break;
            case 'Multimedia': img="../img/testMul.png";
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


          s+= '<button id="btn'
            + i
            + '"  value="' + data[i].doc._id
            +'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
            +' class="btn btn-lg btn-block" >'
            +' <img src="'+img+'"  style="height:25px;" > '
            +' <img src="'+img2+'"  style="height:25px;" > '
            + data[i].doc.titulo + ' - '+day+'.'+month+'.'+year+' </button>';
        }




        console.log("idquestão: "+data[0].doc.perguntas[0]);
        //Preview
        modem('GET', 'questions/'+data[0].doc.perguntas[0], function(item) {
          console.log(item);
          var d="Preview<br><label>Descrição:</label> "+data[0].doc.descricao
               +' <br><img src="../img/inConstruction.jpg"  style="height:250px;" > ';
               $("#testsPreview").html(d);
        }, function(error2) {
          console.log('Error getting questions\n');
          console.log(error2);
        });



      }
      $('#testsContent').html(s);
      $("#btn0").focus();

    }, function(error) {
      console.log('Error getting tests list!');
    });

    return this;
  }
});
