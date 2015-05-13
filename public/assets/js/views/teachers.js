window.TeachersView = Backbone.View.extend({
  events: {
     "click #btnTeachersNew": "newTeacher",
  },
    
  initialize: function() {},
  

  render: function() {
    $(this.el).html(this.template());

    modem('GET','teachersFoto/xpto@gmail.com0', function(json){
      //var url= URL.createObjectURL(json);
      console.log(json);
    },
    function(error) {
      console.log('Error getting teachers list!');
    });

    modem('GET', 'teachers', function(data) {
      $('#teachersBadge').text(data.length);
      var s='';
      for(i=0;i<data.length;i++){
        s+= '<button id="'
          + data[i].doc._id
          + '"  name="' + data[i].doc._id
          +'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block" >'
          +' <img src="../img/professor1.png"  style="height:25px;" > '
          + data[i].doc.nome + '</button>';
      }

      $('#teachersContent').html(s);

      // Dúvidas:
      // Já tenho o attachements, mas não o consigo usar... como usar e colocar no html??


      //console.log(data[0].attachment.get('rabit','rabit.png',function(err,body){}));
      /*alunos_local2.getAttachment(alunoId, 'aluno.png', function(err2, DataImg) {
              if (err2) console.log(err2);
              var url = URL.createObjectURL(DataImg);
              $('#lbNomeAluno').text("[" + turmaNome + " ] -- " + alunoNome);
              $('#imgAluno').attr("src", url);
            });*/

        var url='';

        console.log(data[0].doc.nome);
        console.log(data[0].doc._attachments);

        //var obj = new Object(data[0].doc._attachments.object[0]);
        //console.log(obj);
        //data[0].getAttachment('prof.png',function(err2, DataImg){
        //  if (err2) console.log(err2);
          //url = URL.createObjectURL(data[0].doc._attachments);
          //console.log(url);

      //  });


        //= URL.createObjectURL(data[0].doc._attachments.data);
        //console.log(url);

        var conteudo='';
            conteudo+= '<img src="../img/docentes.png"  style="height:250px;">';
            conteudo+= '<br><label>'+data[0].doc.estado+' </label><br>';
            conteudo+= '<label>'+data[0].doc.telefone+'</label><br>';

        // falta ir buscar à BD as escolas onde o professor leciona e turmas

        $('#teachersPreview').html(conteudo);


        
        
    }, function(error) {
      console.log('Error getting teachers list!');
    });

    return this;
  },
  
  newTeacher: function (e) {
    e.preventDefault();
    app.navigate('/teachers/new', {
    trigger: true
    }); 
  },
    
    
    
});


