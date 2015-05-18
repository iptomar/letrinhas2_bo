window.StudentsNewView = Backbone.View.extend({
    events: {
        "click #buttonCancelar": "buttonCancelarAluno",



    },
    initialize: function () {},

    buttonCancelarAluno: function (e) {
        e.preventDefault();
        window.history.back();
    },




    render: function () {
        var self = this;
        $(this.el).html(this.template());

        modem('GET', 'schools',
            function (escolas) {
                var optName = "";
                var optID = "";
                for (i = 0; i < escolas.length; i++) {
                    optName += "<option>" + escolas[i].doc.nome + "</option>";
                    optID += "<option>" + escolas[i].doc._id + "</option>";
                }

                $("#selectEscola").html(optName);
                $("#selectIDEscola").html(optID);

                //adicionar os eventos para o select da Escola.
                var myEl = document.getElementById('selectEscola');
                myEl.addEventListener('change', function () {
                    var i = this.selectedIndex;
                    //igualar os indexes
                    document.getElementById('selectIDEscola').selectedIndex = i;
                    }, false);
            self.getTurma(escolas[0].doc, $("#Ano").val());
            
            },
                     
            function (xhr, ajaxOptions, throwError) {
                var json = JSON.parse(xhr.responseText);
                console.log("\Erro");
                console.log(json.message.error);
                console.log(json.result);
            });



        return this;
    },
    
    /*getTurma.funcion(){


    },*/
    

    
});