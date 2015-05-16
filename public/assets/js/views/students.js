window.StudentsView = Backbone.View.extend({
  events: {
     "click #btnStudentsNew":"newAluno",
   },

   newAluno: function(e) {
    e.preventDefault();
    app.navigate('/students/new', {
    trigger: true
    });
  },

  editAluno: function (obj) {
    //Variavel a enviar, para depois poder buscar os dados do professor a editar
    window.localStorage.setItem("AlunoEditar", obj.name);
    app.navigate('/students/edit', {
      trigger: true
    });
  },

  initialize: function() {},

  render: function() {
    $(this.el).html(this.template());

  modem('GET', 'students', function(data) {
      $('#studentsBadge').text(data.length);
      var s='';
        var first=true;
      for(i=0;i<data.length;i++){
          if(data[i].doc.estado=='Ativo' || data[i].doc.estado==1){
        s+= '<button id="'
          + data[i].doc._id
          + '"  name="' +data[i].doc._id+'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block studSelect" >'+'<img src="data:'
            +data[i].doc._attachments['aluno.png'].content_type
            +';base64,'
            +data[i].doc._attachments['aluno.png'].data
            +'"  style="height:25px;">'+ data[i].doc.nome + '</button>';
              if(first){
            $('#studentsPreview').html(self.enchePreview(data[i].doc));
            first=false;
            }
        }
    }

    $('#studentsContent').html(s);

      document.getElementById(data[0].doc._id).focus();

      //Criar Eventos
      var myEl= document.getElementsByClassName('studSelec');
      for(j=0;j<myEl.length;j++){
        myEl[j].addEventListener('click', function() {
                      self.mudaAluno(this);
                    }, false);
      };
      myEl = document.getElementById('btnStudentsEdit');
      myEl.addEventListener('click', function() {
                    self.editTeacher(this);
                  }, false);

        // até aqui é o preview

      $('#studentsContent').html(s);

      var url='';

        console.log(data[0].doc.nome);
        console.log(data[0].doc._attachments);

        //= URL.createObjectURL(data[0].doc._attachments.data);
        //console.log(url);

/*
        console.log(data[0]);
        var conteudo='';
        conteudo+= '<img src="data:'+data[0].doc._attachments['aluno.png'].content_type+';base64,'+data[0].doc._attachments['aluno.png'].data+'"  style="height:250px;">';

            conteudo+= '<br><label>'+data[0].doc.nome+' </label><br>';
            conteudo+= '<label>'+data[0].doc.numero+'</label><br>';

        $('#studentsPreview').html(conteudo);

*/
    }, function(error) {
      console.log('Error getting students list!');
    });

      return this;

  },

//TESTE

    mudaAluno:function(obj){
    var self=this;
    //vai buscar os dados do aluno:
    modem('GET','students/'+obj.id, function(json){
      $('#studentsPreview').html(self.encheStudPreview(json));
      var myEl = document.getElementById('btnStudentsEdit');
      myEl.addEventListener('click', function() {
                    self.editStudent(this);
                  }, false);

    },
    function(error) {
      console.log('Error getting students list!');
    });
  },

  encheStudPreview: function(documnt){
    var html='';
    html+= '<img src="http://localhost:5984/dev_alunos/'+documnt._id+'/aluno.png"  style="height:220px;">';
    html+= '<br><div align=left class="col-md-9"><span>Nome: <label id="profNome">'+documnt.nome+'</label></span>';
    html+= '<br><span>Telefone: <label>'+documnt.numero+' </label></span>';
    html+= '<br><span>Tipo de utilizador: <label>'+documnt.turma+' </label></span></div>';
    //Botão para Editar
    html+='<div align=right class="col-md-2"><br><br><br>'
        +'<button id="btnStudentsEdit" class="btn btn-warning" style="font-size:10px">'
        +'<span class="glyphicon glyphicon-pencil" style="color:#ffff00;"></span>'
        +' Editar dados'
        +'</button>'
        +'</div><br><br><br><br><hr>';

    return html;
  },

    //FIM DO TESTE







});
