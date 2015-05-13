window.TestsView = Backbone.View.extend({
  events: {
    "click #btnTestNew":"newTest",

  },

  newTest:function(){
    console.log("Quer novo teste?? ");
    $('#myModalTest').modal("show");
    //deverá aparecer um Modal para escolher o tipo de teste a criar.
    //Teste:


  },

  initialize: function() {},

  render: function() {
    $(this.el).html(this.template());

    //Constrir os botões
    modem('GET', 'tests', function(data) {
      $('#testBadge').text(data.length);
      var s='';

      if(data.length == 0){
        s="<h2>Não existem testes para mostrar</h2>"
      }
      else{
        for(i=0;i<data.length;i++){
          var img;

          switch(data[i].doc.tipo){
            case 'Texto': img="../img/testeTexto.png";
              break;
            case 'Lista': img="../img/testLista.png";
              break;
            case 'Multimedia': img="../img/testMul.png";
              break;
            case 'Interpretação': img="../img/testInterpretacao.png";
              break;
            case 'Hibrido': img="../img/imags.png";
              break;
            default:  img="../img/page-loader.gif";
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
            + data[i].doc.titulo + ' - '+day+'.'+month+'.'+year+' </button>';
        }

        var d=""+data[0].doc.descricao;
        $("#testsPreview").html(d);

        //Preview
        modem('GET', 'questions/'+data[0].doc.perguntas[0], function(item) {
          console.log(item);

        }, function(error2) {
          console.log('Error getting questions\n'+ error2);
        });

        $("#btn0").focus();

      }
      $('#testsContent').html(s);


    }, function(error) {
      console.log('Error getting tests list!');
    });

    return this;
  }
});
