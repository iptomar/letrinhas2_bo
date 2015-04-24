
window.LoginView = Backbone.View.extend({
  events:{
        "submit": "buttonEntrar",
        "keypress .form-control": "keyApaga",
  },
  initialize: function () {
    var self=this;

  },

  keyApaga: function(e){
    $('#spEmail').attr("style","visibility:hidden");
    $('#spEmail').text("e");
    $('#spPsswd').attr("style","visibility:hidden");
    $('#spPsswd').text("e");

  },

  buttonEntrar: function (e) {
    e.preventDefault();
    var self = this;
    //verificar se input email está vazio
    if($('#userEmail').val().length==0){
      $('#spEmail').text("Este campo deve ser preenchido.");
      $('#spEmail').attr("style","visibility:initial");
      $('#spPsswd').attr("style","visibility:hidden");
      $("#userEmail").focus();
      $("#psswrd").val("");
    }
    else{
      //Validar o email com as cenaças do costume....(TI2).
      /*######################################################################################/
      if(email != válido){
        $('#spEmail').text("Introduza um e-mail válido!");
        $('#spPsswd').attr("style","visibility:hidden");
        $('#spEmail').attr("style","visibility:initial");
        $("#userEmail").focus();
        $("#psswrd").val("");
      }
      //Se válido
      else{
        //verificar primeiro se passwd está preenchida
        */
        if($('#psswrd').val().length==0){
          $('#spEmail').attr("style","visibility:hidden");
          $('#spPsswd').text("Este campo deve ser preenchido.");
          $('#spPsswd').attr("style","visibility:initial");
          $("#psswrd").focus();
        }
        else{

          //1º Buscar o professor pelo e-mail
          /*
          ///Agora é que a "porca torce o rabo"
          //####################################*/

          modem('GET', 'teachers/' + $('#userEmail').val(),
              function (json) {
                console.log("\nResultado:\n");
                self.model.set("idProf", json._id);
                self.model.set("nome", json.nome);

                console.log(json._id);

                // vamos comparar as password's
                if(json.password == $("#psswrd").val()){
                  //Segue para o Menu Principal.
                  app.navigate('/MenuPrincipal', {
                      trigger: true
                    });

                }
                else{
                  $('#spEmail').attr("style","visibility:hidden");
                  $('#spPsswd').text("A password que inseriu está incorrecta.");
                  $('#spPsswd').attr("style","visibility:initial");
                  $("#psswrd").val("");
                  $("#psswrd").focus();
                }

              },

              function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                console.log("\nresposta:\n")
                console.log(json.message.error);
                console.log(json.result);


                //###################################
                // se notFound, então
                //  o email introduzido não existe na BD */

                if(json.message.error == 'not_found'){
                  $('#spPsswd').attr("style","visibility:hidden");
                  $('#spEmail').attr("style","visibility:initial");
                  $('#spEmail').text("O e-mail de utilizador que inseriu está incorrecto \n"
                                    +"ou não existe na Base de Dados");
                  $("#userEmail").val("");
                  $("#userEmail").focus();
                  $("#psswrd").val("");
                }

              }
            );

        }

      //#######################
      }
      //testes....
      //console.log(confirm("cenas de pergunta"));
      //console.log(prompt("cenas de pergunta"));

      return false;
    },

  render: function () {
    $(this.el).html(this.template());
    return this;
  }

});
