require('colors');

//var nano = require('nano')('http://ince.pt:5984');
var nano = require('nano')('http://127.0.0.1:5984');
//var db = nano.use('testes');
var db = nano.use('dev_testes');

exports.upDate = function(rep, res){
  console.log('tests upDate, NotAvaliable yet'.blue);

  console.log('teachers upDate'.cyan);
  var estado=false;
  if(req.body.estado=="Ativo"){
      estado=true;
  }

  console.log(req.body);


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
