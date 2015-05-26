require('colors');

//var nano = require('nano')('http://ince.pt:5984');
var nano = require('nano')('http://127.0.0.1:5984');
//var db = nano.use('escolas');
var db = nano.use('dev_escolas');

exports.upDate = function(rep, res){
  console.log('schools upDate, NotAvaliable yet'.blue);


};

exports.new = function (req, res) {
  console.log('schools new, NotAvaliable yet'.green);

  var dati = new Date();
  //se mês anterior a Agosto, etão o ano letivo será o anterior
  //ex: se estamos a 26.05.2015, então o Ano letivo é 2014, ou seja (2014/2015)
  var anoLetivo;
  if(dati.getMonth() < 7) {
    anoLetivo=dati.getFullYear()-1;
  }
  else {
    anoLetivo=dati.getFullYear();
  }
  //criar as turmas da escola
  var turmas = new Array();
  for(i=0; i< req.body.nTurmas; i++){
      turmas[i]= {"_id":('T'+anoLetivo+req.body['anoturm' + (i+1)]+dati.getTime()+i),
                  "nome":req.body['trm' + (i+1)],
                  "ano":req.body['anoturm' + (i+1)],
                  "anoLectivo":anoLetivo,
                  "professores":new Array(),
                };
  }

  //criar a escola
  escola={
  "morada":req.body.morada,
  "nome":req.body.nome,
  "turmas":turmas,
  };

  //inserir na BD
  var file;
  if(req.files) file = req.files.file;

  var imgData = require('fs').readFileSync(file.path);
  var dati= new Date();
  var idEscola= "Escola"+dati.getTime();

  db.multipart.insert(escola, [{
    name: 'escola.jpg',
    data: imgData,
    content_type: 'image/jpg'
  }], idEscola, function(err, body) {
    if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }

    console.log('New school was inserted'.green);

    res.redirect('/#schools');

  });



};

exports.getAll = function (req, res) {
  console.log('schools getAll'.yellow);

  db.list({'include_docs': true, 'attachments': true, 'limit': undefined, 'descending': false}, function(err, body) {
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
  console.log('schools get'.green);

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
