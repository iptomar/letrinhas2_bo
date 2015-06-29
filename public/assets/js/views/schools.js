window.SchoolsView = Backbone.View.extend({
  events: {
    "click #btnSchoolNew":"newEscola",
    "click .mostraTurma":"mostraTurma",
    "keyup #escolaProcurar":"searchEscola",
   },

   searchEscola: function(){
     var self=this;
     var str1= $("#escolaProcurar").val();
     var myBotoes = document.getElementsByClassName('schoolSelec');
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
       $('#schoolsBadge').text(cont);

     }

   },



   mostraTurma:function(e){
     var self=this;

     //preencher um modal...
     var s = '#'+e.toElement.id;
     $("#myModalLabel").text($(s).text()+' - '+ $("#EscolaNome").text());
     $("#classProfessor").html('');
     $("#classAlunos").html('');
     var tID = e.toElement.value;
     var eID = $("#EscolaNome").attr('value');

     modem('GET','schools/'+eID, function(escola){

       for(i=0;i< escola.turmas.length; i++ ){
         if(escola.turmas[i]._id == tID){
           //preencher professores
           if(escola.turmas[i].professores.length>0){
             for(p=0; p< escola.turmas[i].professores.length; p++){
               modem('GET','teachers/'+escola.turmas[i].professores[p].id,function(professor){
                 var prof = '<div class="col-md-6 ">'
                            +'<img src="'+self.site+'/dev_professores/'+professor._id+'/prof.jpg" style="height:80px;" > '
                            +'<br><label>'+professor.nome+'</label>'
                            +'</div>';
                 $("#classProfessor").append(prof);
               },
               function(error) {
                 console.log('Error getting the teacher id:'+escola.turmas[i].professores[p].id);
               });
             }
            }
            else{
              $("#classProfessor").append("<label>Esta turma ainda não tem professores.</label>");
            }

           //preencher alunos
           modem('GET','students', function(alunos){
             var contAl=0;
             for(a=0;a<alunos.length;a++){
               if(alunos[a].doc.escola == eID &&
                 alunos[a].doc.turma == tID){
                 var alun;
                 alun= '<div class="col-md-4 "><br>'
                            +'<img src="data:'+alunos[a].doc._attachments['aluno.jpg'].content_type
                            +';base64,'
                            + alunos[a].doc._attachments['aluno.jpg'].data
                            +'" style="height:80px;" > '
                            +'<br><label>'+alunos[a].doc.nome+'</label><br>'
                            +'</div>';

                 $("#classAlunos").append(alun);
                 contAl++;
              }

            }
             if(contAl==0) $("#classAlunos").append("<label>Esta turma ainda não tem alunos.</label>");
           },
           function(error) {
             console.log('Error getting the students list');
           });
         }
       }
     },
     function(error) {
       console.log('Error getting the school id:'+$("#EscolaNome").val());
     });
     //apresenta o Modal
     $("#myModalTurma").modal("show");


   },


  newEscola: function(e) {
    e.preventDefault();
    app.navigate('/schools/new', {
    trigger: true
    });
  },

  editEscola: function (obj) {
    //Variavel a enviar, para depois poder buscar os dados da escola a editar
    window.localStorage.setItem("EscolaEditar", obj.name);
    app.navigate('/man', {
      trigger: true
    });
  },

  initialize: function() {
    var self=this;
    //para fazer update às escolas selecionadas e respetivas turmas,
    //caso seja submetido o formulário
    self.bd='dev_escolas';
    self.site='http://127.0.0.1:5984';

  },

  validaUser:function(){
    var self=this;
    //esconder os botões de inserir e editar a todos excepto o Administrador
    var role = ''+window.localStorage.getItem('Role');

    if( role != "Administrador do Sistema"){
      $("#btnSchoolsEdit").attr("style","visibility:hidden");
      $("#btnSchoolNew").attr("style","visibility:hidden");
    }
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


    modem('GET', 'schools', function(data) {
      $('#schoolsBadge').text(data.length);
      var s='';
      var first=true;
      for(i=0;i<data.length;i++){
         s+= '<button id="'
          + data[i].doc._id
          + '"  name="' +data[i].doc._id+'"  type="button" style="height:60px; text-align:left; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block schoolSelec" >'
          +' <img src="data:'+data[i].doc._attachments['escola.jpg'].content_type
                    +';base64,'
                    +data[i].doc._attachments['escola.jpg'].data
                    +'" style="height:30px;" > '
        + data[i].doc.nome + '</button>';
        if(first){
          $('#schoolsPreview').html(self.encheEscPreview(data[i].doc));
          self.validaUser();
          first=false;
        }
      }

      $("#schoolsContent").html(s);
      document.getElementById(data[0].doc._id).focus();

       //Criar Eventos
      var myEl = document.getElementsByClassName('schoolSelec');
      for(j=0;j<myEl.length;j++){
        myEl[j].addEventListener('click', function() {
                      self.mudaEscola(this);
                    }, false);
      };
      myEl = document.getElementById('btnSchoolsEdit');
      myEl.addEventListener('click', function() {
                    self.editEscola(this);
                  }, false);
    }, function(error) {
      console.log('Error getting schools list!');
    });

      return this;

  },

  mudaEscola: function(obj){
    var self=this;
    //vai buscar os dados da escola:
    modem('GET','schools/'+obj.id, function(json){
      $('#schoolsPreview').html(self.encheEscPreview(json));
      self.validaUser();
      var myEl = document.getElementById('btnSchoolsEdit');
      myEl.addEventListener('click', function() {
                    self.editEscola(this);
                  }, false);
    },
    function(error) {
      console.log('Error getting schools list!');
    });
    },

  encheEscPreview: function(documnt){
    var self=this;
    var html='';
    html+= '<img src="'+self.site+'/'+self.bd+'/'+documnt._id+'/escola.jpg"  style="height:220px;">';
    html+= '<br><div align=left class="col-md-9"><span>Nome: <label id="EscolaNome" value="'
        + documnt._id+'">'+documnt.nome+'</label></span>';
    html+= '<br><span>Morada: <label>'+documnt.morada+' </label></span></div>';

    //Botão para Editar
    html+='<div align=right class="col-md-2"><br><br><br>'
        +'<button id="btnSchoolsEdit" class="btn btn-warning" style="font-size:10px">'
        +'<span class="glyphicon glyphicon-pencil" style="color:#ffff00;"></span>'
        +' Editar dados'
        +'</button></div>';


    // ciclo for para ir buscar as turmas
      if(documnt.turmas.length > 0){
        html+='<div class="col-md-12" align=left><hr><label>Turmas:</label></div>'
            + '<div class="col-md-12" style="max-height:225px; overflow:auto">';
        for(j=0; j< documnt.turmas.length; j++){
          html+='<div class="col-md-3"><br>'
              + '<button id="btnTurma'+[j]+'" class="btn btn-info mostraTurma" style="font-size:11px" '
              + 'value="'+documnt.turmas[j]._id+'">'
              + documnt.turmas[j].ano+'º Ano, '+documnt.turmas[j].nome+'</button></div>';
        }
        html+='</div>';
      }
      else{
        html+='<div class="col-md-12 alert-warning" align=center ><hr><label>Esta escola não tem turmas.</label></div>';
      }

    return html;
  },

});
