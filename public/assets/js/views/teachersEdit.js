window.TeachersEditView = Backbone.View.extend({
  events: {},
  initialize: function() {},

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

    modem('GET', 'teachers', function(data) {
      $('#subcontent', self.el).html(JSON.stringify(data));
    }, function(error) {
      console.log('Error getting teacher list!');
    });

    return this;
  }
});
