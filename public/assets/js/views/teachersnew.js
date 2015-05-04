window.TeachersNewView = Backbone.View.extend({
  events: {
        "click #buttonCancelar": "buttonCancelar",



  },
  initialize: function() {
    var self=this;

    //1º Buscar o professor pelo e-mail
    modem('GET', 'schools',
        function (json) {
          // preencher o select escola
          console.log("nº de escolas: ", json.length);
          var s='';
          for(i=0; i<json.length; i++){
            console.log(json[i].morada+'');

            s+="<option >"+ json[i].nome +"</option>";


          }

          $("#selectEscola").html(s);


        },

        function (xhr, ajaxOptions, thrownError) {
          var json = JSON.parse(xhr.responseText);
          console.log("\nErro:\n")
          console.log(json.message.error);
          console.log(json.result);
        }
      );

  },

    buttonCancelar: function(e) {
    app.navigate('/MenuPrincipal', {
        trigger: true
      });
    },



  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});
