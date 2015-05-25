window.TeachersView = Backbone.View.extend({
  events: {
    "click #btnTeachersNew": "newTeacher",

  },

  initialize: function() {
    var self=this;
    self.bd='dev_professores';
    self.site='http://127.0.0.1:5984';
  },


  render: function() {
    $(this.el).html(this.template());

    var self=this;

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
          +' <img src="data:'+data[i].doc._attachments['prof.png'].content_type
                      +';base64,'
                      +data[i].doc._attachments['prof.png'].data
                      +'" style="height:25px;" > '
          + data[i].doc.nome + '</button>';

          if(first){
            $('#teachersPreview').html(self.enchePreview(data[i].doc));
            first=false;
          }
        }
      }

      $('#teachersContent').html(s);

      self.getTurmas();

      document.getElementById(data[0].doc._id).focus();

      //Criar Eventos
      var myEl = document.getElementsByClassName('profSelec');
      for(j=0;j<myEl.length;j++){
        myEl[j].addEventListener('click', function() {
                      self.mudaProf(this);
                    }, false);
      };
      myEl = document.getElementById('btnTeachersEdit');
      myEl.addEventListener('click', function() {
                    self.editTeacher(this);
                  }, false);

    }, function(error) {
      console.log('Error getting teachers list!');
    });

    return this;
  },

  getTurmas:function(){
    var self=this;
    modem('GET','schools', function(json){
      var s='<div align="left">';
      var has=false;
      var contTurmas=0;
      for(i=0; i< json.length; i++){
        var escola="<div><div class='col-md-7'><label>"+json[i].doc.nome+': </label></div>';
        var turma='';
        for(j=0; j< json[i].doc.turmas.length; j++){
          for(k=0; k<json[i].doc.turmas[j].professores.length; k++){
            var g=""+json[i].doc.turmas[j].professores[k].id;
            var f=""+$("#profEmail").text();
            if(f == g){
              has=true;
            }
          }
          if(has){
            turma+='<span> - '+json[i].doc.turmas[j].nome+'</span><br>';
            has=false;
            contTurmas++;
          }
        }
        if(turma.length>1){
          s+=escola+"<div class='col-md-4'>"+turma+"<br></div></div><br>";
        }
      }
      if(contTurmas>0){
        s+="</div>";
        $("#SchoolTable").html(s);
        $("#prfSchool").text($("#profNome").text()+", tem "+contTurmas+" turmas associadas.");
      }
    },
    function(error) {
      console.log('Error getting schools list!');
    });



  },

  mudaProf:function(obj){
    var self=this;
    //vai buscar os dados do professor:
    modem('GET','teachers/'+obj.id, function(json){
      $('#teachersPreview').html(self.enchePreview(json));
      var myEl = document.getElementById('btnTeachersEdit');
      myEl.addEventListener('click', function() {
                    self.editTeacher(this);
                  }, false);
      self.getTurmas();
    },
    function(error) {
      console.log('Error getting teachers list!');
    });
  },

  enchePreview: function(documnt){
    var self=this;
    var html='';
    html+= '<img src="'+self.site+'/'+self.bd+'/'+documnt._id+'/prof.png"  style="height:220px;">';
    html+= '<br><div align=left class="col-md-9"><span>Nome: <label id="profNome">'+documnt.nome+'</label></span>';
    html+= '<br><span>E-mail: <label id="profEmail">'+documnt._id+'</label></span>';
    html+= '<br><span>Telefone: <label>'+documnt.telefone+' </label></span>';
    html+= '<br><span>Tipo de utilizador: <label>'+documnt.tipoFuncionario+' </label></span></div>';
    //Botão para Editar
    html+='<div align=right class="col-md-2"><br><br><br>'
        +'<button id="btnTeachersEdit" class="btn btn-warning" style="font-size:10px">'
        +'<span class="glyphicon glyphicon-pencil" style="color:#ffff00;"></span>'
        +' Editar dados'
        +'</button>'
        +'</div><br><br><br><br><hr>';
    html+= '<div id="prfSchool" class="col-md-12" align=left>'+documnt.nome+', não tem turmas associadas.</div><br><br>';
    html+= '<div id="SchoolTable" class="col-md-12" align="center" style="max-height:220px; overflow:auto"></div>';

    return html;
  },


  newTeacher: function (e) {
    e.preventDefault();
    app.navigate('/teachers/new', {
      trigger: true
    });
  },

  editTeacher: function (obj) {
    //Variavel a enviar, para depois poder buscar os dados do professor a editar
    window.localStorage.setItem("ProfEditar", obj.name);
    app.navigate('man', {
      trigger: true
    });
  },



});
