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
            self.getTurma(escolas[0].doc, $("#selectAno").val());
            
            },
                     
            function (xhr, ajaxOptions, throwError) {
                var json = JSON.parse(xhr.responseText);
                console.log("\Erro");
                console.log(json.message.error);
                console.log(json.result);
            });



        return this;
    },
    
    getTurma:function(escola,ano){
        console.log("ano: "+ano);
        modem('GET','schools/'+escola._id,
           function (escolaRec){
               var turmas='';
                var turmaId='';
                for(i=0;i<escolaRec.turmas.length;i++){
                    console.log("turma ano: "+escolaRec.turmas[i].ano);
                    if (escolaRec.turmas[i].ano == ano){
                        turmas+= "<option>" + escolaRec.turmas[i].nome + "</option>";
                        turmaId+= i+":";
                    }
                }
                $("#selectTurma").html(turmas);
                $("#selectIDTurma").val(turmaId); 
    
}, 
    function (xhr, ajaxOptions, throwError) {
                var json = JSON.parse(xhr.responseText);
                console.log("\Erro");
                console.log(json.message.error);
                console.log(json.result);
            }); 
        return false;
},
    
});