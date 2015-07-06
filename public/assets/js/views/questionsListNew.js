window.QuestionsListNew = Backbone.View.extend({
  events: {
    "submit":"validaSubmissao",
    "click #buttonCancelar":"cancelTest",
    "blur .preenche":"verificarCampos",
    "click #lstGrava":"showEqualizer",
    "click #record":"eGrava",
  },

  eGrava:function(e){
    var self=this;
    if($("#record").attr("value")==1){
      $("#save").attr("style","color:#80ccee;font-size:16px");
      $("#record").html('<span class="glyphicon glyphicon-record" style="color:#ee0000"></span> Gravar');
      $("#record").attr("value",0);
    }
    else{
      $("#save").attr("style","visibility:hidden");
      $("#record").html('<span class="glyphicon glyphicon-stop" style="color:#ee0000"></span> Parar');
      $("#record").attr("value",1);
      $("#Rplayer").attr("style","visibility:hidden;width:60%");
      $("#Rplayer").stop();
    }

    toggleRecording(e.target);
  },

  showEqualizer:function(){
    var self=this;
    //getColunas.
    $("#cl1").html(self.getPalavras($("#col1").val(),1));
    $("#cl2").html(self.getPalavras($("#col2").val(),2));
    $("#cl3").html(self.getPalavras($("#col3").val(),3));
    $("#myModalRecord").modal("show");
    initAudio();
  },

  cancelTest:function(){
    window.history.back();
  },

  validaSubmissao:function(e){
    if ($("#InputDescricao").val().length==0) {
       e.preventDefault();
       //Teste
       //alert("descrição Vaizia");
       return false; //for old browsers
    } else{

      //adicioinar parametros invisíveis ao form, para tratamento na inserção
      var input = $("<input>").attr("type", "hidden")
                              .attr("name", "profID")
                              .val(window.localStorage.getItem("ProfID"));
      $('#listNewForm').append($(input));
    }

  },


  initialize: function() {},

  render: function() {
    var self=this;
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
    //se não é professor, volta para menuprincipal
    if(role != "Professor"){
        app.navigate('/#', {
          trigger: true
        });
        return null;
    }

    $(this.el).html(this.template());

    return this;
  },

  verificarCampos: function() {
    var self=this;
    //buscar todos os campos obrigatórios
    var myEl = document.getElementsByClassName('preenche');
    var cont=0;

    //verificar se estão preenchidos
    for(i=0;i<myEl.length; i++){
      if($(myEl[i]).val().length!=0){
        cont++;
      }
    }
    //se todos estão preenchidos, então hbilita o botão de submeter.
    if(cont == myEl.length ){
      //habilitar o botão de submeter
      document.getElementById("subList").disabled = false;

    }
    else{
      //senão desabilitar o botão de submeter
      document.getElementById("subList").disabled = true;
    }
  },


  //Função para devolver uma lista de Palavras
  getPalavras: function(texto,nColuna){
    var self=this;
    var listaPalavras= new Array();
    var palavra='';

    var isCaracter=false;
    for(i=0;i<texto.length;i++){
      //de acordo com a tabela ascii 1º caracter possivel '!' CODE 33
      if(texto.charCodeAt(i)<33){
        //se o caracter anterior for válido
        if(isCaracter){
          //enterga a palavra à lista
          listaPalavras.push(palavra);
          //limpa a palavra
          palavra='';
          //não e um caracter válido (ex: "enter", "space", "tab")
          isCaracter=false;
        }
      }
      else{
        //adiciona o caracter à palavra
        palavra+=texto.charAt(i);
        //confirma que era uma caracter
        isCaracter=true;
      }
    }

    //entregar o resto
    if(palavra.length>0){
      listaPalavras.push(palavra);
    }

    var oHtml= '<span class="badge btn-success">Coluna '+nColuna+'</span>';
    for (var i = 0; i < listaPalavras.length; i++) {
      oHtml += '<br>'+listaPalavras[i];
    }

    return oHtml;
  },



});
