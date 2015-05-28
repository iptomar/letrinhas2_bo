window.SchoolsView = Backbone.View.extend({
  events: {
    "click #btnSchoolNew":"newEscola",
    "click .mostraTurma":"mostraTurma",
   },

   mostraTurma:function(e){
     var self=this;

     var s = '#'+e.toElement.id;
     console.log(e.toElement.id);
     console.log($(s).text());

     //preencher um modal...
     $("#myModalLabel").text($(s).text()+' - '+ $("#EscolaNome").text());

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
    app.navigate('/schools/edit', {
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


    modem('GET', 'schools', function(data) {
      $('#schoolsBadge').text(data.length);
      var s='';
      var first=true;
      for(i=0;i<data.length;i++){
         s+= '<button id="'
          + data[i].doc._id
          + '"  name="' +data[i].doc._id+'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block schoolSelec" >'
          +' <img src="data:'+data[i].doc._attachments['escola.jpg'].content_type
                    +';base64,'
                    +data[i].doc._attachments['escola.jpg'].data
                    +'" style="height:25px;" > '
        + data[i].doc.nome + '</button>';
        if(first){
          $('#schoolsPreview').html(self.encheEscPreview(data[i].doc));
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
      self.makeTurmas();
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
    html+= '<br><span>Morada da Escola: <label>'+documnt.morada+' </label></span></div>';

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
