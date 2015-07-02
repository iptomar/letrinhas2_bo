window.QuestionsInterpNew = Backbone.View.extend({
  events: {
    "click #buttonCancelar":"cancelar",
    "click #txtGrava":"showEqualizador",
    "click #txtMarca":"mostraMarcador",
    "click #txtEdita":"mostraTextArea",
    "click .picavel":"picaPalavra",
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


  },

  mostraMarcador:function(e){
    e.preventDefault();
    var self=this;
    var posicao=0;
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
    var obj=e.toElement;

    console.log("picou! na "+(parseInt($(obj).attr("val"))+1)+"ª posição. value:"+$(obj).attr("value"));
    if($(obj).attr("value")==0){
      $(obj).attr("class","picavel badge");
      $(obj).attr("value",1);
    }
    else{
      $(obj).attr("class","picavel");
      $(obj).attr("value",0);
    }


  },

  showEqualizador:function(e){
    e.preventDefault();
  },

  initialize: function() {
    var self=this;
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
