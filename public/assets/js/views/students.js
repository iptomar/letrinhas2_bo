window.StudentsView = Backbone.View.extend({
  events: {
     "click #btnStudentsNew":"newAluno",
     "keyup #alunoProcurar":"searchAluno",
     },

   searchAluno: function(){
    var self=this;
    var str1= $("#alunoProcurar").val();
    var myBotoes = document.getElementsByClassName('studSelec');
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
      $('#studentsBadge').text(cont);
    }
   },

   newAluno: function(e) {
    e.preventDefault();
    app.navigate('/students/new', {
    trigger: true
    });
  },

  editAluno: function (obj) {
    //Variavel a enviar, para depois poder buscar os dados do aluno a editar
    window.localStorage.setItem("AlunoEditar", obj.name);
    app.navigate('man', {
      trigger: true
    });
  },

  initialize: function() {
    var self=this;
    self.bd='dev_alunos';
    self.site='http://127.0.0.1:5984';
  },

  render: function() {
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

    var self=this;
    modem('GET', 'students', function(data) {
      $('#studentsBadge').text(data.length);
      var s='';
        var first=true;
      for(i=0;i<data.length;i++){
          if(data[i].doc.estado=='Ativo' || data[i].doc.estado==true || data[i].doc.estado== 1){
        s+= '<button id="'
          + data[i].doc._id
          + '"  name="' +data[i].doc._id+'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block studSelec" >'+'<img src="data:'
            +data[i].doc._attachments['aluno.jpg'].content_type
            +';base64,'
            +data[i].doc._attachments['aluno.jpg'].data
            +'"  style="height:25px;"> - '+ data[i].doc.nome + '</button>';
            if(first){
              $('#studentsPreview').html(self.encheStudPreview(data[i].doc));
              self.validaUser();
              first=false;
            }
        }
    }
    $('#studentsContent').html(s);
    self.getTurma(data[0].doc.turma);
    document.getElementById(data[0].doc._id).focus();
    // até aqui é o preview
    //Criar Eventos
    var myEl = document.getElementsByClassName('studSelec');
    for(j=0;j<myEl.length;j++){
      myEl[j].addEventListener('click', function() {
                    self.mudaAluno(this);
                  }, false);
    };
    myEl = document.getElementById('btnStudentsEdit');
    myEl.addEventListener('click', function() {
                    self.editAluno(this);
                  }, false);
    }, function(error) {
      console.log('Error getting students list!');
    });
      return this;
  },

  mudaAluno: function(obj){
    var self=this;
    //vai buscar os dados do aluno:
    modem('GET','students/'+obj.id, function(json){
      $('#studentsPreview').html(self.encheStudPreview(json));
      self.validaUser();
      var myEl = document.getElementById('btnStudentsEdit');
      myEl.addEventListener('click', function() {
                    self.editAluno(this);
                  }, false);
      self.getTurma(json.turma);

    },
    function(error) {
      console.log('Error getting students list!');
    });
  },

  getTurma: function(turma){
    var s='';
    modem('GET','schools', function(json){
      for(i=0; i< json.length; i++){
        for(j=0; j< json[i].doc.turmas.length; j++){
          if(turma == json[i].doc.turmas[j]._id){
            $("#turmaAluno").text(json[i].doc.turmas[j].ano+"º ano, "+json[i].doc.turmas[j].nome+" da "+ json[i].doc.nome);
            return;
          }
        }
      }
    },
    function(error) {
      console.log('Error getting schools list!');
    });
  },

  encheStudPreview: function(documnt){
    var self=this;
    var html='';
    html+= '<img src="'+self.site+'/'+self.bd+'/'+documnt._id+'/aluno.jpg"  style="height:220px;">';
    html+= '<br><div align=left class="col-md-9"><span>Nome: <label id="alunoNome">'+documnt.nome+'</label></span>';
    html+= '<br><span>Numero de Aluno: <label>'+documnt.numero+' </label></span>';
    html+= '<br><span >Turma: <label id="turmaAluno">Sem Turma...</label></span></div>';
    //Botão para Editar
    html+='<div align=right class="col-md-2"><br><br><br>'
        +'<button id="btnStudentsEdit" class="btn btn-warning" style="font-size:10px">'
        +'<span class="glyphicon glyphicon-pencil" style="color:#ffff00;"></span>'
        +' Editar dados'
        +'</button>'
        +'</div><br><br><br><br><hr>'
        +'Apresentar nível de evolução...<img src="../img/inConstruction.jpg"  style="height:40px;"><br><hr>'
        +'Listar Resoluções feitas (Corrigidas ou  não)...<img src="../img/inConstruction.jpg"  style="height:40px;"><br><hr>';

    return html;

  },

  validaUser:function(){
    var self=this;
    //esconder os botões de inserir e editar a todos excepto o Administrador
    var role = ''+window.localStorage.getItem('Role');

    if( role != "Professor" && role != "Administrador do Sistema"){
      $("#btnStudentsEdit").attr("style","visibility:hidden");
      $("#btnStudentsNew").attr("style","visibility:hidden");
    }
  },

});
