window.QuestionsInterpNew = Backbone.View.extend({
  events: {
    "click #buttonCancelar":"cancelar",
    "click #txtGrava":"showEqualizador",
    "click #txtMarca":"mostraMarcador",
    "click #txtEdita":"mostraTextArea",
    "click .picavel":"picaPalavra",
    "change .preenche":"verificarCampos",
    "submit":"contarMarcados",
    "click #intGrava":"showEqualizer",
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

  showEqualizer:function(e){
    e.preventDefault();
    var self=this;
    //getTexto.
    $("#rTexto").html($("#InputTexto").val());
    $("#myModalRecord").modal("show");
    initAudio();
  },

  contarMarcados:function(){
    var self=this;
    //guardar o id do prof
    var input = $("<input>").attr("type", "hidden")
                        .attr("name", "profID")
                        .val(window.localStorage.getItem("ProfID"));
    $("#painelInvisivel").append($(input));

    //conta quantas palavras estão marcadas!
    var conta=0;

    var myPic = document.getElementsByClassName('picavel');
    for (var j = 0; j < myPic.length; j++) {
      if($(myPic[j]).attr("value")==1){
        //entregar a posição
        input = $("<input>").attr("type", "hidden")
                            .attr("name", "pos"+conta)
                            .val($(myPic[j]).attr("val"));
        $("#painelInvisivel").append($(input));
        conta++
      }
    }

    //entregar quantas estão marcadas
    input = $("<input>").attr("type", "hidden")
                            .attr("name", "nMarcas")
                            .val(conta);
    $("#painelInvisivel").append($(input));

  },

  verificarCampos: function() {
    var self=this;
    //buscar todos os campos obrigatórios
    var myEl = document.getElementsByClassName('preenche');
    var cont=0;

    //verificar se os campos estão preenchidos
    for(i=0;i<myEl.length; i++){
      if($(myEl[i]).val().length!=0){
        cont++;
      }
    }

    //verifica se pelo menos uma palavra está marcada!
    var myPic = document.getElementsByClassName('picavel');
    for (var j = 0; j < myPic.length; j++) {
      if($(myPic[j]).attr("value")==1){
        self.isMarcado=true;
        break;
      }
      else{
        self.isMarcado=false;
      }
    }

    //se todos estão preenchidos, então hbilita o botão de submeter.
    if(cont == myEl.length && self.isMarcado){
      //habilitar o botão de submeter
      document.getElementById("subTesteInt").disabled = false;

    }
    else{
      //senão desabilitar o botão de submeter
      document.getElementById("subTesteInt").disabled = true;
    }
  },


  mostraTextArea:function(e){
    e.preventDefault();
    var self=this;
    //limpar o marcardor
    $("#marcador").html('');
    $("#marcador").attr("style","display:none");
    $("#InputTexto").attr("style","display:show; background-color:#e9e9ff;");
    $("#txtMarca").attr("style","display:show");
    $("#txtEdita").attr("style","display:none");
    $("#help").text('');
    self.isMarcado=false;
    self.verificarCampos();

  },

  mostraMarcador:function(e){
    e.preventDefault();
    var self=this;
    var posicao=1;
    var linha="<p>";
    var s='<span class="picavel" value=0 val=';
    var s1=' style="cursor:pointer">';
    var palavra= s + posicao + s1;
    var isCaracter=true;
    var texto=$("#InputTexto").val();
    if(texto.length!=0){
      for (var i = 0; i < texto.length; i++) {
        //de acordo com a tabela ascii 1º caracter possivel '!' CODE 33
        if(texto.charCodeAt(i)<33){
          //se o caracter anterior for válido
          if(isCaracter){
            //fecha a palavra
            palavra+=' </span> ';
            posicao++;
            //adiciona a palavra à linha
            linha+=palavra;
            //reinicia a palavra
            palavra= s + posicao + s1;
            //não e um caracter válido (ex: "enter", "space", "tab")
            isCaracter=false;
            //verifica se encontrou o "enter" CODE 10
            if(texto.charCodeAt(i)==10){
              //fecha a linha
              linha+=' </p>';
              //entrega a linha ao painel
              $("#marcador").append($(linha));
              //reinicia a linha
              linha="<p>";
            }
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
        palavra+=' </span> </p>';
        linha+= palavra;
        $("#marcador").append($(linha));
      }

      $("#marcador").attr("style","display:show; height:220px; background-color:#ffe9e9; overflow:auto");
      $("#InputTexto").attr("style","display:none");
      $("#txtMarca").attr("style","display:none");
      $("#txtEdita").attr("style","display:show");
      $("#help").text('Clique nas palavras, para marcar as que considera as respostas corretas.');

    }else{
      alert("Tem de preencher a àrea de texto, antes de tentar marcar este!");
    }

  },

  cancelar:function(e){
    window.history.back();
  },

  picaPalavra:function(e){
    e.preventDefault();
    var self = this;
    var obj=e.toElement;

    if($(obj).attr("value")==0){
      $(obj).attr("class","picavel badge");
      $(obj).attr("value",1);
    }
    else{
      $(obj).attr("class","picavel");
      $(obj).attr("value",0);
    }

    self.verificarCampos();
  },

  showEqualizador:function(e){
    e.preventDefault();
  },

  initialize: function() {
    var self=this;
    self.isMarcado=false;
  },

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
  }
});
