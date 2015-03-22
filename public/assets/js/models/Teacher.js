var Teacher = Backbone.Model.extend({
  initialize: function (options) {
    this.id = options.id;
  },
  fetch: function (after_fetch) {
    var self = this;

    modem('GET', 'teachers/' + this.id,
      function (json) {
        self.set("nome", json.nome);
        self.set("telefone", json.telefone);
        self.set("password", json.password);
        self.set("pin", json.pin);
        self.set("estado",json.true);

        after_fetch();
      },
      function (xhr, ajaxOptions, thrownError) {
        var json = JSON.parse(xhr.responseText);
        error_launch(json.message);
      }
    );
  }
});
