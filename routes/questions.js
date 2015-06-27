require('colors');

//var nano = require('nano')('http://ince.pt:5984');
var nano = require('nano')('http://127.0.0.1:5984');
//var db = nano.use('perguntas');
var db = nano.use('dev_perguntas');
var db2 = nano.use('dev_testes');

exports.upDate = function(rep, res){
  console.log('questions upDate, NotAvaliable yet'.blue);


};

exports.new = function (req, res) {
  console.log('questions new, inConstruction'.green);

  var dati = new Date();
  var idPerg = 'P'+dati.getTime();

  var pergunta;




  switch(req.body.tipo){
    case "Texto":
      pergunta={
        "anoEscolar":req.body.ano_escolar,
        "titulo":req.body.titulo,
        "disciplina":req.body.disciplina,
        "pergunta":req.body.pergunta,
        "conteudo":{
          "texto":req.body.texto,
        },
        "tipo":req.body.tipo,
        "dataCri":dati,
        "profID":req.body.profID,
      };
      var teste={
        "titulo":req.body.titulo,
        "descricao":req.body.descricao,
        "disciplina":req.body.disciplina,
        "anoEscolar":req.body.ano_escolar,
        "perguntas":[idPerg],
        "data":dati,
        "estado":true,
        "professorId":req.body.profID,
        "tipo":req.body.tipo,
      };

      var file;
      if(req.files) file = req.files.file;

      var imgData = require('fs').readFileSync(file.path);

      db.multipart.insert(pergunta, [{
        name: 'voz.mp3',
        data: imgData,
        content_type: 'audio/mp3'
      }], idPerg, function(err, body) {
        if (err) {
          console.log('questions new, an error ocourred'.green);

          return res.status(500).json({
            'result': 'nok',
            'message': err
          });
        }
        console.log('questions added'.green);
        //res.json(body);
        //res.json({'result': 'ok'});
        res.redirect('/#tests');
      });

      db2.insert(teste, function(err,body){
        if (err) {
        console.log('questions new, an error ocourred'.green);

        return res.status(500).json({
          'result': 'nok',
          'message': err
        });
      }
      console.log('teste added'.green);
    });

      break;
    case "Lista":
      pergunta={
        "anoEscolar":req.body.ano_escolar,
        "titulo":req.body.titulo,
        "disciplina":req.body.disciplina,
        "pergunta":req.body.pergunta,
        "conteudo":{
          "palavrasCL1":getPalavras(req.body.cl1),
          "palavrasCL2":getPalavras(req.body.cl2),
          "palavrasCL3":getPalavras(req.body.cl3),
        },
        "tipoTeste":req.body.tipo,
        "dataCri":dati,
        "professorId":req.body.profID,

      };
      var teste={
        "titulo":req.body.titulo,
        "descricao":req.body.descricao,
        "disciplina":req.body.disciplina,
        "anoEscolar":req.body.ano_escolar,
        "perguntas":[idPerg],
        "data":dati,
        "estado":true,
        "professorId":req.body.profID,
        "tipo":req.body.tipo,
      };

      var file;
      if(req.files) file = req.files.file;

      var imgData = require('fs').readFileSync(file.path);

      db.multipart.insert(pergunta, [{
        name: 'voz.mp3',
        data: imgData,
        content_type: 'audio/mp3'
      }], idPerg, function(err, body) {
        if (err) {
          console.log('questions new, an error ocourred'.green);

          return res.status(500).json({
            'result': 'nok',
            'message': err
          });
        }
        console.log('questions added'.green);
        //res.json(body);
        //res.json({'result': 'ok'});
        res.redirect('/#tests');
      });

      db2.insert(teste, function(err,body){
        if (err) {
        console.log('questions new, an error ocourred'.green);

        return res.status(500).json({
          'result': 'nok',
          'message': err
        });
      }
      console.log('teste added'.green);
    });
      break;
    case "Multimédia":
      console.log("1º - tipo ".red + req.body.tipo);
      console.log("2º - titulo ".red + req.body.tituloPerg);
      console.log("3º - pergunta ".red + req.body.Mpergunta);
      console.log("4º - tipo de corpo pergunta ".red + req.body.MtipoPerg);
      console.log("4.1º - a pergunta ".red + req.body.corpo);
      console.log("5º - tipo de corpo de resposta ".red + req.body.MtipoResp);
      console.log("5.1º - resposta certa ".red + req.body.resposta0);
      console.log("5.2º - 1ª errada ".red + req.body.resposta1);
      console.log("5.3º - Nº respostas ".red + req.body.numResp);
      console.log("6º - ProfID ".red + req.body.profID);
      console.log("7º - Disciplina ".red + req.body.disciplina);
      console.log("8º - Ano_escolar ".red + req.body.ano_escolar);

      var opcoes= new Array();
      var anexos= new Array();



      for (i=0; i< req.body.numResp; i++ ){
        var cntd;
        switch (req.body.MtipoResp) {
          case 'texto':
            cntd=req.body['resposta' + i];
            break;
          case 'imagem':
            cntd="";

            var file;
            if(req.files) file = req.files['resposta'+i];

            var imgData = require('fs').readFileSync(file.path);

            var anx={ name: 'op'+(i+1)+'.jpg',
                      data: imgData,
                      content_type: 'image/jpg'
                    };
            anexos.push(anx);
            break;
          default:
        }
        var op={"tipo":req.body.MtipoResp,
                "conteudo":cntd,};
        opcoes.push(op);
      }

      var conteudo;
      switch (req.body.MtipoPerg) {
        case 'texto':
          conteudo= { "idCategoria":0,
                      "tipoDoCorpo":req.body.MtipoPerg,
                      "corpo":req.body.corpo,
                      "opcoes":opcoes,
                    };
          break;
        case 'imagem':
          var file;
          if(req.files) file = req.files.corpo;

          var imgData = require('fs').readFileSync(file.path);
          conteudo= { "idCategoria":0,
                      "tipoDoCorpo":req.body.MtipoPerg,
                      "corpo":"",
                      "opcoes":opcoes,
                      "opcaoCerta":"1",
                    };
          var anx={ name: 'corpo.jpg',
                    data: imgData,
                    content_type: 'image/jpg'
                  };
          anexos.push(anx);
          break;

        case 'audio':
          var file;
          if(req.files) file = req.files.corpo;

          var imgData = require('fs').readFileSync(file.path);
          conteudo= { "idCategoria":0,
                      "tipoDoCorpo":req.body.MtipoPerg,
                      "corpo":"",
                      "opcoes":opcoes,
                      "opcaoCerta":"1",
                    };
          var anx={ name: 'corpo.mp3',
                    data: imgData,
                    content_type: 'audio/mp3'
                  };
          anexos.push(anx);
          break;
        default:

      }

      pergunta={
        "anoEscolar":req.body.ano_escolar,
        "titulo":req.body.tituloPerg,
        "disciplina":req.body.disciplina,
        "pergunta":req.body.Mpergunta,
        "conteudo":conteudo,
        "tipoTeste":req.body.tipo,
        "dataCri":dati,
        "estado":true,
        "professorId":req.body.profID,

      };

      console.log("contudo: "+conteudo);
      console.log("pergunta: "+pergunta);
      console.log("attatchments: "+anexos);


      db.multipart.insert(pergunta, anexos, idPerg, function(err, body) {
        if (err) {
          console.log('questions new, an error ocourred'.green);

          return res.status(500).json({
            'result': 'nok',
            'message': err
          });
        }
        console.log('questions Multimedia added'.green);

        res.redirect('/#questionsMultimedia/new');
      });


    /*  pergunta={
        "anoEscolar":req.body.ano_escolar,
        "titulo":req.body.titulo,
        "disciplina":req.body.disciplina,
        "pergunta":req.body.pergunta,
        "conteudo":{
          "idCategoria":0,//numero,
          "tipoDoCorpo":"imagem , texto, audio",//uma destas opções
          "corpo":"string" //a preencher em tipo=texto
          "opcoes":[
              "tipo":"imagem, texto",
              "conteudo":"string", //se tipo=texto
          ],
          "opcaoCerta":0,//numero
        },
        "tipoTeste":req.body.tipo,
        "dataCri":dati,
        "professorId":req.body.profID,

      };*/

      //Terminar
      break;
    case "Interpretação":
    /*  pergunta={
        "anoEscolar":req.body.ano_escolar,
        "titulo":req.body.titulo,
        "disciplina":req.body.disciplina,
        "pergunta":req.body.pergunta,
        "conteudo":{
          "text":req.body.texto,
          "posicaoResposta":getPositions(req.body.),
        },
        "tipoTeste":req.body.tipo,
        "dataCri":dati,
        "professorId":req.body.profID,

      };*/
      //Terminar
      break;
  };



};

exports.getAll = function (req, res) {
  console.log('questions getAll'.green);

  db.list({'include_docs': true, 'limit': undefined, 'descending': true}, function(err, body) {
    if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }

    res.json(body.rows);
  });
};

exports.get = function (req, res) {
  var id = req.params.id;
  console.log('questions get'.green);

  db.get(id, function(err, body) {
    if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }

    res.json(body);
  });
};

//Função para devolver um array de palavras
function getPalavras(texto){
  var listaPalavras= new Array();
  var palavra='';

  var isCaracter=false;
  console.log(texto);

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

  return listaPalavras;
}
