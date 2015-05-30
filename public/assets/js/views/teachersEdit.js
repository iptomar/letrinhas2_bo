window.TeachersEditView = Backbone.View.extend({
  events: {
    "click .edita":"habilitaEdicao",
    "submit":"submitEdition",


  },

  habilitaEdicao:function(e){
    var self=this;
      var obj=e.toElement;
      if($("#"+$(e.toElement).attr('value')).attr('disabled')){
        self.valor = $("#"+$(e.toElement).attr('value')).val();
        $("#"+$(e.toElement).attr('value')).val('');

        $("#"+$(e.toElement).attr('value')).attr('disabled',false);
        $(e.toElement).removeClass("glyphicon-edit");
        $(e.toElement).removeClass("btn-warning");
        $(e.toElement).addClass("glyphicon-ok");
        $(e.toElement).addClass("btn-success");
        $(e.toElement).attr('style','');
      }
      else{
        try{
          if($("#"+$(e.toElement).attr('value')).val().length == 0){
            self.alterado=false;
            $("#"+$(e.toElement).attr('value')).val(self.valor);
          }
          else{
            if($("#"+$(e.toElement).attr('value')).val() == self.valor){
              self.alterado=false;
            }
            else{
              self.alterado=true;
            }
          }
        }
        catch(e){
          self.alterado=false;
        };
        $("#"+$(e.toElement).attr('value')).attr('disabled',true);
        $(e.toElement).removeClass("glyphicon-ok");
        $(e.toElement).removeClass("btn-success");
        $(e.toElement).addClass("glyphicon-edit");
        $(e.toElement).addClass("btn-warning");

      }

  },



  submitEdition:function(e){
    //mudar a ação para o professor a editar
    e.target.action="/teachers/"+window.sessionStorage.getItem("ProfEditar");
    window.sessionStorage.remove("ProfEditar");
  },

  initialize: function() {
    var self=this;
    self.bd='dev_professores';
    self.site='http://127.0.0.1:5984';

  },

  render: function() {
    var self = this;
    //verificar se está logado
    var controlo=window.localStorage.getItem("Logged");
    if(!controlo){
      console.log('Não Logado');
      app.navigate('/#login', {
          trigger: true
        });
        return null;
    }

    $(this.el).html(this.template());

    modem('GET', 'teachers/'+window.sessionStorage.getItem("ProfEditar"), function(professor) {
      self.nome=professor.nome;
      self.eMail = professor._id;
      self.estado = professor.estado;
      self.pwd = professor.password;
      self.pin = professor.pin;
      self.telefone = professor.telefone;
      self.tipoFunc = professor.tipoFuncionario;

      $("#InputNome").val(self.nome);
      $("#InputEmail").val(self.eMail);
      $("#InputPasswd").val(self.pwd);
      $("#inputPin").val(self.pin);
      $("#InputTelefone").val(self.telefone);
      $("#iFoto").attr("src",self.site+'/'+self.bd+'/'+professor._id+'/prof.jpg');

      switch (professor.tipoFuncionario) {
        case "Administrador do Sistema":
            document.getElementById('selectTipo').selectedIndex=0;
          break;
        case "Professor":
            document.getElementById('selectTipo').selectedIndex=1;
          break;
        case "Auxiliar":
            document.getElementById('selectTipo').selectedIndex=2;
          break;
      }

      if(professor.estado){
        document.getElementById('selectEstado').selectedIndex=0;
      }
      else{
        document.getElementById('selectEstado').selectedIndex=1;
      }


    }, function(error) {
      console.log('Error getting teacher list!');
    });



    return this;
  }
});
