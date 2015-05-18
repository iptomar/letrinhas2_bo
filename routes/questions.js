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
        "ano_escolar":req.body.ano_escolar,
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
      break;
    case "Lista":
      pergunta={
        "ano_escolar":req.body.ano_escolar,
        "titulo":req.body.titulo,
        "disciplina":req.body.disciplina,
        "pergunta":req.body.pergunta,
        "conteudo":{
          "palavrasCL1":getPalavras(req.body.cl1),
          "palavrasCL2":getPalavras(req.body.cl2),
          "palavrasCL3":getPalavras(req.body.cl3),
        },
        "tipo":req.body.tipo,
        "dataCri":dati,
        "profID":req.body.profID,

      };
      //Terminar
      break;
    case "Multimédia":
      //Terminar
      break;
    case "Interpretação":
      //Terminar
      break;
  };


  var teste={
    "titulo":req.body.titulo,
    "descricao":req.body.descricao,
    "disciplina":req.body.disciplina,
    "ano_escolar":req.body.ano_escolar,
    "perguntas":[idPerg],
    "dataCri":dati,
    "estado":1,
    "profID":req.body.profID,
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
    res;
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
  //res.json(body);
  });
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


function getPalavras(texto){
  var listaPalavras= new Array();
  var contaPalavra=0;
  var palavra='';
  var isCaracter=false;

  for(i=0;i<texto.length;i++){
    //de acordo com a tabela ascii 1º caracter possivel '!' CODE 33
    if(texto.charCodeAt(i)<33){
      //enterga a palavra à lista
      if(isCaracter){
        listaPalavras[contaPalavra]=palavra;
        contaPalavra++;
        palavra='';
        isCaracter=false;
      }


    }
    else{
      palavra+=texto.charAt(i);
      isCaracter=true;
    }

  }




  return listaPalavras;
}
