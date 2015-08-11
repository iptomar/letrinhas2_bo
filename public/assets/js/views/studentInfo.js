
window.StudentInfo = Backbone.View.extend({
  events:{

  },
  initialize: function () {
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

    modem('GET', 'teachers/'+window.localStorage.getItem("ProfID"), function(data) {
      $("#user").text(data.nome);
    }, function(error) {
      console.log('Error getting user '+window.localStorage.getItem("ProfID"));
    });

    var aluno = window.sessionStorage.getItem("Aluno");
    console.log(aluno);
    return this;
  }

});
