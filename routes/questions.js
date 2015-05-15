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
  console.log('req.body:'.green + req.body.tituloTeste);

  req.body.batata='cenas';
 var teste={
      "titulo":req.body.tituloTeste,

 };

  var file;
  if(req.files) file = req.files.file;

  var imgData = require('fs').readFileSync(file.path);
  var dati = new Date();

  db.multipart.insert(teste, [{
    name: 'prof.png',
    data: imgData,
    content_type: 'image/png'
  }], dati.toString() , function(err, body) {
    if (err) {
      console.log('questions new, an error ocourred'.green);

      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }
    console.log('questions added'.green);
    res.json(body);
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
