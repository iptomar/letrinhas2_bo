
window.UserView = Backbone.View.extend({
  events:{
    "click #btnUserEdit": "editUser",
  },

  editUser: function (obj) {
    //Variavel a enviar, para depois poder buscar os dados do professor a editar
    window.sessionStorage.setItem("ProfEditar", window.localStorage.getItem('ProfID'));
    app.navigate('teachers/edit', {
      trigger: true
    });
  },

  initialize: function () {
    var self=this;

    self.bd='dev_professores';
    self.bd2='dev_escolas';
    self.site='http://127.0.0.1:5984';
  },

  render: function () {
    $(this.el).html(this.template());
    //verificar se está logado
    var controlo=window.localStorage.getItem("Logged");
    if(!controlo){
      console.log('Não Logado');
      app.navigate('/#', {
          trigger: true
        });
        return null;
    }

    var role = ''+window.localStorage.getItem('Role');
    //criar restrições a opções consoante as permissões do utiizador.
    if(role == "Administrador do Sistema"){
      setTimeout(function(){
        $("#opDef").attr("style","display:show");
        $("#sepProf").attr("style","display:show");
      },1);
    }

    setTimeout(function(){
      $("#user").text(window.localStorage.getItem("ProfID"));
    },2);

    var self=this;

    modem('GET', 'teachers/'+window.localStorage.getItem("ProfID"), function(user) {
      $("#userFoto").attr('src',self.site+'/'+self.bd+'/'+window.localStorage.getItem("ProfID")+'/prof.jpg');
      $("#tipoFunc").text(user.tipoFuncionario);
      $("#nome").text(user.nome);
      $("#dados").text("Dados de "+user._id);
      $("#telefone").text(user.telefone);

      modem('GET', 'schools', function(escolas) {
        var userr = window.localStorage.getItem("ProfID");
        var conta=0;
        var estaEscola=false;
        var estaTurma=false;
        var btnTurma='';
        var linhaEscola='';

        console.log(escolas[0].doc.nome);
        for (var i = 0; i < escolas.length; i++) {
          for (var j = 0; j < escolas[i].doc.turmas.length; j++) {
            for (var k = 0; k < escolas[i].doc.turmas[j].professores.length; k++) {
              console.log(escolas[i].doc.turmas[j].professores[k].id);
              console.log(userr);
              if(escolas[i].doc.turmas[j].professores[k].id== userr){
                console.log("iguais:");
                console.log(escolas[i].doc.turmas[j].professores[k].id);
                console.log(userr);
                conta++;
                estaTurma=true;
                estaEscola=true;
                break;
              }
            }
            //cria botão de turma
          }
          //cria linha de escola e insere os botões de turmas
        }

        $("#numTurmas").text(conta);

      }, function(erro2) {
        console.log('Error getting schools');
      });

    }, function(error) {
      console.log('Error getting user '+window.localStorage.getItem("ProfID"));
    });



    return this;
  }

});
