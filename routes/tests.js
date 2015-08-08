require('colors');

//var nano = require('nano')('http://ince.pt:5984');
var nano = require('nano')('http://127.0.0.1:5984');
//var db = nano.use('testes');
var db = nano.use('dev_testes');
var db2 = nano.use('dev_perguntas');

exports.upDate = function(req, res){
  var id = req.params.id;
  console.log('tests upDate, '.cyan + "id teste: "+id);
  switch (req.body.ordem){
    case "desabilita":
        desabilitaTeste(id);
    break;
    default: console.log("Nada a executar!");
  }
  res.redirect('/#tests');
};

exports.new = function (req, res) {
  console.log('Tests new,'.green);
  var dati = new Date();
  var idTeste = 'T'+dati.getTime();

  var perguntas = new Array();

  for (var i = 0; i < req.body.nPrg; i++) {
    perguntas[i]= req.body['p'+i];
  }

  console.log("Perguntas: "+ perguntas);
  var teste={
    "titulo":req.body.titulo,
    "descricao":req.body.descricao,
    "disciplina":req.body.disciplina,
    "anoEscolar":req.body.ano_escolar,
    "perguntas":perguntas,
    "data":dati,
    "estado":true,
    "professorId":req.body.profID,
    "tipo":req.body.tipo,
    "nRepeticoes":req.body.nRepeticoes,
  };

  console.log(teste);

  db.insert(teste, idTeste ,function(err,body){
    if (err) {
      console.log('test new, an error ocourred'.red);
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }
    console.log('New test added'.green);
    res.redirect('/#tests');

  });

};

exports.getAll = function (req, res) {
  console.log('tests getAll'.green);

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
  console.log('tests get'.green);

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

function desabilitaTeste(id){
  console.log("a desabilitar teste".yellow);
  db.get(id, function(err, body) {
    if (err) {
      console.log("Não foi possivel aceder a "+id+'\n'
                 +"erro: "+err);
    }

    db.update = function(obj, key, callback) {
     db.get(key, function (error, existing) {
       if(!error) obj._rev = existing._rev;
       db.insert(obj, key, callback);
     });
    };

    //body.estado=false;

    db.update(body, body._id, function(err1, res) {
      if (err1) return console.log(id+" wasn't disabled!".red +'\n'+ err1);
      console.log("The data of "+id+' was disabled!'.yellow);
      if(body.tipo != "Multimédia"){
        console.log("não é multimédia");
          desabiltaPergunta(body.perguntas[0]);
      }
    });


  });
};

function desabiltaPergunta(id){
  console.log("a desabilitar pergunta".yellow);
  db2.get(id, function(err, body) {
    if (err) {
      console.log("Não foi possivel aceder a "+id+'\n'
                 +"erro: "+err);
    }

    db2.update = function(obj, key, callback) {
     db.get(key, function (error, existing) {
       if(!error) obj._rev = existing._rev;
       db.insert(obj, key, callback);
     });
    };

    console.log(body);
    //body.estado=false;

    db2.update(body, body._id, function(err1, res) {
      if (err1) return console.log(id+" wasn't disabled!".red +'\n'+ err1);
      console.log("The data of "+id+' was disabled!'.yellow);
    });
  });
}
