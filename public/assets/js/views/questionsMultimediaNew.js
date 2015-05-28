window.QuestionsMultimediaNew = Backbone.View.extend({
  events: {},
  initialize: function() {},

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

    return this;
  }
});
