window.TeachersView = Backbone.View.extend({
  events: {
     "click #btnTeachersNew": "newTeacher",
     "click .profSelec":"mudaProf",
  },

  initialize: function() {


  },


  render: function() {
    $(this.el).html(this.template());

    var self=this;

    modem('GET','teachersFoto/xpto@gmail.com0', function(json){
      //var url= URL.createObjectURL(json);
      console.log(json);
    },
    function(error) {
      console.log('Error getting teachers list!');
    });

    modem('GET', 'teachers', function(data) {
      //indicar quantos items existem
      $('#teachersBadge').text(data.length);
      //construir os botões de selecção do professor
      var s='';
      var first=true;
      for(i=0;i<data.length;i++){
        if(data[i].doc.estado=='Ativo' || data[i].doc.estado==1){

        s+= '<button id="'
          + data[i].doc._id
          + '"  name="' + data[i].doc._id
          +'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block profSelec" >'
          +' <img src="http://localhost:5984/dev_professores/'+data[i].doc._id+'/prof.png"  style="height:25px;" > '
          + data[i].doc.nome + '</button>';

          if(first){
            $('#teachersPreview').html(self.enchePreview(data[i].doc));
            first=false;
          }
        }
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






    }, function(error) {
      console.log('Error getting teachers list!');
    });

    return this;
  },

  mudadProf

  enchePreview: function(documnt){
    var html='';

    html+= '<img src="http://localhost:5984/dev_professores/'+documnt._id+'/prof.png"  style="height:250px;">';
    html+= '<br><span>Nome: <label>'+documnt.nome+' </label></span>';
    html+= '<br><span>E-mail: <label>'+documnt._id+' </label></span>';
    html+= '<br><span>Telefone: <label>'+documnt.telefone+' </label></span>';
    html+= '<br><span>Tipo de utilizador: <label>'+documnt.tipo+' </label></span><br>';

    // falta ir buscar à BD as escolas onde o professor leciona e turmas

    return html;
    //data[i].doc)
  },


  newTeacher: function (e) {
    e.preventDefault();
    app.navigate('/teachers/new', {
    trigger: true
    });
  },



});
